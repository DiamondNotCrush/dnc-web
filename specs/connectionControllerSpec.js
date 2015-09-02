//Specs for ConnectionController
var assert = require("assert");
var expect = require("chai");
var request = require("request");

describe("Connections", function(){
  describe("/connection/addConnection", function(){
    it("should add or update conncection in database", function(){
      var form = {"port": 5000, "file": "/path/to/file.mp4"};
      request.post({url:"http://localhost:4588/connection/addConnection/5", form: form}, function (err, response, body) {
        expect(body.connection).to.be.a("object");
      });
    });
    it("should verify client-server connection", function(){
      expect("true").to.be("false");
    });
  });
});