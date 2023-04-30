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
const { count } = require("console");
// let initCredential = require("./Credential_List.json");

class HyperBaseAuth extends Contract {
    async InitLedger(ctx) {
        const userdetails = [
            {
                emailId: "adhavan02@gmail.com",
                name: "adhavan",
                orgDetails: [],
                channelDetails: {
                    hyperbase: ["hyperbase"],
                },
                smartContracts: {},
                ID: `hyperbase_adhavan_1`,
                password: "73994812",
                type: "super_admin",
            },
            {
                emailId: "johnsd2709@gmail.com",
                name: "John",
                orgDetails: [],
                channelDetails: {
                    hyperbase: ["hyperbase"],
                },
                smartContracts: {},
                ID: `hyperbase_john_2`,
                password: "123",
                type: "super_admin",
            },
            {
                emailId: "kiridharan217dec2001@gmail.com",
                name: "Kiridharan",
                orgDetails: [],
                channelDetails: {
                    hyperbase: ["hyperbase"],
                },
                smartContracts: {},
                ID: `hyperbase_kiridharan_3`,
                password: "123",
                type: "super_admin",
            },
            {
                emailId: "raj@gmail.com",
                name: "raj",
                orgDetails: [],
                channelDetails: {
                    hyperbase: ["hyperbase"],
                },
                smartContracts: {},
                ID: `hyperbase_raj_4`,
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
                user.ID,
                Buffer.from(stringify(sortKeysRecursive(user)))
            );
        }
        console.info(
            "============= START : Initialize Credential Ledger ==========="
        );
    }

    async registerUser(ctx, emailId, name, password, type) {
        let counter = 4;
        let userId = `hyperbase_${name}_${counter + 1}`;
        const userAsBytes = await ctx.stub.getState(userId);
        if (userAsBytes && userAsBytes.length > 0) {
            return `User with ID ${userId} already exists`;
        }
        const user = {
            emailId,
            name,
            orgDetails: [],
            channelDetails: {
                hyperbase: ["hyperbase"],
            },
            smartContracts: {},
            ID: userId,
            password,
            type,
        };
        try {
            const result = await ctx.stub.putState(
                userId,
                Buffer.from(JSON.stringify(user))
            );
            if (result) {
                counter = counter + 1;
                return `${userId}`;
            } else {
                return `User with ID ${userId} failed to register`;
            }
        } catch (error) {
            throw new Error(`User with ID ${userId} already exists`);
        }
    }

    async authenticateUser(ctx, ID, password) {
        const userAsBytes = await ctx.stub.getState(ID);
        console.log(userAsBytes);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`User with ID ${ID} does not exist`);
        }
        const user = JSON.parse(userAsBytes.toString());
        return user.password === password;
    }

    async queryUser(ctx, ID) {
        const userAsBytes = await ctx.stub.getState(ID);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`User with ID ${ID} does not exist`);
        }
        const user = JSON.parse(userAsBytes.toString());
        return user;
    }

    async deleteUser(ctx, ID) {
        const userAsBytes = await ctx.stub.getState(ID);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`User with ID ${ID} does not exist`);
        }
        await ctx.stub.deleteState(ID);
    }

    async updateUser(
        ctx,
        ID,
        emailId,
        name,
        orgDetails,
        channelDetails,
        smartContracts,
        password,
        type
    ) {
        const userAsBytes = await ctx.stub.getState(ID);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`User with ID ${ID} does not exist`);
        }
        const user = JSON.parse(userAsBytes.toString());
        if (emailId) {
            user.emailId = emailId;
        }
        if (name) {
            user.name = name;
        }
        if (password) {
            user.password = password;
        }
        if (type) {
            user.type = type;
        }
        await ctx.stub.putState(ID, Buffer.from(JSON.stringify(user)));
    }

    async updateorgDetails(ctx, ID, networkName, orgName) {
        const userAsBytes = await ctx.stub.getState(ID);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`User with ID ${ID} does not exist`);
        }
        let key = networkName;
        // let orgDetails = { [key]: orgName };
        const user = JSON.parse(userAsBytes.toString());
        user.orgDetails.push({ [key]: orgName });
        // if (orgDetails) {
        // }
        await ctx.stub.putState(ID, Buffer.from(JSON.stringify(user)));
    }

    async updatechannelDetails(
        ctx,
        ID,
        networkName,
        channelname,
        addExistingNetwork
    ) {
        const userAsBytes = await ctx.stub.getState(ID);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`User with ID ${ID} does not exist`);
        }
        const user = JSON.parse(userAsBytes.toString());

        if (addExistingNetwork === true) {
            user.channelDetails[`${networkName}`].push(channelname);
        } else {
            user.channelDetails[`${networkName}`] = [`${channelname}`];
        }
        await ctx.stub.putState(ID, Buffer.from(JSON.stringify(user)));
    }

    async updatesmartContracts(
        ctx,
        ID,
        networkName,
        channelname,
        smartContractName,
        addExistingChannel
    ) {
        const userAsBytes = await ctx.stub.getState(ID);
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`User with ID ${ID} does not exist`);
        }
        const user = JSON.parse(userAsBytes.toString());
        if (addExistingChannel === true) {
            user.smartContracts[`${networkName}_${channelname}`].push(
                smartContractName
            );
        } else {
            user.smartContracts[`${networkName}_${channelname}`] = [
                `${smartContractName}`,
            ];
        }
        await ctx.stub.putState(ID, Buffer.from(JSON.stringify(user)));
    }
}

module.exports = HyperBaseAuth;
