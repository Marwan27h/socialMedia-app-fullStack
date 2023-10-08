import express from "express"
import { getLikes, addLike, deleteLike } from "../controllers/like.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/", getLikes)
router.post("/", verifyToken, addLike)
router.delete("/", verifyToken, deleteLike)

export default router
