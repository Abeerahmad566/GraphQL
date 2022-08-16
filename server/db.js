const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://GraphQl:zeesh24252425A@cluster0.vgpmj.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connected Successful!");
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDb;
