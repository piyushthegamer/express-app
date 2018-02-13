const expect = require("chai").expect;
const axios = require("axios");
const express = require("../index.js").startServer;
describe("login testing ", () => {
   var server;
    before((done)=>{
        server = express(3030,done);
    });

  let host = "http://127.0.0.1:3030";
  it('should return object containing Status "success" incase of successfull login ', done => {
    axios({
      url: host + "/api/login",
      method: "POST",
      data: {
        username: "test",
        password: "test"
      }
    }).then(resolve => {
      expect(resolve.data.status).equal("success");
      done();
    });
  });

  it('should return object containing Status "failure" incase of successfull login', done => {
    axios({
      url: host + "/api/login",
      method: "POST",
      data: {
        username: "test",
        password: "123"
      }
    }).then(resolve => {
      expect(resolve.data.status).equal("failed");
      done();
    });
  });
  after((done)=>{
    server.close();
    done();
  });
});
