

const sequalizeInstace = require('db/adapter');
const User = require('db/models/user');
const should = require('should');

describe('User model', () => {
    before(async () => {
        await sequalizeInstace.sync({ force: true });
    });

    it('Should create player', async () => {
        const user = await User.create();

        user.should.be.User();
    });
});
