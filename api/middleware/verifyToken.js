import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: "No token provided" })
    }

    // Split the "Bearer" prefix from the token value
    const tokenValue = token.split(" ")[1]

    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid")
        }

        req.userInfo = userInfo
        next()
    })
}
