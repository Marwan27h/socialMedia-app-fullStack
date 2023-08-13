import express from "express"
import { getNotificationsLikesComments } from "../controllers/notification.js"

const router = express.Router()

router.get("/", getNotificationsLikesComments)


export default router
