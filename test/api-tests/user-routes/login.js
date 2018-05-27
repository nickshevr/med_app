const request = require('supertest');
const app = require('api-rest/app');
const qs = require('qs');
const agent = request.agent(app);
const User = require('db/models/user');
const Session = require('db/models/session');
const sequalizeInstace = require('db/adapter');

describe('User routes', () => {

    before(async function () {
        await sequalizeInstace.sync({ force: true });
    });

    describe('#POST /api/v1/login', async () => {
        before(async () => {
            await agent.post('/api/v1/signup')
                .send({
                    email: 'ya@ya.ru',
                    password: '123456',
                });
        });

        it('Login with valid data', async () => {
            const res = await agent.post('/api/v1/login')
                .send({
                    email: 'ya@ya.ru',
                    password: '123456',
                });

            res.body.should.have.properties(['id', 'email', 'createdAt', 'updatedAt']);
            res.body.should.not.have.properties(['hash', 'salt']);
        });

        it('Login with invalid data ${password}', async () => {
            const res = await agent.post('/api/v1/login')
                .send({
                    email: 'ya@ya.ru',
                    password: '123123',
                });

            res.body.should.be.deepEqual({
                message: 'Wrong password',
                name: 'NotAcceptableError',
                statusCode: 406,
            });
        });


        it('Login with invalid data ${login}', async () => {
            const res = await agent.post('/api/v1/login')
                .send({
                    email: 'WrongLogin',
                    password: '123123',
                });

            res.body.should.be.deepEqual({
                message: 'Unregistered Email',
                name: 'NotFoundError',
                statusCode: 404
            });
        });
    });
});
