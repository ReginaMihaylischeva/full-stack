const chai = require('chai');
const chaiHttp = require('chai-http');

const {
    expect
} = chai;
chai.use(chaiHttp);



describe('Auth Router', function() {

    describe('POST /registration', function() {
        describe('when registration with correct body', function() {
            before(async function() {
                this.timeout(9000);
                this.response = await chai.request(this.app)
                    .post(`/registration`)
                    .send({
                        email: 'test@example.com',
                        password: 'password',
                        name: 'test',
                        surname: 'test',
                        year: 54
                    });
            });
            it('should respond with 200', function() {
                expect(this.response).to.have.status(200);
            });
        });
        describe('when registration with incorrect body', function() {
            before(async function() {
                this.timeout(9000);
                this.response = await chai.request(this.app)
                    .post(`/registration`)
                    .send({
                        email: 'test@example.com',
                        password: 'password1',
                        name: 'test1',
                        surname: 'test1'
                    });
            });

            it('should respond with 401', function() {
                expect(this.response).to.have.status(401);
            });
        });



        describe('POST /login', function() {
            describe('when try authenticated with incorrect body', function() {
                before(async function() {
                    this.response = await chai.request(this.app)
                        .post(`/login`)
                        .send();
                });
                it('should respond with 401', function() {
                    expect(this.response).to.have.status(401);
                });

                it('should respond with correct message', function() {
                    expect(this.response.text).to.equals('Incorrect login/password');
                });
            });
            describe('when  authenticated ', function() {
                before(async function() {
                    this.timeout(9000);
                    const agent = chai.request.agent(this.app);
                    await agent.post('/login').send({
                        email: 'test@example.com',
                        password: 'password',
                    });
                    this.response = await agent
                        .post(`/login`)
                        .send({
                            email: 'test@example.com',
                            password: 'password',
                        });

                });
                it('should respond with 404', function() {
                    expect(this.response).to.have.status(404);
                });
                it('should respond with correct message', function() {
                    expect(this.response.text).to.equals('Authenticated');
                });

            });
            describe('when not authenticated ', function() {
                before(async function() {
                    this.timeout(9000);
                    this.response = await chai.request(this.app)
                        .post(`/registration`)
                        .send({
                            email: 'test1@example.com',
                            password: 'password1',
                            name: 'test1',
                            surname: 'test1'
                        });


                    this.response = await chai.request(this.app)
                        .post(`/login`)
                        .send({
                            email: 'test1@example.com',
                            password: 'password1'
                        });
                });
                it('should respond with 200', function() {
                    expect(this.response).to.have.status(200);
                });
            });

        });

        describe('POST /me', function() {
            describe('when not authenticated', function() {
                before(async function() {
                    this.timeout(9000);
                    this.response1 = await chai.request(this.app)
                        .post(`/id`)
                        .send({
                            email: 'test@example.com'
                        });

                    this.response = await chai.request(this.app)
                        .post(`/me`)
                        .send({
                            id: this.response1.body.id
                        });

                });

                it('should respond with 401', function() {
                    expect(this.response).to.have.status(401);
                });

                it('should respond with correct body', function() {
                    expect(this.response.body).to.deep.equals({
                        email: 'test@example.com',
                        surname: 'test',
                        name: 'test',
                        year: 54
                    });
                });
            });

            describe('when authenticated', function() {
                before(async function() {
                    this.timeout(9000);

                    const agent = chai.request.agent(this.app);
                    this.response = await agent
                        .post('/login').send({
                            email: 'test@example.com',
                            password: 'password',
                        });
                    this.response = await agent
                        .post(`/me`)
                        .send({
                            id: this.response.body.id
                        });
                });

                it('should respond with 200', function() {
                    expect(this.response).to.have.status(200);
                });

                it('should respond with correct body', function() {
                    expect(this.response.body).to.deep.equals({
                        email: 'test@example.com',
                        surname: 'test',
                        name: 'test',
                        year: 54
                    });
                });
            });
        });




        describe('POST /id', function() {
            describe('when try get id with correct body', function() {
                before(async function() {
                    this.timeout(9000);

                    const agent = chai.request.agent(this.app);
                    this.response = await agent
                        .post(`/login`)
                        .send({
                            email: 'test@example.com',
                            password: 'password',
                        })
                    this.response1 = await chai.request(this.app)
                        .post(`/id`)
                        .send({
                            email: 'test@example.com'
                        })
                    //console.log('response'+this.response.body.id);
                    const id = this.response.body.id;
                });
                it('should respond with 200', function() {
                    expect(this.response1).to.have.status(200);
                });

                it('should respond with correct body', function() {
                    expect(this.response1.body).to.deep.equals({
                        id: this.response.body.id,

                    });
                });
            });

            describe('when try get id with incorrect body', function() {
                before(async function() {
                    this.timeout(9000);
                    this.response = await chai.request(this.app)
                        .post(`/id`)
                        .send({
                            email: 't@example.com'
                        });
                });
                it('should respond with 404', function() {
                    expect(this.response).to.have.status(404);
                });

            })

        });

    });

});