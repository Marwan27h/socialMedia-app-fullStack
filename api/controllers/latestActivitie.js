import { db } from "../connect.js"

export const latestActivities = (req, res) => {
    const userInfo = req.userInfo
    const userId = userInfo.id

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
}
