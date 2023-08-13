import express from "express"
import {
    getUser,
    getUserByName,
    updateUser,
    deleteUser,
} from "../controllers/user.js"

const router = express.Router()

router.get("/find/:userId", getUser)
router.get("/search", getUserByName);
router.put("/", updateUser)
router.delete("/", deleteUser)


export default router
