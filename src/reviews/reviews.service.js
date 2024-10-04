const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function listReviews() {
  return knex("reviews").select("*");
}

function read(review_id) {
  return knex("reviews").select("*").where({ review_id }).first();
}


const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function update(updatedReview) {
  const { review_id } = updatedReview;
  return (
    knex("reviews as r")
      .where({ review_id })
      .update(updatedReview, Object.keys(updatedReview))
      // queries the database for the updated object because sqlite won't
      .then(() =>
        knex("reviews as r")
          .join("critics as c", "c.critic_id", "r.critic_id")
          .where({ review_id })
          .first()
          .then(addCritic)
      )
  );
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  listReviews,
  read,
  update,
  delete: destroy,
};
