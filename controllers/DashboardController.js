const User = require("../models/User");

const DashboardData = async (req, res) => {
  try {
    const data = await User.find();
    const totalBoys = data.filter((user) => user.gender === "male").length;
    const totalGirls = data.filter((user) => user.gender === "female").length;
    const totalStudents = data.length;
    res.status(200).send({
      success: true,
      data: { totalBoys, totalGirls, totalStudents },
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
const GetAllUsers = async (req, res) => {
  try {
    const data = await User.find();
    const sendData = data.map((user) => ({
      _id: user._id,
      username: user.username,
      password: user.password,
      role: user.role,
      gender: user.gender ?? null,
      rollno: user.rollno ?? null,
      classRoom: user.classRoom ?? null,
      university: user.university ?? null,
    }));
    res.status(200).send({ success: true, data: sendData });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
const AddUser = async (req, res) => {
  try {
    const {
      username,
      rollno,
      classRoom,
      university,
      gender,
      role,
      classID,
      password,
      confirmPassword,
    } = req.body;
    if (password === confirmPassword) {
      const isUserExits = await User.findOne({ username });
      if (isUserExits) {
        return res
          .status(400)
          .send({ success: false, message: "User already exists" });
      } else {
        const user = new User({
          username,
          rollno,
          classRoom,
          university,
          gender,
          role,
          password,
        });
        await user.save();
        res
          .status(201)
          .send({ success: true, message: "User Created Successfully" });
      }
    } else {
      res
        .status(400)
        .send({ success: false, message: "Password does not match" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const DeleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const response = await User.findByIdAndDelete(userId);
    if (response) {
      res
        .status(201)
        .send({ success: true, message: "User deleted successfully" });
    } else {
      res.status(201).send({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};
module.exports = { DashboardData, GetAllUsers, AddUser, DeleteUser };
