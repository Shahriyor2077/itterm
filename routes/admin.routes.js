const {
  login,
  findAll,
  create,
  findById,
  update,
  remove,
  logout,
  adminRefreshToken,
  adminActivate,
} = require("../controllers/admin.controller");

const router = require("express").Router();
const selfGuard = require("../middlewares/guards/admin-self.jwt.guard");
const adminJwtGuard = require("../middlewares/guards/admin-jwt.guard");

router.post("/", create);
router.post("/login", login);
router.post("/refresh", adminRefreshToken)
router.post("/logout", logout);
router.get("/all", findAll);
router.get("/activate/:link", adminActivate)
router.get("/:id", adminJwtGuard, selfGuard, findById);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
