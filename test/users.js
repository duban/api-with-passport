let chai = require("chai");
let chaiHttp = require("chai-http");
var nock = require('nock');
let server = require("../server");

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.SECRET_JWT || "";
const BASE_URL = process.env.BASE_URL;
const token = jwt.sign({ username: 'test' }, secretKey, {expiresIn: '30d'});






//Assertion Style
chai.should();

chai.use(chaiHttp);

let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRibjEyMyIsImlhdCI6MTYzNTA5NTQ2OCwiZXhwIjoxNjM3Njg3NDY4fQ.BPG34FrPJ3kdXq63i5sT-3QBAqNKfi72ceHnv8qyJgY'
let userId;

// describe('Users', function() {
//     before(function() {
//         it('Create user', function(done) {
//         const user = {"username":"test","password":"test123","token":token,"first_name":"user","last_name":"test","email":"test@mail.com","role":"SuperUser"};
//         chai.request(server)
//             .post("/api/v1/users/create")
//             .set('authorization', 'Bearer ' + accessToken)
//             .send(user)
//             .end(function(err, response) {
//                 if (err) done(err);
//                 response.should.have.status(200);
//                  });
//               done();
//     })
//     })
//     after(function() {
//         it('Delete user', function(done) {
//         chai.request(server)
//           .delete('/api/v1/users/delete/test')
//           .set('authorization', 'Bearer ' + accessToken)
//           .end(function(error, response){
//             response.should.have.status(200);
//             response.should.be.json;
//             response.body.should.be.a('object');
//         });
//         done();
//     })
//     })

//     it('List user', function(done) {
//         chai.request(server)
//             .get("/api/v1/users/list")
//             .set('authorization', 'Bearer ' + accessToken)
//             .end(function(err, response) {
//                 if (err) done(err);
//                 response.should.have.status(200);
//                  });
//               done();
//     })
// })

// describe('Users', function() {
    // before(function() {
    //     console.log('before')
        // describe('POST /v1/users/create', function() {
        // it('Create user', function(done) {
        //     const user = {"username":"test","password":"test123","token":token,"first_name":"user","last_name":"test","email":"test@mail.com","role":"SuperUser"};
        //     chai.request(server)
        //         .post("/api/v1/users/create")
        //         .set('authorization', 'Bearer ' + accessToken)
        //         .send(user)
        //         .end(function(err, response) {
        //             if (err) done(err);
        //             response.should.have.status(200);
        //             });
        //         done();
        // })
        // })
    //   });
    
    //   after(function() {
    //     console.log('after')
    //     describe('DELETE /v1/users/delete', function() {
    //     it('Delete user', function(done) {
    //         chai.request(server)
    //         .delete('/api/v1/users/delete/test')
    //         .set('authorization', 'Bearer ' + accessToken)
    //         .end(function(err, response) {
    //             if (err) done(err);
    //             response.should.have.status(200);
    //             });
    //         done();
    //         });
    // })
    //   });
    //   it('List user', function(done) {
    //     chai.request(server)
    //         .get("/api/v1/users/list")
    //         .set('authorization', 'Bearer ' + accessToken)
    //         .end(function(err, response) {
    //             if (err) done(err);
    //             response.should.have.status(200);
    //              });
    //           done();
    // })


// describe('POST /v1/users/create', function() {
//     it('Create user', function(done) {
//         const user = {"username":"test","password":"test123","token":token,"first_name":"user","last_name":"test","email":"test@mail.com","role":"SuperUser"};
//         chai.request(server)
//             .post("/api/v1/users/create")
//             .set('authorization', 'Bearer ' + accessToken)
//             .send(user)
//             .end(function(err, response) {
//                 if (err) done(err);
//                 response.should.have.status(200);
//                  });
//               done();
//     })
// })

describe('POST /v1/users/login', function() {
    it('Login success', function(done) {
        const user = {
            email: "test@mail.com",
            password: "test123"
        };
        chai.request(server)
            .post("/api/v1/users/login")
            .send(user)
            .end(function(err, response) {
                if (err) done(err);
                response.should.have.status(200);
                 });
              done();
    })
})



