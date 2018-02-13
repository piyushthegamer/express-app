const encryptPassword = require("../crypto.js").encryptPassword;
const queries = require("../db.js").queries;
let db = new queries();
let register = async (req,res) => {
    try{
    let userId = await encryptPassword(req.body.usernamesignup);
    let password = await encryptPassword(req.body.passwordsignup);
    let insertParams = {"email":req.body.emailsignup,"userid":userId,"password":password};
    let insertQuery = await db.insert(insertParams);
    if(insertQuery.affectedRows){
        res.json({"status":"success"});
    }else{
        res.json({"status":"failed"});
    }
    }catch(err){
        console.log(err)
        res.json({"status":"failed"});
    }
}

exports.register = register;