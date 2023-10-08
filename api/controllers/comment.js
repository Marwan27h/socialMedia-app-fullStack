import { db } from "../connect.js"
import moment from "moment"

export const getComments = (req, res) => {
    const q = `SELECT c.*, u.id AS userId, name, profilePic 
        FROM comments AS c 
        JOIN users AS u ON (u.id = c.userId)
        WHERE c.postId = ? 
        ORDER BY c.createdAt DESC`

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const addComment = (req, res) => {
    const userInfo = req.userInfo
    const q =
        "INSERT INTO comments (`desc`, `createdAt`, `userId`,`postId`) VALUES (?, ?, ?, ?)"

    const values = [
        req.body.desc,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        userInfo.id,
        req.body.postId,
    ]

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Comment has been created")
    })
}

export const deleteComment = (req, res) => {
    const userInfo = req.userInfo

    const q = "DELETE FROM comments WHERE id = ? AND userId = ?"

    db.query(q, [req.params.id, userInfo.id], (err, result) => {
        if (err) return res.status(500).json(err)
        if (result.affectedRows === 0) {
            return res.status(404).json("Comment not found or unauthorized")
        }
        return res.status(200).json("Comment deleted successfully")
    })
}

export const updateComment = (req, res) => {
    const userInfo = req.userInfo

    const commentId = req.params.id
    const userId = userInfo.id
    const updatedDesc = req.body.desc

    const q = "UPDATE comments SET `desc` = ? WHERE id = ? AND userId = ?"

    db.query(q, [updatedDesc, commentId, userId], (err, result) => {
        if (err) return res.status(500).json(err)
        if (result.affectedRows === 0) {
            return res.status(404).json("Comment not found or unauthorized")
        }
        return res.status(200).json("Comment updated successfully")
    })
}
