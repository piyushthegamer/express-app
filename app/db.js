const connector = require("./DBconnector.js").db;

class queries {
    insert (json) {
        let sql = "INSERT INTO user SET ?"
        return new Promise((resolve,reject)=>{
            connector.query(sql,json,(err,res)=>{
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    checkUser (login,password) {
        let sql = 'SELECT email FROM user WHERE userid = ? AND password = ?';
        return new Promise((resolve,reject)=>{
            connector.query(sql,[login,password],(err,res)=>{
                if (err) reject(err);
                else resolve(res);
            });
        });
    }
}

exports.queries = queries;
