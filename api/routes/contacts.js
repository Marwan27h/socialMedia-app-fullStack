import express from "express"
import { sendContactRequest } from "../controllers/contact.js"

const router = express.Router()

router.post("/", sendContactRequest)

export default router
