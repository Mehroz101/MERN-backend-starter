

const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");
const { GetUserDetail,UpdateUserDetail } = require("../controllers/UserController");
const router = express.Router();

router.get("/getuserdetail",authMiddleware,GetUserDetail);
router.post("/updateuserdetail",authMiddleware,UpdateUserDetail);


module.exports = router;