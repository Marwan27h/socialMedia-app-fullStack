import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getUser = (req, res) => {
    const userId = req.params.userId
    const q = "SELECT * FROM users WHERE id=? "

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)

        if (data.length === 0) {
            return res.status(404).json("User not found")
        }

        const { password, ...info } = data[0]
        return res.json(info)
    })
}

export const getUserByName = (req, res) => {
    const name = req.query.name
    const q = "SELECT u.username, u.id FROM users as u WHERE name LIKE ?"

    db.query(q, [`%${name}%`], (err, data) => {
        if (err) return res.status(500).json(err)

        if (data.length === 0) {
            return res.status(404).json("User not found")
        }

        const { password, ...info } = data[0]
        return res.json(info)
    })
}

export const updateUser = (req, res) => {
    const q =
        "UPDATE users SET `name`=?, `city`=?, `school`=? , `work`=? ,`coverPic`=?,`profilePic`=? ,`languages_spoken`=? ,`hobbies`=?,`nationality`=? ,`age`=? WHERE id=?"

    // Access userInfo from req.userInfo
    const userInfo = req.userInfo

    db.query(
        q,
        [
            req.body.name,
            req.body.city,
            req.body.school,
            req.body.work,
            req.body.coverPic,
            req.body.profilePic,
            req.body.languages_spoken,
            req.body.hobbies,
            req.body.nationality,
            req.body.age,
            userInfo.id,
        ],
        (err, result) => {
            if (err) {
                console.error(err)
                return res.status(500).json(err)
            }
            if (result.affectedRows > 0) return res.json("Updated!")
            return res.status(403).json("You can update only your post")
        }
    )
}

export const deleteUser = (req, res) => {
    const userInfo = req.userInfo

    const q = "DELETE FROM users WHERE id=?"

    db.query(q, [userInfo.id], (err, result) => {
        if (err) {
            console.error(err)
            return res.status(500).json(err)
        }
        if (result.affectedRows > 0) return res.json("deleted!")
        return res.status(403).json("You can delete only your account")
    })
}
