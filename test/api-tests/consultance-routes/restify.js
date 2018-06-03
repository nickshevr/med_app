const request = require('supertest');
const app = require('api-rest/app');
const agent = request.agent(app);
const sequalizeInstace = require('db/adapter');

require('test/assertions');

describe('Restify routes', () => {

    before(async function () {
        await sequalizeInstace.sync({ force: true });
    });

    describe('/api/v1/consultance', async () => {
        let user;

        before(async () => {
            const { body } = await agent.post('/api/v1/signup')
                .send({
                    email: 'ya@ya.ru',
                    password: '123456',
                });

            user = body;
        });

        it('#POST Should create consultance object', async () => {
            const time = {
                time_start: Date.now(),
                time_end: Date.now() + 10000,
            };

            const res = await agent.post('/api/v1/consultance')
                .send(time);

            res.should.be.GoodResponse();

            const { body } = res;

            //body.time_start.should.be.equal(time.time_start);
            //body.time_end.should.be.equal(time.time_end);
            body.should.be.Consultance();
            body.userId.should.be.equal(user.id);
            body._createdBy.should.be.equal(user.id);
            body._updatedBy.should.be.equal(user.id);
        });

        it('#GET Should get consultance objects', async () => {
            const res = await agent.get('/api/v1/consultance');
            const { body } = res;

            res.should.be.GoodResponse()
            body[0].should.be.Consultance();
        });
    });
});
