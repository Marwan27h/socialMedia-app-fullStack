import express from "express"
import {
    getSuggestion,
    addSuggestion,
    deleteSuggestion,
} from "../controllers/suggestion.js"

const router = express.Router()

router.get("/", getSuggestion)
router.post("/", addSuggestion)
router.delete("/", deleteSuggestion)

export default router
