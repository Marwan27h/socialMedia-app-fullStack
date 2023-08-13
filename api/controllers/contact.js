import { db } from "../connect.js"

export const sendContactRequest = (req, res) => {

     const { username, email, subject, message } = req.body
    const q = `INSERT INTO contact (username, email, subject, message) VALUES (?, ?, ?, ?)`

   db.query(q, [username, email, subject, message], (err, result) => {
       if (err) {
           console.error("Error inserting data:", err)
           res.status(500).json({ message: "Failed to insert data" })
       } else {
           res.json({ message: "Data inserted successfully" })
       }
   })
}
