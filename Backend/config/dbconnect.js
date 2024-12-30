const { default: mongoose } = require("mongoose");

const dbconnect = () => {
  try {
    const conn = mongoose.connect("mongodb://localhost:27017/MedihubData");

    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("DAtabase error");
  }
};
module.exports = dbconnect;