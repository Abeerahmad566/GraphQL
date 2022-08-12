const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  name: String,
});
module.exports = mongoose.model("Notification", notificationSchema);
