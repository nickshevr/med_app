const should = require('should');

exports = module.exports = should;

should.Assertion.add(
    'GoodResponse',
    function () {
        this.params = { operator: 'to be good response' };

        const response = this.obj;
        should.exists(response);
        response.should.be.an.Object;
        response.status.should.be.equal(200);
    },
    true,
);
