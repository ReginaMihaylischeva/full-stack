const chai = require('chai');
const chaiHttp = require('chai-http');

const {
    expect
} = chai;
chai.use(chaiHttp);

describe('User Router', function() {

    describe('GET /getUsers', function() {
        describe('when not authenticated', function() {
            before(async function() {
                this.timeout(9000);
                this.response = await chai.request(this.app)
                    .get(`/getUsers`)
                    .send();
            });

            it('should respond with 401', function() {
                expect(this.response).to.have.status(401);
            });

        });

        describe('when  authenticated', function() {
            before(async function() {
                this.timeout(9000);
                const agent = chai.request.agent(this.app);
                await agent.post('/login').send({
                    email: 'test@example.com',
                    password: 'password',
                });
                this.response = await agent
                    .get(`/getUsers`)

            });

            it('should respond with 200', function() {
                expect(this.response).to.have.status(200);
            });

        });

    });

    describe('POST /searchUsers', function() {
        describe('when search users ', function() {
            before(async function() {
                this.timeout(9000);
                const agent = chai.request.agent(this.app);
                this.response = await agent
                    .post(`/searchUsers`)
                    .send({
                        nameSurname: 'test'
                    });
            });

            it('should respond with 200', function() {
                expect(this.response).to.have.status(200);
            });
            it('should respond with correct body', function() {
                expect(this.response.body).be.a('array');
                expect(this.response.body[0]).to.deep.equals({
                    email: 'test@example.com',
                    surname: 'test',
                    name: 'test',
                });
            });


        });

    });

    describe('POST /requestFriends', function() {
        describe('when have request ', function() {
            before(async function() {
                this.response = await chai.request(this.app)
                    .post(`/id`)
                    .send({
                        email: 'test1@example.com'
                    });
                this.responseAddFriend = await chai.request(this.app)
                    .post(`/addFriend`)
                    .send({
                        email1: 'test@example.com',
                        email2: 'test1@example.com',
                        relations: 'request'
                    })
                this.responseGetFriends = await chai.request(this.app)
                    .post(`/requestFriends`)
                    .send({
                        id: this.response.body.id,
                        relations: 'request'
                    });
            });

            it('should respond with 200', function() {
                expect(this.responseGetFriends).to.have.status(200);
            });
            it('should respond with correct body', function() {
                expect(this.responseGetFriends.body).be.a('array');
                expect(this.responseGetFriends.body[0]).to.deep.equals([{
                    email: 'test@example.com',
                    surname: 'test',
                    name: 'test',

                }]);

            });


        });
    });

    describe('POST /addFriend', function() {
        describe('when send request ', function() {
            before(async function() {
                this.timeout(9000);
                this.response = await chai.request(this.app)
                    .post(`/registration`)
                    .send({
                        email: 'test2@example.com',
                        password: 'password2',
                        name: 'test2',
                        surname: 'test2',
                        year: 54
                    });
                this.response = await chai.request(this.app)
                    .post(`/registration`)
                    .send({
                        email: 'test3@example.com',
                        password: 'password3',
                        name: 'test3',
                        surname: 'test3',
                        year: 54
                    });

                this.responseAddFriend2 = await chai.request(this.app)
                    .post(`/addFriend`)
                    .send({
                        email1: 'test@example.com',
                        email2: 'test2@example.com',
                        relations: 'request'
                    })
                this.responseAddFriend3 = await chai.request(this.app)
                    .post(`/addFriend`)
                    .send({
                        email1: 'test@example.com',
                        email2: 'test3@example.com',
                        relations: 'request'
                    })
            });
            it('should respond with 200 request test3@example.com, test2@example.com', function() {
                expect(this.responseAddFriend2).to.have.status(200);
                expect(this.responseAddFriend3).to.have.status(200);

            });

        });
        describe('when send delete ', function() {
            before(async function() {
                this.timeout(9000);
                this.responseAddFriend = await chai.request(this.app)
                    .post(`/addFriend`)
                    .send({
                        email1: 'test@example.com',
                        email2: 'test3@example.com',
                        relations: 'delete'
                    })
            });
            it('should respond with 200 delete test3@example.com', function() {
                expect(this.responseAddFriend).to.have.status(200);

            });

        });
        describe('when send friend ', function() {
            before(async function() {
                this.timeout(9000);
                this.responseAddFriend = await chai.request(this.app)
                    .post(`/addFriend`)
                    .send({
                        email1: 'test@example.com',
                        email2: 'test2@example.com',
                        relations: 'friend'
                    })

            });
            it('should respond with 200 add test2@example.com', function() {
                expect(this.responseAddFriend).to.have.status(200);

            });

        });

    });


    describe('POST /getFriends', function() {
        describe('when have friends ', function() {
            before(async function() {

                this.responseAddFriend = await chai.request(this.app)
                    .post(`/addFriend`)
                    .send({
                        email1: 'test@example.com',
                        email2: 'test1@example.com',
                        relations: 'friend'
                    })
                this.response = await chai.request(this.app)
                    .post(`/id`)
                    .send({
                        email: 'test1@example.com'
                    });

                //  this.timeout(9000);
                this.responseGetFriends = await chai.request(this.app)
                    .post(`/getFriends`)
                    .send({
                        UserId: this.response.body.id,
                        relations: 'friend'
                    });
            });

            it('should respond with 200', function() {
                expect(this.responseGetFriends).to.have.status(200);
            });
            it('should respond with correct body', function() {
                expect(this.responseGetFriends.body).be.a('array');
                expect(this.responseGetFriends.body[0]).to.deep.equals({
                    email: 'test@example.com',
                });

            });
        });
    });

});