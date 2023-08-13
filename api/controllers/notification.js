import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const getNotificationsLikesComments = (req, res) => {
    const q = `
    SELECT
      c.createdAt AS notificationCreatedAt,
      'comment' AS type,
      c.postId,
      c.userId AS actionUserId,
      u.name AS actionUserName,
      u.profilePic AS actionUserProfilePic
    FROM
      comments AS c
    JOIN
      users AS u ON (c.userId = u.id)
    WHERE
      c.postId IN (
        SELECT id
        FROM posts
        WHERE userId = ?
      )
    UNION
    SELECT
      l.createdAt AS notificationCreatedAt,
      'like' AS type,
      l.postId,
      l.userId AS actionUserId,
      u.name AS actionUserName,
      u.profilePic AS actionUserProfilePic
    FROM
      likes AS l
    JOIN
      users AS u ON (l.userId = u.id)
    WHERE
      l.postId IN (
        SELECT id
        FROM posts
        WHERE userId = ?
      )
    ORDER BY
      notificationCreatedAt DESC
      LIMIT 10;
  `

    db.query(q, [req.query.userId, req.query.userId], (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}
