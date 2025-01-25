const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("swagger-jsdoc");
const { connectDB } = require("./config/db.js");
require("dotenv").config();
const path = require("path");
const AuthRouter = require("./routes/AuthRouter.js");
const DashboardRouter = require("./routes/DashboardRouter.js");
const UserRouter = require("./routes/UserRouter.js");
const ClassRouter = require("./routes/ClassRouter.js");
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "uploads")));

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FeedBack App API",
      version: "1.0.0",
    },
    servers: [
      {
        url: process.env.API_URL,
      },
    ],
  },
  apis: ["./routes/**/*.js"], // Correct path for route files
};

const swaggerSpec = swaggerDocument(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", AuthRouter); // Make sure this is correctly set up
app.use("/api/dashboard", DashboardRouter);
app.use("/api/user", UserRouter);
app.use("/api/class", ClassRouter);
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
