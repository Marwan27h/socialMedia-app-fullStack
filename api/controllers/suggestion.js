import { db } from "../connect.js"

export const getSuggestion = async (req, res) => {
    try {
        const userInfo = req.userInfo
        const q = `
            SELECT DISTINCT u.id AS userId, name, profilePic
            FROM users AS u
            LEFT JOIN relationships AS r1 ON (u.id = r1.followedUserId AND r1.followerUserId = ?)
            LEFT JOIN relationships AS r2 ON (u.id = r2.followedUserId AND r2.followerUserId = ?)
            WHERE (r1.followerUserId IS NULL OR r2.followedUserId IS NULL) AND u.id <> ?
            ORDER BY RAND()
            LIMIT 2;
        `

        const data = await new Promise((resolve, reject) => {
            db.query(
                q,
                [userInfo.id, userInfo.id, userInfo.id],
                (err, data) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(data)
                }
            )
        })

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const addSuggestion = async (req, res) => {
    try {
        const { followerUserId, followedUserId } = req.body

        const qAddSuggestion = `INSERT INTO relationships (followerUserId, followedUserId) VALUES (?, ?)`

        await new Promise((resolve, reject) => {
            db.query(
                qAddSuggestion,
                [followerUserId, followedUserId],
                (err) => {
                    if (err) {
                        reject(err)
                    }
                    resolve()
                }
            )
        })

        res.status(200).json("Suggestion added successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteSuggestion = async (req, res) => {
    try {
        const { followerUserId, followedUserId } = req.body

        const q = `
            SELECT DISTINCT u.id AS userId, name, profilePic
            FROM users AS u
            JOIN relationships AS r1 ON (u.id = r1.followedUserId)
            LEFT JOIN relationships AS r2 ON (u.id = r2.followedUserId AND r2.followerUserId = ?)
            WHERE r1.followerUserId IN (
                SELECT followedUserId
                FROM relationships
                WHERE followerUserId = ?
            ) AND r2.followedUserId IS NULL
            AND u.id NOT IN (
                SELECT followedUserId
                FROM relationships
                WHERE followerUserId = ? AND followedUserId = ?
            )
            LIMIT 10;
        `

        await new Promise((resolve, reject) => {
            db.query(q, [followerUserId, followedUserId], (err) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })

        res.status(200).json("Suggestion deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}
