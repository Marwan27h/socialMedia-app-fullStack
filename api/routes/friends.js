import express from "express"
import {
    getFriends,
    getFollowingCount,
    getFollowedCount,
} from "../controllers/friend.js"

const router = express.Router()
router.get("/following-count/:userId", getFollowingCount)
router.get("/followed-count/:userId", getFollowedCount)
router.get("/", getFriends)



export default router
