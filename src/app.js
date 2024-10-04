if (process.env.USER) require("dotenv").config();
const express = require("express");
const errorHandler = require("./errors/errorHandler");
const methodNotAllowed = require("./errors/methodNotAllowed");
const notFound = require("./errors/notFound");
const app = express();
const cors = require("cors")

// Middleware
app.use(express.json());
app.use(cors());

// Import routers:
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// Error Handlers
app.use(errorHandler)
app.use(methodNotAllowed)
app.use(notFound)


module.exports = app;
