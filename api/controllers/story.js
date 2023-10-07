import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"

export const getStory = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = `
            SELECT s.id, s.img, s.createdAt, u.id AS userId, u.name
            FROM stories AS s
            JOIN users AS u ON u.id = s.userId
            WHERE s.userId = ? OR EXISTS (
                SELECT 1
                FROM relationships AS r
                WHERE r.followerUserId = ? AND r.followedUserId = s.userId
            )
            ORDER BY s.createdAt DESC
            LIMIT 4;
        `

        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
}

export const deleteStory = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "DELETE FROM stories WHERE `id`=? AND `userId` =?"

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err)
            if (data.affectedRows > 0)
                return res.status(200).json("story has been deleted")
            return res.status(403).json("You can delete only your story")
        })
    })
}

export const addStory = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "INSERT INTO stories ( `img`, `userId`,`createdAt`) VALUES ?"

        const values = [
            [req.body.img, userInfo.id, moment().format("YYYY-MM-DD HH:mm:ss")],
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("story has been created")
        })
    })
}
