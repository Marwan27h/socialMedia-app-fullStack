import { db } from "../connect.js"
import moment from "moment"

export const getPosts = (req, res) => {
    const userInfo = req.userInfo
    const userId = req.query.userId

    let q = `
            SELECT DISTINCT p.*, u.id AS userId, name, profilePic
            FROM posts AS p
            JOIN users AS u ON (u.id = p.userId)
        `

    const values = []

    if (userId && userId !== "undefined") {
        q += " WHERE p.userId = ?"
        values.push(userId)
    } else {
        q += `
                LEFT JOIN relationships AS r ON (r.followedUserId = p.userId AND r.followerUserId = ?)
                WHERE p.userId = ? OR r.followerUserId = ?
            `
        values.push(userInfo.id, userInfo.id, userInfo.id)
    }

    q += " ORDER BY p.createdAt DESC"

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const deletePost = (req, res) => {
    const userInfo = req.userInfo
    const postId = req.params.id
    const userId = userInfo.id

    const deleteCommentsQuery = "DELETE FROM comments WHERE postId = ?"
    db.query(deleteCommentsQuery, [postId], (err, commentsData) => {
        if (err) return res.status(500).json(err)

        const deletePostQuery = "DELETE FROM posts WHERE id = ? AND userId = ?"
        db.query(deletePostQuery, [postId, userId], (err, postData) => {
            if (err) return res.status(500).json(err)
            if (postData.affectedRows > 0) {
                return res.status(200).json("Post has been deleted")
            } else {
                return res.status(403).json("You can delete only your post")
            }
        })
    })
}

export const addPost = (req, res) => {
    const userInfo = req.userInfo
    const q =
        "INSERT INTO posts (`desc`, `img`, `createdAt`, `place`, `tag`, `userId`) VALUES (?, ?, ?, ?, ?, ?)"

    const values = [
        req.body.desc,
        req.body.img,
        moment().format("YYYY-MM-DD HH:mm:ss"),
        req.body.place,
        req.body.friendId,
        userInfo.id,
    ]

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Post has been created")
    })
}

export const updatePost = (req, res) => {
    const userInfo = req.userInfo
    const q = "UPDATE posts SET `desc` = ? WHERE id = ? AND userId = ?"

    const values = [req.body.desc, req.params.id, userInfo.id]

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const sharePost = (req, res) => {
    const userInfo = req.userInfo
    const postId = req.query.postId
    if (!postId) {
        return res
            .status(400)
            .json("PostId is missing in the query parameters.")
    }

    const selectQuery = `
            SELECT p.*, u.name as userName
            FROM posts AS p
            INNER JOIN users AS u ON p.userId = u.id
            WHERE p.id = ?`

    db.query(selectQuery, [postId], (err, result) => {
        if (err) return res.status(500).json(err)

        if (result.length === 0) {
            return res.status(404).json("Post not found for the followed user.")
        }

        const post = result[0]

        const sharedPostDesc = `Shared from ${post.userName}:\n${post.desc}`

        const insertQuery =
            "INSERT INTO posts (`desc`, img, createdAt, place, userId) VALUES (?, ?, ?, ?, ?)"
        const insertValues = [
            sharedPostDesc,
            post.img,
            moment().format("YYYY-MM-DD HH:mm:ss"),
            post.place,
            userInfo.id,
        ]

        db.query(insertQuery, insertValues, (err) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Post has been shared to your profile.")
        })
    })
}

export const getUserImages = (req, res) => {
    const userId = req.params.userId

    let q = `
            SELECT img
            FROM posts
            WHERE userId = ? AND img IS NOT NULL AND img != ''
        `

    const values = [userId]

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err)

        if (data.length === 0) {
            return res.status(404).json("No images found for this user.")
        }

        return res.status(200).json(data)
    })
}
