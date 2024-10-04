const router = require("express").Router({ mergeParams : true });
const theaterController = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
    // .get(theaterController.list)
    .all(methodNotAllowed);
    
module.exports = router;