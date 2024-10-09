const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const table = "reviews";

function read(reviewId) {
  return knex(table)
}

function list() {
  return knex(table).select("*");
}

function update(reviewId) {
  const { reviewId } = review;
  return knex(table)
}

function destroy(reviewId) {
  return knex(table).where({ review_id }).del();
}

module.exports = {
  listReviews,
  read,
  update,
  delete: destroy,
};
