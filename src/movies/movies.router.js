const router = require("express").Router({ mergeParams: true });
const moviesController = require("./movies.controller");
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

// router.route("/").get(moviesController.read).all(methodNotAllowed);

router
  .route("/:movieId")
  .get(moviesController.read)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(moviesController.listMoviesReviews)
  .all(methodNotAllowed);

router
  .route("/:movieId/theaters")
  .get(moviesController.listTheatersPlaying)
  .all(methodNotAllowed);

module.exports = router;
