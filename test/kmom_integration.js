process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'lol';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');


chai.should();

chai.use(chaiHttp);

describe('Kmom', () => {
    describe('GET /reports/week/kmom01', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/kmom01")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");

                    done();
                });
        });
    });

    describe('GET /reports/week/kmom02', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/kmom02")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("object");

                    done();
                });
        });
    });
});
