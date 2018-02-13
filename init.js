const startServer = require('./app/index').startServer;
const config = require("config");
var server = startServer(config.get("port"),()=>{
    console.log(`server has started`);
});
