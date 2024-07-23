const mysql = require("mysql");

const db = mysql.createConnection({
    host : "localhost",
    user:"root",
    password: "13695669",
    database: "quora",
})

module.exports = db;