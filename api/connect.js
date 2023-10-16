import dotenv from "dotenv"
import mysql from "mysql2"

dotenv.config()

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
})

// Attempt to connect to the database
db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err)
    } else {
        console.log("Connected to MySQL server")
    }
})

// You can also listen for disconnections
db.on("error", (err) => {
    console.error("Database error:", err)
})

// Export the connection for use in your application
export default db
