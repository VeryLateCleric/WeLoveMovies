const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function checkMovieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

// Read movie details by given ID
async function read(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (!movie) { // Fail first
    return next({ status: 404, message: `Movie cannot be found` });
  }
  res.json({ data: movie });
}

// List all movies, and filter if 'is_showing' query added
async function listMoviesShowing(req, res) {
  const { is_showing } = req.query; //Get query param
  let data;
  if (is_showing === "true") { // Filter only active movies
    data = await moviesService.listActiveMovies();
  } else { // Show all
    data = await moviesService.listAllMovies();
  }
  res.json({ data });
}

// List of theaters playing the requested movie
async function listTheatersPlayingMovie(req, res) {
  const { movieId } = req.params;
  const data = await moviesService.listTheatersPlayingMovie(movieId);
  res.json({ data });
}

// Show reviews associated with each movie's id
async function listMoviesReviews(req, res) {
  const { movieId } = req.params;
  const data = await moviesService.listReviewsWithCritics(movieId);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(listMoviesShowing),
  read: [asyncErrorBoundary(checkMovieExists), read],
  listTheatersPlaying: [
    asyncErrorBoundary(checkMovieExists),
    asyncErrorBoundary(listTheatersPlayingMovie),
  ],
  listMoviesReviews: [
    asyncErrorBoundary(checkMovieExists),
    asyncErrorBoundary(listMoviesReviews)
  ]
};
