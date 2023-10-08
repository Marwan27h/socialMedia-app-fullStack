import express from "express"
import { getEvent, addEvent } from "../controllers/events.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/", verifyToken, getEvent)
router.post("/", verifyToken, addEvent)

export default router
