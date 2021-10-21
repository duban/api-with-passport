let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Users API', () => {
    describe("POST /login", () => {
        it("Login success", (done) => {
            const user = {
                email: "duban@mail.com",
                password: "mudah123"
            };
            chai.request(server)
                .post("/api/v1/users/login")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('object');
                    response.body.should.have.property('data');
                    response.body.data.should.have.property('username').eq('dbn123');
                    response.body.data.should.have.property('role').eq('SuperUser');

                    // response.body.should.have.property('name').eq("Task 4");
                    // response.body.should.have.property('completed').eq(false);
                    done();
                });
        });

        it("Login failed", (done) => {
            const user = {
                email: "duban@mail.com",
                password: "mudah12"
            };
            chai.request(server)
                .post("/api/v1/users/login")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    // response.body.should.have.property('id').eq(4);
                    // response.body.should.have.property('name').eq("Task 4");
                    // response.body.should.have.property('completed').eq(false);
                    done();
                });
        });
    });

});

