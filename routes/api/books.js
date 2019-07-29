const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/")
  .post(booksController.create);

// Matches with "/api/books/:id"
router.route("/:id")
  .delete(booksController.remove)
  .get(booksController.findById)

// Matches with "/api/books/google/{searchQuery}"
router.route("/google/:search")
  .get(booksController.search)


module.exports = router;
