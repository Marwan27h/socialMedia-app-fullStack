import express from "express"
import {
    getPosts,
    addPost,
    deletePost,
    updatePost,
    sharePost,
    getUserImages,
} from "../controllers/post.js"

const router = express.Router()

router.get("/", getPosts)
router.post("/", addPost)
router.post("/share-post", sharePost)
router.delete("/:id", deletePost)
router.put("/:id", updatePost)
router.get("/images/:userId", getUserImages)

export default router
