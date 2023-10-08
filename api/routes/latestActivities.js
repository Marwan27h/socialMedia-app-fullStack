import express from "express"
import { latestActivities } from "../controllers/latestActivitie.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/latestActivities", verifyToken, latestActivities)

export default router
