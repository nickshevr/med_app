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

    describe('#POST /api/signup', async () => {
        let response = null;

        before(async () => {
            response = await agent.post('/api/v1/signup')
                .send({
                    email: 'ya@ya.ru',
                    password: '123456',
                });
        });

        it('Should return user info', async () => {
            response.body.should.have.properties(['id', 'email', 'createdAt', 'updatedAt']);
            response.body.should.not.have.properties(['hash', 'salt']);
        });

        it('Should create userObject intoDB', async () => {
            const user = await User.findOne({ where: { email: 'ya@ya.ru' } });

            user.should.have.properties(['id', 'email', 'createdAt', 'updatedAt', 'hash', 'salt']);
        });

        it('Should create session into db', async () => {
            const session = await Session.findOne({});

            session.should.have.properties(['sid', 'sess', 'sid']);
        });

        it('Shouldnt create user with the same email', async () => {
            const res = await agent.post('/api/v1/signup')
                .send({
                    email: 'ya@ya.ru',
                    password: '123456',
                });

            res.body.should.be.deepEqual({
                message: 'Email is already used',
                name: 'NotAcceptableError',
                statusCode: 406,
            });
        });
    });
});
