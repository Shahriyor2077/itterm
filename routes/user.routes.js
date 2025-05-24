const {
  create,
  findById,
  findAll,
  update,
  remove,
  login,
  logout,
  userRefreshToken,
  userActivate
} = require("../controllers/user.controller");

const router = require("express").Router();
const selfGuard = require("../middlewares/guards/user-self.jwt.guard")
const userJwtGuard = require("../middlewares/guards/user-jwt.guard")
const userTrueGuard = require("../middlewares/guards/admin-true.guard");


router.post("/", create);
router.post("/login", login);
router.get("/logout", logout)
router.get("/all", findAll);
router.post("/refresh", userRefreshToken);
router.get("/activate/:link", userActivate);
router.get("/:id", userJwtGuard, selfGuard, findById);
router.post("/login/:id", login)
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
