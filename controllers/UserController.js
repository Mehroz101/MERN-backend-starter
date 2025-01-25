const User = require("../models/User");

const GetUserDetail = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user) {
      const sendData = {
        userName: user.username,
        rollNo: user.rollno ?? "",
        gender: user.gender,
        university: user.university ?? "",
        className: user.className ?? "",
        classID: user.classID ?? "",
        password: user.password ?? "",
      };
      res.status(200).send({ success: true, message: "", data: sendData });
    } else {
      res.status(404).send({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
    console.log(error);
  }
};
const UpdateUserDetail = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user.id;
    const {
      userName,
      rollNo,
      gender,
      university,
      password,
      classID,
      className,
    } = req.body;
    const user = await User.findByIdAndUpdate(userId, {
      username: userName.trim(),
      rollno: rollNo.trim(),
      gender: gender,
      university: university.trim(),
      classRoom: className.trim(),
      classID: classID,
      password: password,
    });
    if (user) {
      res
        .status(201)
        .send({ success: true, message: "update detail successfully" });
    } else {
      res.status(401).send({
        success: true,
        message: "something wrong while updating detail",
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
    console.log(error.message);
  }
};
module.exports = { GetUserDetail, UpdateUserDetail };
