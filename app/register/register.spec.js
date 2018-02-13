const expect = require("chai").expect;
const axios = require("axios");
const express = require("../index").startServer;

describe("register testing ", () => {
   let insert;
    before((done)=>{
        server = express(3031,done);
    });

  let host = "http://127.0.0.1:3031";

  it('should return object containing Status "failure" incase of failed registeration', done => {
    axios({
      url: host + "/api/register",
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
