const {
  create,
  findById,
  findAll,
  update,
  remove,
} = require("../controllers/social.controller");

const router = require("express").Router();

router.post("/", create);
router.get("/all", findAll);
router.get("/:id", findById);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
