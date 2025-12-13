const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const {
  addSweet,
  getSweets,
  purchaseSweet,
  searchSweets,
  updateSweet,
  deleteSweet,
} = require("../controllers/sweet.controller");

router.get("/", auth, getSweets);
router.get("/search", auth, searchSweets);

router.post("/", auth, admin, addSweet);
router.put("/:id", auth, admin, updateSweet);
router.delete("/:id", auth, admin, deleteSweet);
router.post("/:id/purchase", auth, purchaseSweet);

module.exports = router;
