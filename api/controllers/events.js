import { db } from "../connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"

export const getEvent = (req, res) => {
    const userId = req.query.userId
    const token = req.cookies.accessToken

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = `
            SELECT e.title, e.desc, e.location, e.img, e.startDate, e.endDate, e.event_userId AS userId,e.createdAt, u.name, u.profilePic
            FROM events AS e
            JOIN users AS u ON (u.id = e.event_userId)
            ORDER BY e.createdAt DESC
        `

        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(data)
        })
    })
}


export const addEvent = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("Not logged in!")

    jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q =
            "INSERT INTO events (`title`, `desc`, `location`, `img`, `startDate`, `endDate`,`createdAt`, `event_userId`) VALUES (?,?, ?, ?, ?, ?, ?, ?)"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.location,
            req.body.img,
            req.body.startDate,
            req.body.endDate,
            moment().format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
        ]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Event post has been created")
        })
    })
}
