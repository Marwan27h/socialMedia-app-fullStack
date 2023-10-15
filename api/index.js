import express from "express"
const app = express()
const PORT = 3006

import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import postRoutes from "./routes/posts.js"
import relationshipRoutes from "./routes/relationships.js"
import friendsRoutes from "./routes/friends.js"
import storiesRoutes from "./routes/stories.js"
import suggestionsFriends from "./routes/suggestionsFriends.js"
import activityRoutes from "./routes/latestActivities.js"
import NotificationsLikesCommentsRoutes from "./routes/notifications.js"
import contactRoutes from "./routes/contacts.js"
import eventRoutes from "./routes/event.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import multer from "multer"

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(
    cors({
        origin: "*",
    })
)
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/upload")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    },
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})

app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/relationships", relationshipRoutes)
app.use("/api/stories", storiesRoutes)
app.use("/api/friends", friendsRoutes)
app.use("/api/suggestions", suggestionsFriends)
app.use("/api/users", activityRoutes)
app.use("/api/notifications", NotificationsLikesCommentsRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/event", eventRoutes)

app.listen(PORT, () => {
    console.log(`the server runs at PORT ${PORT},`)
})
