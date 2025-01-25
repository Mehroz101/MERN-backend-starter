const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");
const {
  DashboardData,
  GetAllUsers,
  AddUser,
  DeleteUser
} = require("../controllers/DashboardController");
const router = express.Router();

/**
 * @swagger
 * /api/dashboarddata:
 *   get:
 *     summary: Get dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalBoys:
 *                       type: number
 *                     totalGirls:
 *                       type: number
 *                     totalStudents:
 *                       type: number
 *
 */
router.get("/dashboarddata", authMiddleware, DashboardData);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                       password:
 *                         type: string
 *                       role:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       rollno:
 *                         type: string
 *                       classRoom:
 *                         type: string
 *                       university:
 *                         type: string
 *                       isAdmin:
 *                         type: boolean
 *                       createdAt:
 *                         type: string
 */

router.get("/users", authMiddleware, GetAllUsers);

/**
 * @swagger
 * /api/adduser:
 *   post:
 *     summary: Add a new user
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               rollno:
 *                 type: string
 *               classRoom:
 *                 type: string
 *               university:
 *                 type: string
 *               gender:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User added successfully
 */
router.post("/adduser", authMiddleware, AddUser);

/**
 * @swagger
 * /api/adduser:
 *   post:
 *     summary: Delete user
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id
 * 
 *     responses:
 *       201:
 *         description: User deleted successfully
 */


router.post("/deleteuser", authMiddleware, DeleteUser);
module.exports = router;
