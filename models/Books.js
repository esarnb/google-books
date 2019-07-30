const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {type: String, required: true},
  authors: {type: Array, required: false},
  link: {type: String, unique: true, required: true},
  description: String,
  image: String,
})

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;