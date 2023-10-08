import express from "express"
import {
    getComments,
    addComment,
    deleteComment,
    updateComment,
} from "../controllers/comment.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/", getComments)
router.post("/", verifyToken, addComment)
router.delete("/:id", verifyToken, deleteComment)
router.put("/:id", verifyToken, updateComment)

export default router