describe('GET /v1/users/list', function() {
    it('List user', function(done) {
        chai.request(server)
            .get("/api/v1/users/list")
            .set('authorization', 'Bearer ' + accessToken)
            .end(function(err, response) {
                if (err) done(err);
                response.should.have.status(200);
                 });
              done();
    })
})

// describe('POST /v1/users/login', function() {
//     it('Login success', function(done) {
//         const user = {
//             email: "test@mail.com",
//             password: "test123"
//         };
//         chai.request(server)
//             .post("/api/v1/users/login")
//             .send(user)
//             .end(function(err, response) {
//                 if (err) done(err);
//                 response.should.have.status(200);
//                  });
//               done();
//     })
// })

// describe('PUT /v1/users/password', function() {
//     it('Update password', function(done) {
//         const user = {
//             email: "test@mail.com",
//             password: "test123",
//             new_password:"test321"
//         };
//         chai.request(server)
//             .put("/api/v1/users/password")
//             // .set('content-type', 'application/json')
//             // .set('authorization', 'Bearer ' + accessToken)
//             .send(user)
//             .end(function(err, response) {
//                 if (err) done(err);
//                 response.should.have.status(200);
//                  });
//               done();
//     })
// })

describe('DELETE /v1/users/delete', function() {
    it('Delete user', function(done) {
        chai.request(server)
          .delete('/api/v1/users/delete/test')
          .set('authorization', 'Bearer ' + accessToken)
          .end(function(err, response) {
            if (err) done(err);
            response.should.have.status(200);
             });
          done();
        });
})


// describe('PUT /v1/users/password', function() {
//     it('Update password', function(done) {
//         const user = {
//             email: "test@mail.com",
//             password: "test123",
//             new_password:"test321"
//         };
//         chai.request(server)
//             .put("/api/v1/users/password")
//             .set('authorization', 'Bearer ' + accessToken)
//             .send(user)
//             .end(function(err, response) {
//                 if (err) done(err);
//                 response.should.have.status(201);
//                  });
//               done();
//     })
// })


// describe('DELETE /v1/users/delete', function() {
//     it('Delete user', function(done) {
//         chai.request(server)
//           .delete('/api/v1/users/delete/test')
//           .set('authorization', 'Bearer ' + accessToken)
//           .end(function(error, response){
//             response.should.have.status(200);
//             response.should.be.json;
//             response.body.should.be.a('object');
//         });
//         done();
//     })
// })

// it('DELETE /v1/users/delete', function(done) {
//     chai.request(server)
//           .delete('/api/v1/users/delete/test')
//           .set('authorization', 'Bearer ' + accessToken)
//           .end(function(error, response){
//             response.should.have.status(200);
//             response.should.be.json;
//             response.body.should.be.a('object');
//             done();
//         });
//   });
  



// describe('GET /v1/products', function() {
//     it('Get Products', function(done) {
//         chai.request(server)
//             .get("/api/v1/products")
//             .end(function(err, response) {
//                 if (err) done(err);
//                 response.should.have.status(200);
//                  });
//               done();
//     })
// })

// describe('Users API', () => {
//     describe("POST /login", () => {
//         it("Login success", (done) => {
//             const user = {
//                 email: "dbn@mail.com",
//                 password: "mudah123"
//             };
//             chai.request(server)
//                 .post("/api/v1/users/login")
//                 .send(user)
//                 .end((err, response) => {
//                     response.should.have.status(200);
//                     // response.body.should.be.a('object');
//                     // response.body.should.have.property('data');
//                     // response.body.data.should.have.property('username').eq('dbn123');
//                     // response.body.data.should.have.property('role').eq('SuperUser');

//                     // response.body.should.have.property('name').eq("Task 4");
//                     // response.body.should.have.property('completed').eq(false);
//                     done();
//                 });
//         });

//         it("Login failed", (done) => {
//             const user = {
//                 email: "duban@mail.com",
//                 password: "mudah12"
//             };
//             chai.request(server)
//                 .post("/api/v1/users/login")
//                 .send(user)
//                 .end((err, response) => {
//                     response.should.have.status(401);
//                     // response.body.should.be.a('object');
//                     // response.body.should.have.property('id').eq(4);
//                     // response.body.should.have.property('name').eq("Task 4");
//                     // response.body.should.have.property('completed').eq(false);
//                     done();
//                 });
//         });
//     });

// });

