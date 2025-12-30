const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/role");
const c = require("../controllers/user.controller");

router.get("/me", auth.protect, c.getMe);
router.patch("/me", auth.protect, c.updateMe);
router.patch("/me/password", auth.protect, c.changePassword);

router.get("/", auth.protect, role("admin"), c.getUsers);
router.patch("/:id/status", auth.protect, role("admin"), c.setStatus);

module.exports = router;
