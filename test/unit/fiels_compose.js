
const { compose } = require('db/schema');
const Entity = require('db/schema/entity');
const Base = require('db/schema/base');
const { has } = require('lodash/fp');
const should = require('should');

describe('Compose', () => {
    it('Should compose schemas', () => {
        const composedSchema = compose([Entity, Base]);

        has('id', composedSchema).should.be.equal(true);
        has('ownerId', composedSchema).should.be.equal(true);
        has('userId', composedSchema).should.be.equal(true);
        has('createdAt', composedSchema).should.be.equal(true);
        has('_createdBy', composedSchema).should.be.equal(true);
        has('updatedAt', composedSchema).should.be.equal(true);
        has('_updatedBy', composedSchema).should.be.equal(true);
    });
});
