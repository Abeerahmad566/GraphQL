const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: String,
  genre: String,
  author: String,
});
module.exports = mongoose.model("Book", bookSchema);
