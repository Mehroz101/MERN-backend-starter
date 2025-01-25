const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");
const {
  CreateClassRoom,
  GetClassDetail,
  GetAllClasses,
  GetAllClassesDropDown,
  GetAllUniversityDropDown,
} = require("../controllers/ClassRoomController");
const router = express.Router();

router.post("/createclassroom", authMiddleware, CreateClassRoom);
router.get("/getallclasses", authMiddleware, GetAllClasses);
router.get("/getclassroomdetail", authMiddleware, GetClassDetail);
router.get("/getclassdropdown", authMiddleware, GetAllClassesDropDown);
router.get("/getuniversitydropdown", authMiddleware, GetAllUniversityDropDown);

module.exports = router;
