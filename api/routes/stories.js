import express from "express"
import { getStory, addStory, deleteStory } from "../controllers/story.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/", verifyToken, getStory)
router.post("/", verifyToken, addStory)
router.delete("/:id", verifyToken, deleteStory)

export default router
