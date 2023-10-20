import { db } from "../connect.js"

export const getSuggestion = (req, res) => {
    const userInfo = req.userInfo
    const q = `
            SELECT DISTINCT u.id AS userId, name, profilePic
            FROM users AS u
            LEFT JOIN relationships AS r1 ON (u.id = r1.followedUserId AND r1.followerUserId = ?)
            LEFT JOIN relationships AS r2 ON (u.id = r2.followedUserId AND r2.followerUserId = ?)
            WHERE (r1.followerUserId IS NULL OR r2.followedUserId IS NULL) AND u.id <> ?
            ORDER BY RAND()
            LIMIT 5;
        `

    db.query(q, [userInfo.id, userInfo.id, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const addSuggestion = (req, res) => {
    const { followerUserId, followedUserId } = req.body

    const qAddSuggestion = `INSERT INTO relationships (followerUserId, followedUserId)
      VALUES (?, ?)`

    db.query(qAddSuggestion, [followerUserId, followedUserId], (err) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("Suggestion added successfully")
    })
}

export const deleteSuggestion = (req, res) => {
    const { followerUserId, followedUserId } = req.body

    const q = `SELECT DISTINCT u.id AS userId, name, profilePic
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
           LIMIT 10
          `

    db.query(qDeleteSuggestion, [followerUserId, followedUserId], (err) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json("Suggestion deleted successfully")
    })
}
