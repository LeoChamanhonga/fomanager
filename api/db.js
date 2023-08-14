// db.js
import "dotenv/config";
console.log(process.env.DB_USER_NAME);
import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "fomanager",
});
