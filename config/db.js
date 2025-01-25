// Use require for importing packages
const mongoose = require("mongoose");

// Use module.exports to export your function (CommonJS syntax)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected:${conn.connection.port}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Exporting the function using CommonJS
module.exports = { connectDB };
