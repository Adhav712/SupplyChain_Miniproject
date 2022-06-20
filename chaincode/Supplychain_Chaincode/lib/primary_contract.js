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
                billReceipt: 'https://cdn.corporatefinanceinstitute.com/assets/invoice-template-word1.png',
            },
            {
                ID: "Producer_Sony_Bill1",
                ProductId:"Sony_Xperia_XZ2",  
                Comments : "Camera_Module",
                billReceipt: 'https://www.zoho.com/invoice/images/invoice-templates/excel-invoice-template/excel-ss.png',
            },
            {
                ID: "Producer_Sony_Bill2",
                ProductId:"Sony_Xperia_XZ2",  
                Comments : "battery_Module",
                billReceipt: 'https://i.pinimg.com/originals/12/a7/e9/12a7e946c0514511afca491f7c56a86a.png',
            },
            {
                ID: "Producer_Qualcomn_Bill1",
                ProductId:"Sony_Xperia_XZ2",  
                Comments : "Soc",
                billReceipt: 'https://i1.wp.com/eforms.com/images/2016/10/invoice-template-pdf-1.png?fit=2550%2C3301&ssl=1',
            },
            {
                ID: "Manufacturer_Foxcom_Bill1",
                ProductId:"Sony_Xperia_XZ2",  
                Comments : "Total Cost of manufacturing",
                billReceipt: 'https://www.invoicesimple.com/wp-content/uploads/2018/06/Invoice-Template-top.png',
            },
            {
                ID: "Distributor_Amazon_Bill1",
                ProductId:"Sony_Xperia_XZ2",  
                Comments : "Whole Sale Price",
                billReceipt: 'https://images.ctfassets.net/7rifqg28wcbd/4IjVHnLpCT5YVfQfCTdeAW/7327997d78eadeddf9c4df3cc70ffe31/Sample_Invoice_Template_by_PayPal.jpg',
            },
            {
                ID: "Retailor_Poorvika_Bill1",
                ProductId:"Sony_Xperia_XZ2",  
                Comments : "Retail Price",
                billReceipt: 'hhttps://invoicetemplates.com/wp-content/uploads/Hospital-Bill-Invoice-Template.png',
            }          
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
            return JSON.parse(`The Bill ID: ${ID} does not exist`);
        }
        const buffer = await ctx.stub.getState(ID);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async PID_BillExists(ctx, ProductId) {
        const billJSON = await ctx.stub.getState(ProductId[0]);
        return billJSON && billJSON.length > 0;
    }

    async PID_readBill(ctx, ProductId) {
        const exists = await this.PID_BillExists(ctx, ProductId);
        if (!exists) {
            // throw new Error(`The Bill ID :${ID} does not exist`);
            // let resu= [{Bill: `The Bill ID :${ID} does not exist`}]
            //return(JSON.parse(resu));
            return JSON.parse(`The Bill ID: ${ProductId} does not exist`);
        }
        const buffer = await ctx.stub.getState(ProductId);
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
            throw new Error(`The credential ${adminId} does not exist`);
            //return (`The credential ${adminId} does not exist`);
        }
        const buffer = await ctx.stub.getState(adminId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }


}

module.exports = Supplychain_Contract;