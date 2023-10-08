import express from "express"
import {
    getUser,
    getUserByName,
    updateUser,
    deleteUser,
} from "../controllers/user.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/find/:userId", getUser)
router.get("/search", getUserByName)
router.put("/", verifyToken, updateUser)
router.delete("/", verifyToken, deleteUser)

export default router
