const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware validation to run before each CRUD operation
async function checkReviewId(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: "Review cannot be found" });
}

// List all reviews, unless 'movie_id' is supplied, then only specified movie
async function list(req, res, next) {
  const { movie: { movie_id = null } = {} } = res.locals;
  const data = movie_id
    ? await reviewsService.listMovieCritiques(movie_id)
    : await reviewsService.list();
  res.json({ data });
}

async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    updated_at: new Date(Date.now()).toISOString(),
  };
  const data = await reviewsService.update(updatedReview);
  res.json({ data });
}

async function destroy(req, res, next) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  list: asyncErrorBoundary(list),
  update: [asyncErrorBoundary(checkReviewId), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(checkReviewId), asyncErrorBoundary(destroy)],
};
