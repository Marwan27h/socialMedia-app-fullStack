import express from "express"
import {latestActivities} from "../controllers/latestActivitie.js"

const router = express.Router()

router.get("/latestActivities", latestActivities)


export default router