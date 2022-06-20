/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { TestContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('TestContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new TestContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"test 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"test 1002 value"}'));
    });

    describe('#testExists', () => {

        it('should return true for a test', async () => {
            await contract.testExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a test that does not exist', async () => {
            await contract.testExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createTest', () => {

        it('should create a test', async () => {
            await contract.createTest(ctx, '1003', 'test 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"test 1003 value"}'));
        });

        it('should throw an error for a test that already exists', async () => {
            await contract.createTest(ctx, '1001', 'myvalue').should.be.rejectedWith(/The test 1001 already exists/);
        });

    });

    describe('#readTest', () => {

        it('should return a test', async () => {
            await contract.readTest(ctx, '1001').should.eventually.deep.equal({ value: 'test 1001 value' });
        });

        it('should throw an error for a test that does not exist', async () => {
            await contract.readTest(ctx, '1003').should.be.rejectedWith(/The test 1003 does not exist/);
        });

    });

    describe('#updateTest', () => {

        it('should update a test', async () => {
            await contract.updateTest(ctx, '1001', 'test 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"test 1001 new value"}'));
        });

        it('should throw an error for a test that does not exist', async () => {
            await contract.updateTest(ctx, '1003', 'test 1003 new value').should.be.rejectedWith(/The test 1003 does not exist/);
        });

    });

    describe('#deleteTest', () => {

        it('should delete a test', async () => {
            await contract.deleteTest(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a test that does not exist', async () => {
            await contract.deleteTest(ctx, '1003').should.be.rejectedWith(/The test 1003 does not exist/);
        });

    });

});
