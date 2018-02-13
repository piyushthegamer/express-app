let axios = require("axios");
const path = require("path");
const config = require("config");
 class pages {

    async login (req,res)  {
        let resp = await axios({
            method: 'post',
            url: `${config.get("host")}:${config.get("port")}/api/login`,
            data: req.body
          });
          if(resp.data.status == 'success'){
              req.session.logged = "logged"; 
          }
          res.redirect('/page1');
    }

    async register (req,res) {
        let resp = await axios({
            method: 'post',
            url: `${config.get("host")}:${config.get("port")}/api/register`,
            data: req.body
          });
          if(resp.data.status == 'success'){
            req.session.logged = "logged"; 
        }
        res.redirect('/page1');
    }

    logout (req,res) {
        req.session.destroy(function(err){
            res.redirect('/');
        });
    }

    page1 (req,res) {
        if(req.session.logged){
            res.sendFile(path.join(__dirname, "../public/page1.html"));
        }else{
            res.redirect('/');
        }
    }

    page2 (req,res) {
        if(req.session.logged){
            res.sendFile(path.join(__dirname, "../public/page2.html"));
        }else{
            res.redirect('/');
        }
    }
}

exports.pages = pages