import express from "express"
import {
    getPosts,
    addPost,
    deletePost,
    updatePost,
    sharePost,
    getUserImages,
} from "../controllers/post.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/", verifyToken, getPosts)
router.post("/", verifyToken, addPost)
router.post("/share-post", verifyToken, sharePost)
router.delete("/:id", verifyToken, deletePost)
router.put("/:id", verifyToken, updatePost)
router.get("/images/:userId", verifyToken, getUserImages)

export default router
