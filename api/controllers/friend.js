import { db } from "../connect.js"

export const getFriends = (req, res) => {
    const userInfo = req.userInfo
    const q = `
    SELECT DISTINCT u.id AS userId, name, profilePic
    FROM users AS u
    JOIN relationships AS r ON (u.id = r.followedUserId)
    WHERE r.followerUserId = ? AND u.id <> ?
    ;
`

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const getFollowingCount = (req, res) => {
    const userId = req.params.userId

    const q = `
        SELECT u.id AS userId, u.name, u.profilePic, COUNT(r.followerUserId) AS numberOfFriends
        FROM users AS u
        LEFT JOIN relationships AS r ON u.id = r.followedUserId
        WHERE r.followerUserId = ?
        GROUP BY u.id, u.name, u.profilePic;
    `

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}

export const getFollowedCount = (req, res) => {
    const userId = req.params.userId

    const q = `
SELECT u.id AS userId, u.name, u.profilePic, COUNT(r.followedUserId) AS numberOfFollowers
FROM users AS u
LEFT JOIN relationships AS r ON u.id = r.followerUserId
WHERE r.followedUserId = ?
GROUP BY u.id, u.name, u.profilePic;
    `

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
