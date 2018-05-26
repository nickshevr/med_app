
const { compose } = require('db/schema');
const EntitySchema = require('db/schema/entity');
const BaseSchema = require('db/schema/base');
const { has } = require('lodash/fp');
const should = require('should');

describe('Compose', () => {
    it('Should compose schemas', () => {
        const composedSchema = compose([EntitySchema, BaseSchema]);

        has('id', composedSchema).should.be.equal(true);
    });
});
