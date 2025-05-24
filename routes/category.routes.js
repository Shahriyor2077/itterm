const {
  addCategory,
  findById,
  findAll,
  update,
  remove,
} = require("../controllers/category.controller");

const router = require("express").Router();

router.post("/", addCategory);
router.get("/all", findAll);
router.get("/:id", findById);
router.patch("/:id", update);
router.delete("/:id", remove);

module.exports = router;
