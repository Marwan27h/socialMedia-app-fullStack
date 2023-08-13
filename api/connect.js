import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password:"hyfpassword",
    database: "social"

})