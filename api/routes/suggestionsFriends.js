import express from "express"
import {
    getSuggestion,
    addSuggestion,
    deleteSuggestion,
} from "../controllers/suggestion.js"
import { verifyToken } from "../middleware/verifyToken.js"

const router = express.Router()

router.get("/", getSuggestion)
router.post("/", verifyToken, addSuggestion)
router.delete("/", verifyToken, deleteSuggestion)

export default router
