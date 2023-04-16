/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

// Deterministic JSON.stringify()
const stringify = require("json-stringify-deterministic");
const sortKeysRecursive = require("sort-keys-recursive");
const { Contract } = require("fabric-contract-api");
// let initCredential = require("./Credential_List.json");

class HyperBaseAuth extends Contract {
    async InitLedger(ctx) {
        const userdetails = [
            {
                emailId: "adhavan02@gmail.com",
                name: "adhavan",
                orgdetails: "",
                id: "1",
                password: "73994812",
                type: "super_admin",
            },
            {
                emailId: "johnsd2709@gmail.com",
                name: "John",
                orgdetails: "",
                id: "2",
                password: "123",
                type: "super_admin",
            },
            {
                emailId: "kiridharan217dec2001@gmail.com",
                name: "Kiridharan",
                orgdetails: "",
                id: "3",
                password: "123",
                type: "super_admin",
            },
            {
                emailId: "raj@gmail.com",
                name: "raj",
                orgdetails: "",
                id: "4",
                password: "123",
                type: "org_admin",
            },
        ];

        for (const user of userdetails) {
            // user.docType = "user";
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(
                user.id,
                Buffer.from(stringify(sortKeysRecursive(user)))
            );
        }
        console.info(
            "============= START : Initialize Credential Ledger ==========="
        );
    }

    async registerUser(ctx, emailId, name, orgName, id, password, type) {
        const userAsBytes = await ctx.stub.getState(id);
        if (userAsBytes && userAsBytes.length > 0) {
            throw new Error(`User with ID ${id} already exists`);
        }
        const user = {
            emailId,
            name,
            orgName,
            id,
            password,
            type,
        };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(user)));
    }

    async authenticateUser(ctx, emailId, password) {
        const userAsBytes = await ctx.stub.getState(emailId);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`User with ID ${id} does not exist`);
        }
        const user = JSON.parse(userAsBytes.toString());
        return user.password === password, user.id;
    }

    async queryUser(ctx, id) {
        const userAsBytes = await ctx.stub.getState(id);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`User with ID ${id} does not exist`);
        }
        const user = JSON.parse(userAsBytes.toString());
        return user;
    }

    async deleteUser(ctx, id) {
        const userAsBytes = await ctx.stub.getState(id);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`User with ID ${id} does not exist`);
        }
        await ctx.stub.deleteState(id);
    }

    async updateUser(ctx, id, name, orgName, password, type) {
        const userAsBytes = await ctx.stub.getState(id);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`User with ID ${id} does not exist`);
        }
        const user = JSON.parse(userAsBytes.toString());
        if (name) {
            user.name = name;
        }
        if (orgName) {
            user.orgName = orgName;
        }
        if (password) {
            user.password = password;
        }
        if (type) {
            user.type = type;
        }
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(user)));
    }
}

module.exports = HyperBaseAuth;
