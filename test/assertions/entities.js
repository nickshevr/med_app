const should = require('should');

exports = module.exports = should;

should.Assertion.add(
    'Consultance',
    function () {
        this.params = { operator: 'to be Consultance' };

        const dbObject = this.obj;
        should.exists(dbObject);
        dbObject.should.be.an.Object;
        dbObject.should.have.properties(['id', 'userId', 'time_start', 'time_end', 'ownerId']);
    },
    true,
);
