import { db } from "../connect.js"
import moment from "moment"

export const getLikes = (req, res) => {
    const q = "SELECT userId FROM likes WHERE postId =?"

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data.map((like) => like.userId))
    })
}

export const addLike = (req, res) => {
    const userInfo = req.userInfo
    const q = "INSERT INTO likes (`userId`,`postId`,`createdAt`) VALUES (?)"

    const values = [
        userInfo.id,
        req.body.postId,
        moment().format("YYYY-MM-DD HH:mm:ss"),
    ]

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Post has been liked")
    })
}

export const deleteLike = (req, res) => {
    const userInfo = req.userInfo
    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?"

    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Like has been deleted")
    })
}
