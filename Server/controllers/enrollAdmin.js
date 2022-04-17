/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const {buildCAClient, enrollAdmin} = require('./Utils/CaUtils.js');
const {buildCCPOrg1, buildCCPOrg2, buildWallet, buildCCPOrg3, buildCCPOrg4, buildCCPOrg5} = require('./Utils/Utils.js');
const walletPath = path.join(__dirname, 'wallet');

const Owner= 'Owner_Admin';
const OwnerPasswd = 'Owner_Adminpw';
const OwnerMSP = 'Org1MSP';

const Producer= 'Producer_Admin';
const ProducerPasswd = 'Producer_Adminpw';
const ProducerMSP = 'Org2MSP';

const Manufacturer = 'Manufacturer_Admin';
const ManufacturerPasswd = 'Manufacturer_Adminpw';
const ManufacturerMSP = 'Org3MSP';

const Distributor = 'Distributor_Admin';
const DistributorPasswd = 'Distributor_Adminpw';
const DistributorMSP = 'Org4MSP';

const Retailor = 'Retailor_Admin';
const RetailorPasswd = 'Retailor_Adminpw';
const RetailorMSP = 'Org5MSP';

exports.enrollAdminOrg1 = async function() {
  try {
    // build an in memory object with the network configuration (also known as a connection profile)
    const ccp = buildCCPOrg1();

    // build an instance of the fabric ca services client based on
    // the information in the network configuration
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

    // setup the wallet to hold the credentials of the application user
    const wallet = await buildWallet(Wallets, walletPath);

    // to be executed and only once per hospital. Which enrolls admin and creates admin in the wallet
    await enrollAdmin(caClient, wallet, OwnerMSP, Owner, OwnerPasswd);

    console.log('msg: Successfully enrolled admin user ' + Owner + ' and imported it into the wallet');
  } catch (error) {
    console.error(`Failed to enroll admin user ' + ${Owner} + : ${error}`);
    process.exit(1);
  }
};


exports.enrollAdminOrg2 = async function() {
    try {
      // build an in memory object with the network configuration (also known as a connection profile)
      const ccp = buildCCPOrg2();
  
      // build an instance of the fabric ca services client based on
      // the information in the network configuration
      const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org2.example.com');
  
      // setup the wallet to hold the credentials of the application user
      const wallet = await buildWallet(Wallets, walletPath);
  
      // to be executed and only once per hospital. Which enrolls admin and creates admin in the wallet
      await enrollAdmin(caClient, wallet, ProducerMSP, Producer, ProducerPasswd);
  
      console.log('msg: Successfully enrolled admin user ' + Producer + ' and imported it into the wallet');
    } catch (error) {
      console.error(`Failed to enroll admin user ' + ${Producer} + : ${error}`);
      process.exit(1);
    }
  };

  exports.enrollAdminOrg3 = async function() {
    try {
      // build an in memory object with the network configuration (also known as a connection profile)
      const ccp = buildCCPOrg3();
  
      // build an instance of the fabric ca services client based on
      // the information in the network configuration
      const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org3.example.com');
  
      // setup the wallet to hold the credentials of the application user
      const wallet = await buildWallet(Wallets, walletPath);
  
      // to be executed and only once per hospital. Which enrolls admin and creates admin in the wallet
      await enrollAdmin(caClient, wallet, ManufacturerMSP, Manufacturer, ManufacturerPasswd);
  
      console.log('msg: Successfully enrolled admin user ' + Manufacturer + ' and imported it into the wallet');
    } catch (error) {
      console.error(`Failed to enroll admin user ' + ${Manufacturer} + : ${error}`);
      process.exit(1);
    }
  }; 

  exports.enrollAdminOrg4 = async function() {
    try {
      // build an in memory object with the network configuration (also known as a connection profile)
      const ccp = buildCCPOrg4();
  
      // build an instance of the fabric ca services client based on
      // the information in the network configuration
      const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org4.example.com');
  
      // setup the wallet to hold the credentials of the application user
      const wallet = await buildWallet(Wallets, walletPath);
  
      // to be executed and only once per hospital. Which enrolls admin and creates admin in the wallet
      await enrollAdmin(caClient, wallet, DistributorMSP, Distributor, DistributorPasswd);
  
      console.log('msg: Successfully enrolled admin user ' + Distributor + ' and imported it into the wallet');
    } catch (error) {
      console.error(`Failed to enroll admin user ' + ${Distributor} + : ${error}`);
      process.exit(1);
    }
  };

  exports.enrollAdminOrg5 = async function() {
    try {
      // build an in memory object with the network configuration (also known as a connection profile)
      const ccp = buildCCPOrg5();
  
      // build an instance of the fabric ca services client based on
      // the information in the network configuration
      const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org5.example.com');
  
      // setup the wallet to hold the credentials of the application user
      const wallet = await buildWallet(Wallets, walletPath);
  
      // to be executed and only once per hospital. Which enrolls admin and creates admin in the wallet
      await enrollAdmin(caClient, wallet, RetailorMSP, Retailor, RetailorPasswd);
  
      console.log('msg: Successfully enrolled admin user ' + Retailor + ' and imported it into the wallet');
    } catch (error) {
      console.error(`Failed to enroll admin user ' + ${Retailor} + : ${error}`);
      process.exit(1);
    }
  };
