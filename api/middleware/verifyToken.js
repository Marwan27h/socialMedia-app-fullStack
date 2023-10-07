import jwt from "jsonwebtoken"
import { promisify } from "util"
export const verifyToken = async (req, res, next) => {
    const bearerToken = req.get("Authorization")

    if (!bearerToken) {
        return res.status(401).json({
            success: false,
            message: "A token is required for authentication",
        })
    }

    const token = bearerToken.replace("Bearer ", "")

    try {
        const verifyJwt = promisify(jwt.verify)
        const decoded = await verifyJwt(token, process.env.JWT_SECRET)
        console.log("Decoded User Data:", decoded)

        req.user = decoded

        next()
    } catch (err) {
        console.error(err)
        return res
            .status(401)
            .json({ success: false, message: "Invalid Token" })
    }
}
