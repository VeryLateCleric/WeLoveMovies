const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware to run before each CRUD operation
async function checkReviewId(req, res, next) {
    const { reviewId } = req.params;
    const review = await reviewsService.read(reviewId);
    // If no review found with ID, throw error, else continue
    if (!review) return next({ status: 404, message: 'Review cannot be found.' });
    res.locals.review = review;
    return next();
}

async function list(req, res, next) {

}

async function update(req, res, next) {

}

async function destroy(req, res, next) {
    const { review } = res.locals;
    await reviewsService.delete(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    list: asyncErrorBoundary(list),
    update: [asyncErrorBoundary(checkReviewId), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(checkReviewId), asyncErrorBoundary(destroy)]
}