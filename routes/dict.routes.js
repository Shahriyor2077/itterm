const { addDict, findAll, findByterm, findByLet } = require("../controllers/dict.controller");
const authorExpertGuard = require("../middlewares/guards/author-expert.guard");
const authorJwtGuard = require("../middlewares/guards/author-jwt.guard");

const router = require("express").Router();

router.post("/", authorJwtGuard, authorExpertGuard, addDict);
router.get("/all", findAll);
router.get("/term", findByterm);
router.get("/let", findByLet);

module.exports = router;
