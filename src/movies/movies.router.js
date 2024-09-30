const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .use("/:movieId");

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;