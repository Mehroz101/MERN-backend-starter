// const User = require("../models/User"); // Use require for imports
// const jwt = require("jsonwebtoken"); // Example of another require
const User = require("../models/User");
const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, confirmPassword } = req.body;
    if (password === confirmPassword) {
      const isUserExits = await User.findOne({ username });
      if (isUserExits) {
        return res.status(400).send({
          success: false,
          message: "User already exists",
        });
      } else {
        const user = new User({
          username,
          password,
          role: "student",
        });
        await user.save();
        res.status(201).send({
          success: true,
          message: "User successfully signed up",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Password does not match",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

        res.status(200).send({
          success: true,
          message: "User successfully logged in",
          token,
        });
      } else {
        res.status(400).send({
          success: false,
          message: "Invalid password",
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "User does not exist",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { signup, login };
