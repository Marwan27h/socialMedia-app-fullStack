import { db } from "../connect.js"

export const getRelationships = (req, res) => {
    const q =
        "SELECT followerUserId FROM relationships WHERE followedUserId = ?"

    db.query(q, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res
            .status(200)
            .json(data.map((relationship) => relationship.followerUserId))
    })
}

export const addRelationships = (req, res) => {
    const userInfo = req.userInfo
    const q =
        "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)"

    const values = [userInfo.id, req.body.userId]

    db.query(q, [values], (err, data) => {
        if (err) {
            console.log("Error adding relationship:", err) // Log the error
            return res.status(500).json({ message: "Internal Server Error" })
        }

        return res.status(200).json("Following")
    })
}

export const deleteRelationships = (req, res) => {
    const userInfo = req.userInfo
    const q =
        "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?"

    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json("Unfollow")
    })
}
