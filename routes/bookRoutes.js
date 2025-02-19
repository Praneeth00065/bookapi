const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { userMiddleware } = require("../middleware/authMiddleware");

router.get("/", userMiddleware, bookController.getAllBooks);
router.get("/:id", userMiddleware, bookController.getBookById);
router.post("/", userMiddleware, bookController.createBook);
router.put("/:id", userMiddleware, bookController.updateBook);
router.delete("/:id", userMiddleware, bookController.deleteBook);

module.exports = router;
