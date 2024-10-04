const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// List all movies, and filter is 'is_showing' query added
async function list(req, res) {
  const { is_showing } = req.query; //Get query param
  let data;
  if (is_showing === "true") {
    // Filter only active movies
    data = await moviesService.listActiveMovies();
  } else {
    // Show all
    data = await moviesService.listAll();
  }
  res.json({ data });
}

// Read movie details by given ID
async function read(req, res, next) {
  const { movieId } = req.params;
  const movie = await moviesService.read(movieId);
  if (!movie) {
    // Fail first
    return next({ status: 404, message: `Movie cannot be found` });
  }
  res.json({ data: movie });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
};
