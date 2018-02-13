const encryptPassword = require("../crypto.js").encryptPassword;
const queries = require("../db.js").queries;
const db = new queries();
let login = async (req,res) => {
    try{
        let userId = await encryptPassword(req.body.username);
        let password = await encryptPassword(req.body.password);
        let checkLogin = await db.checkUser(userId,password);
        if(checkLogin.length > 0){
            res.json({"status":"success"});
        }else{
            res.json({"status":"failed"});
        }
    }catch(err){
        res.json({"status":"failed"});
    }
}

exports.login = login;