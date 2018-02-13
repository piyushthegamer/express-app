const mysql = require("mysql");
const config = require("config");

let db  = mysql.createPool(config.get('mysql'));

exports.db=db;