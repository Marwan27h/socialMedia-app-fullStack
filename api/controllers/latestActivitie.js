import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const latestActivities = (req, res) => {
    const token = req.cookies.accessToken
    if (!token) return res.status(401).json("Not authenticated")

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid")

        const userId = userInfo.id // Get the current user's ID from the decoded token

        const q = `
  SELECT
    'post' as type,
    p.id as activityId,
    p.userId,
    p.createdAt as timestamp,
    u.name as userName,
    u.profilePic as userAvatar
  FROM posts AS p
  JOIN users AS u ON (u.id = p.userId)
  WHERE p.userId = ? OR p.userId IN (
    SELECT followedUserId
    FROM relationships
    WHERE followerUserId = ?
  )
  
  UNION

  SELECT
    'comment' as type,
    c.id as activityId,
    c.userId,
    c.createdAt as timestamp,
    u.name as userName,
    u.profilePic as userAvatar
  FROM comments AS c
  JOIN users AS u ON (u.id = c.userId)
  JOIN posts AS p ON (p.id = c.postId)
  LEFT JOIN relationships AS r ON (r.followedUserId = c.userId AND r.followerUserId = ?)
  WHERE (c.userId = ? OR r.followerUserId = ?) AND c.createdAt > p.createdAt
  
  UNION

  SELECT
    'like' as type,
    l.id as activityId,
    l.userId,
    l.createdAt as timestamp,
    u.name as userName,
    u.profilePic as userAvatar
  FROM likes AS l
  JOIN users AS u ON (u.id = l.userId)
  JOIN posts AS p ON (p.id = l.postId)
  LEFT JOIN relationships AS r ON (r.followedUserId = l.userId AND r.followerUserId = ?)
  WHERE (l.userId = ? OR r.followerUserId = ?) AND l.createdAt > p.createdAt

  ORDER BY timestamp DESC
  LIMIT 5;
`

        db.query(
            q,
            [userId, userId, userId, userId, userId, userId, userId, userId],
            (err, result) => {
                if (err) {
                    console.error(err)
                    return res.status(500).json(err)
                }
                return res.json(result)
            }
        )
    })
}
