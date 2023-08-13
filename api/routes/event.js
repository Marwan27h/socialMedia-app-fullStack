import express from "express"
import {
    getEvent,
    addEvent,
   
} from "../controllers/events.js"

const router = express.Router()

router.get("/", getEvent)
router.post("/", addEvent)


export default router
