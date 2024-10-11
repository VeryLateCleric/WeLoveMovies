const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const table = "reviews";

const criticConfigure = {
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
};

const addCritic = mapProperties(criticConfigure)

// List of all critiques from a single movie
function listMovieCritiques(movie_id) {
  return knex({ r: table })
    .select("*")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where ({ movie_id })
    .then((data) => data.map(addCritic));
}

// 
function update(review) {
  const { review_id } = review;
  return knex(table).select("*").where({ review_id }).update(review, "*");
}

// Get review
function read(review_id) {
  return knex(table).select("*").where({ review_id }).first();
}

// Get all reviews
function list() {
  return knex(table).select("*");
}

// Remove specific review
function destroy(review_id) {
  return knex(table).where({ reviewId: review_id }).del();
}

module.exports = {
  list,
  read,
  listMovieCritiques,
  update,
  delete: destroy,
};
