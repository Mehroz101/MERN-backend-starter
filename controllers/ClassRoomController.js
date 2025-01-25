const ClassRoom = require("../models/ClassRoom");
const User = require("../models/User");

const CreateClassRoom = async (req, res) => {
  try {
    const { className, imageUrl, universityName } = req.body;
    const lastClassID = await ClassRoom.find().sort({ classID: -1 }).limit(1);
    const classID = lastClassID[0]?.classID + 1 || 1;
    const data = await ClassRoom.create({
      classID,
      className,
      imageUrl,
      universityName,
    });
    if (!data) {
      return res
        .status(400)
        .send({ success: false, message: "Something went wrong" });
    } else {
      res.status(200).send({ success: true, data });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};
const GetClassDetail = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetail = await User.findById(userId);

    const data = await ClassRoom.find({
      classID: userDetail.classID,
      universityName: userDetail.university,
    });
    const sendData = data.map(
      ({ classID, className, imageUrl, universityName }) => ({
        classID,
        className,
        imageUrl,
        universityName,
      })
    );

    res.status(200).send({ success: true, data: sendData });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};
const GetAllClasses = async (req, res) => {
  try {
    const classes = await ClassRoom.find({});
    const classData = classes.map(
      ({ classID, className, imageUrl, universityName }) => ({
        classID,
        className,
        imageUrl,
        universityName,
      })
    );
    res.status(200).send({ success: true, data: classData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};
const GetAllClassesDropDown = async (req, res) => {
  try {
    const classes = await ClassRoom.find({});
    const classData = classes.map(({ classID, className }) => ({
      classID,
      className,
    }));
    res.status(200).send({ success: true, data: classData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};
const GetAllUniversityDropDown = async (req, res) => {
  try {
    const classes = await ClassRoom.find({});
    const classData = classes.map(({ universityName }) => ({
      universityName,
    }));
    res.status(200).send({ success: true, data: classData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

module.exports = {
  CreateClassRoom,
  GetClassDetail,
  GetAllClasses,
  GetAllClassesDropDown,
  GetAllUniversityDropDown,
};
