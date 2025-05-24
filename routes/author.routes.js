const {
  loginAuthor,
  logoutAuthor,
  findAll,
  create,
  findById,
  update,
  remove,
} = require("../controllers/author.controller");

const authorJwtGuard = require("../middlewares/guards/author-jwt.guard");
const authorSelfGuard = require("../middlewares/guards/author-self.jswt.guard");

const router = require("express").Router();

router.post("/", create);
router.post("/login", loginAuthor);
router.get("/logout", logoutAuthor);
router.get("/all", findAll);
router.get("/:id", authorJwtGuard, authorSelfGuard, findById);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
