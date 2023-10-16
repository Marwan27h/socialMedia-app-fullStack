import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.accessToken
    if (!token) {
        return res.status(401).json("Not authenticated")
    }

    try {
        const userInfo = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(userInfo)
                }
            })
        })

        req.userInfo = userInfo
        next()
    } catch (error) {
        res.status(403).json("Token is not valid")
    }
}
