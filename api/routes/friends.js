import express from "express"
import {
    getFriends,
    getFollowingCount,
    getFollowedCount,
} from "../controllers/friend.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()
router.get("/following-count/:userId", getFollowingCount)
router.get("/followed-count/:userId", getFollowedCount)
router.get("/", verifyToken, getFriends)

export default router
