/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class TestContract extends Contract {

    async testExists(ctx, testId) {
        const buffer = await ctx.stub.getState(testId);
        return (!!buffer && buffer.length > 0);
    }

    async createTest(ctx, testId, value) {
        const exists = await this.testExists(ctx, testId);
        if (exists) {
            throw new Error(`The test ${testId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(testId, buffer);
    }

    async readTest(ctx, testId) {
        const exists = await this.testExists(ctx, testId);
        if (!exists) {
            throw new Error(`The test ${testId} does not exist`);
        }
        const buffer = await ctx.stub.getState(testId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateTest(ctx, testId, newValue) {
        const exists = await this.testExists(ctx, testId);
        if (!exists) {
            throw new Error(`The test ${testId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(testId, buffer);
    }

    async deleteTest(ctx, testId) {
        const exists = await this.testExists(ctx, testId);
        if (!exists) {
            throw new Error(`The test ${testId} does not exist`);
        }
        await ctx.stub.deleteState(testId);
    }

}

module.exports = TestContract;
