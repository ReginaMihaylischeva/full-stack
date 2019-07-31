const chai = require('chai');
const chaiHttp = require('chai-http');

const {
    expect
} = chai;
chai.use(chaiHttp);

describe('Posts Router', function() {
    describe('POST /addPost', function() {
        describe('when not authenticated', function() {
            before(async function() {
                //this.timeout(9000);
                this.response = await chai.request(this.app)
                    .post(`/addPost`)
                    .send({
                        content: 'post',
                        date: new Date(),
                        UserId: '',
                        email: 'tt@example.com'
                    });
            });
            it('should respond with 401', function() {
                expect(this.response).to.have.status(401);
            });
            it('should respond with correct message', function() {
                expect(this.response.text).to.equals('Unauthenticated');
            });
        });
        describe('when  authenticated', function() {
            before(async function() {
                this.responseLogin = await chai.request(this.app)
                    .post(`/login`)
                    .send({
                        email: 'test@example.com',
                        password: 'password'
                    });

                this.response = await chai.request(this.app)
                    .post(`/addPost`)
                    .send({
                        content: 'post',
                        // date: new Date(),
                        UserId: this.responseLogin.body.id,
                        email: 'test@example.com'
                    });
            });
            it('should respond with 200', function() {
                expect(this.response).to.have.status(200);
            });
        });
    });
    describe('POST /getPosts', function() {
        describe('when  have post', function() {
            before(async function() {
                this.timeout(10000);
                this.responseLogin2 = await chai.request(this.app)
                    .post(`/login`)
                    .send({
                        email: 'test1@example.com',
                        password: 'password1'
                    });

                this.response = await chai.request(this.app)
                    .post(`/addPost`)
                    .send({
                        content: 'post',
                        // date: new Date(),
                        UserId: this.responseLogin2.body.id,
                        email: 'test1@example.com'
                    });
                this.responseLogin = await chai.request(this.app)
                    .post(`/login`)
                    .send({
                        email: 'test@example.com',
                        password: 'password'
                    });
                this.response = await chai.request(this.app)
                    .post(`/getPosts`)
                    .send({
                        UserId: this.responseLogin.body.id,
                    });
            });
            it('should respond with 200', function() {
                expect(this.response).to.have.status(200);
            });
            it('should respond with correct body', function() {
                expect(this.response.body).be.a('array');
            });
        });


    });

    describe('POST /getMyPosts', function() {
        describe('when  have post', function() {
            before(async function() {
                this.responseLogin = await chai.request(this.app)
                    .post(`/login`)
                    .send({
                        email: 'test@example.com',
                        password: 'password'
                    });
                this.response = await chai.request(this.app)
                    .post(`/getMyPosts`)
                    .send({
                        UserId: this.responseLogin.body.id,
                    });
            });
            it('should respond with 200', function() {
                expect(this.response).to.have.status(200);
            });
            it('should respond with correct body', function() {
                expect(this.response.body).be.a('array');
            });

        });


    });
});