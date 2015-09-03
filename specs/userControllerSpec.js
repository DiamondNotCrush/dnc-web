//Specs for UserController
var assert = require("assert");
var expect = require("chai").expect;
var request = require("request");



describe("Users", function(){
  // describe("/users/add", function(){
  //   it("should respond with user id", function(){
  //     //Build user data
  //     var user = {"username": "gribby", "email":"test@gmail.com", "password":"p455word"};
  //     //Call api with data
  //     request.post({url:"http://localhost:4588/user/addUser", form: user}, function (err, httpResponse, body) {
  //       expect(body.user).to.be.a("object");
  //       console.log("Returned User: ", user);
  //     });
  //   });
  // });
  describe("/users/login", function(){
    it("should authenticate user", function(){
      //Mock login via api
      var login = {"username": "gribby", "password":"p455word"};
      //compare returned data with success expectation
      request.post({url:"http://localhost:4588/user/login", form: login}, function (err, httpResponse, body) {
        console.log(body);
        expect(body).to.be("User Authenticated");
      });
    });
  });
  //   it("should redirect to library after login", function(){
  //     //page after login should be library on web side
  //     expect("true").to.be("false");
  //   });
  // });
  // describe("/user/update", function(){
  //   it("should update user", function(){
  //     var user1 = {"id": 5, "username": "gribby", "email": "updated@gmail.com", "password": "p455word"};
  //     var user2;
  //     //Submit user info
  //     request.post({url: "http://localhost:4588/user/updateUser/5", form: user1}, function (err, httpResponse, body) {
  //       request("http://localhost:4588/user/findUser/5", function (err, response, body) {
  //         if (err) {
  //           console.log(err);
  //         }
  //         user2 = body;
  //         assert.strictEqual(user1, user2);
  //       });
  //     });
  //   });
  // });
  // describe("/users/libray", function(){
  //   it("should display user's library", function(){
  //     //Should list files
  //     expect("true").to.be("false");
  //   });
  //   it("should update library titles with images", function(){
  //     //Filenames should have image tag
  //     expect("true").to.be("false");
  //   });
  //   it("should show 'pretty name' of files", function(){
  //     //Compare file name to expected 'pretty name'
  //     expect("true").to.be("false");
  //   });
  // });
});
