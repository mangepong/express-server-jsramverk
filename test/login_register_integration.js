process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'lol';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');


chai.should();

chai.use(chaiHttp);

describe('Register', () => {
    describe('POST /register', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/register")
                .type('form')
                .send({
                    email:"test@test.se",
                    password:"test123"
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    done();
                });
        });
    });
});

describe('Login', () => {
    describe('POST /login', () => {
        it('201 HAPPY PATH', (done) => {
            chai.request(server)
                .post("/login")
                .send({
                    email:"test@test.se",
                    password:"test123"
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
});
