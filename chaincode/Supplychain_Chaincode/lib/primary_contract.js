/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');
let initCredential = require('./Credential_List.json');
    
class Supplychain_Contract extends Contract {

    async InitLedger(ctx) {
        const bills = [
            {
                ID: "Producer_Samsung_Bill1", 
                ProductId:"Sony_Xperia_XZ2",
                Comments : "Display",
                billReceipt: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.aJB-CvRfUH13gpdPTCY7IQHaEK%26pid%3DApi&f=1',
            },
            {
                ID: "Producer_Sony_Bill1",
                ProductId:"Sony_Xperia_XZ2",  
                Comments : "Camera_Module",
                billReceipt: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.TSHmDzushvy52VdllZvPMgHaEK%26pid%3DApi&f=1',
            },
            {
                ID: "Producer_Qualcomn_Bill1",
                ProductId:"Sony_Xperia_XZ2",  
                Comments : "Soc",
                billReceipt: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.TSHmDzushvy52VdllZvPMgHaEK%26pid%3DApi&f=1',
            },
            {
                ID: "Manufacturer_Foxcom_Bill1",
                ProductId:"Sony_Xperia_XZ2",  
                Comments : "Total Cost of manufacturing",
                billReceipt: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.TSHmDzushvy52VdllZvPMgHaEK%26pid%3DApi&f=1',
            },          
        ];

        for (const bill of bills) {
            bill.docType = 'bill';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(bill.ID, Buffer.from(stringify(sortKeysRecursive(bill))));
        }

        console.info('============= START : Initialize Credential Ledger ===========');
        const credential_list = initCredential;
        for (let i = 0; i < credential_list.length; i++) {
            credential_list[i].docType = 'credential_list';
            await ctx.stub.putState(credential_list[i].emailId+credential_list[i].org, Buffer.from(JSON.stringify(credential_list[i])));
            console.info('Added <--> ', credential_list[i]);
        }
        console.info('============= END : Initialize Credential Ledger ===========');

    }

    // CreateAsset issues a new asset to the world state with given details.
    async UploadBill(ctx, ID, ProductId, Comments ,receipt) {
        const exists = await this.BillExists(ctx, ID);
        if (exists) {
            throw new Error(`The Bill ${ID} already exists`);
        }

        const bill = {
            ID: ID,
            ProductId: ProductId,
            Comments: Comments,
            billReceipt: receipt,
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(ID, Buffer.from(stringify(sortKeysRecursive(bill))));
        return JSON.stringify(bill);
    }

    async BillExists(ctx, ID) {
        const billJSON = await ctx.stub.getState(ID);
        return billJSON && billJSON.length > 0;
    }


    async readBill(ctx, ID) {
        const exists = await this.BillExists(ctx, ID);
        if (!exists) {
            // throw new Error(`The Bill ID :${ID} does not exist`);
            // let resu= [{Bill: `The Bill ID :${ID} does not exist`}]
            //return(JSON.parse(resu));
            return (`The Bill ID: ${ID} does not exist`);
        }
        const buffer = await ctx.stub.getState(ID);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }


    async AdminCredentialDetailsExists(ctx, adminId) {
        const buffer = await ctx.stub.getState(adminId);
        return (!!buffer && buffer.length > 0);
    }

    async readAdminCredentialDetails(ctx, adminId) {
        const exists = await this.AdminCredentialDetailsExists(ctx, adminId);
        if (!exists) {
            throw new Error(`The patient ${adminId} does not exist`);
        }
        const buffer = await ctx.stub.getState(adminId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }


}

module.exports = Supplychain_Contract;