const e = require("express");
const network = require("../Utils/network.js");
const { prettyJSONString } = require("../Utils/Utils.js");

//------------------------Admin Submit Transcations-----------------------
exports.uploadBill = async (req, res, org, AdminID) => {
  // Set up and connect to Fabric Gateway using the username in header
  const networkObj = await network.connectToNetwork(req, res, org, AdminID);

  const ID = req.body.ID;
  const ProductId = req.body.ProductId;
  const Comments = req.body.Comments;
  const billReceipt = req.body.billReceipt;

  // The request present in the body is converted into a single json string
  const uploadBillRes = await networkObj.contract.submitTransaction(
    "UploadBill",
    ID,
    ProductId,
    Comments,
    billReceipt
  );
  // Invoke the smart contract function
  if (uploadBillRes.error) {
    res.status(400).json(response.error);
  }
  console.log(
    `Bill is Uploaded by ${ID} the result is ${uploadBillRes.toString()}`
  );
  res.status(201).json(`${prettyJSONString(uploadBillRes)}`);
};

//------------------------Admin Query Transcations-----------------------

exports.AdminBill_query = async (req, res, org, AdminID) => {
  const { queryName, ID } = req.body;

  const networkObj = await network.connectToNetwork(req, res, org, AdminID);

  if (queryName == "BillExists" || queryName == "readBill") {
    try {
      const response = await networkObj.contract.evaluateTransaction(
        queryName,
        ID
      );
      await networkObj.gateway.disconnect();

      if (response.error) {
        res.status(400).json(response.error);
      }
      console.log(
        `Transaction has been evaluated, result is: ${response.toString()}`
      );

      if (response.toString() == `The Bill ID: ${ID} does not exist`) {
        res.status(201).json(response.toString());
      } else {
        res.status(201).json(`${prettyJSONString(response)}`);
      }

      return response;
    } catch {
      res.status(400).json("Error in query");
    }
  } else {
    // const response = await networkObj.contract.evaluateTransaction(queryName, args);
    //  const result_toString = response.toString()
    //  await networkObj.gateway.disconnect();
    res.status(300).json("Retry wrong transction Triggered!");
  }
};

exports.UserQuery = async (req, res, org, AdminID) => {
  const { queryName, ProductId } = req.body;
  const networkObj = await network.connectToNetwork(req, res, org, AdminID);

  if (queryName == "PID_readBill") {
    try {
      const response = await networkObj.contract.evaluateTransaction(
        queryName,
        ProductId
      );
      await networkObj.gateway.disconnect();

      if (response.error) {
        res.status(400).json(response.error);
      }
      console.log(
        `Transaction has been evaluated, result is: ${response.toString()}`
      );

      if (
        response.toString() == `The Product ID: ${ProductId} does not exist`
      ) {
        res.status(201).json(response.toString());
      } else {
        res.status(201).json(`${prettyJSONString(response)}`);
      }

      return response;
    } catch (e) {
      console.log(ProductId);
      res.status(400).json("Error in query");
      console.log(e);
    }
  } else {
    // const response = await networkObj.contract.evaluateTransaction(queryName, args);
    //  const result_toString = response.toString()
    //  await networkObj.gateway.disconnect();
    res.status(300).json("Retry wrong transction Triggered!");
  }
};

// emailId, name, orgName, ID, password, type

exports.registerUser = async (
  req,
  res,
  emailId,
  password,
  name,
  type,
  org,
  AdminID
) => {
  const networkObj = await network.connectToNetwork(req, res, org, AdminID);
  counter = 3;
  let userdetails = {
    emailId: emailId,
    name: name,
    orgName: org,
    id: counter,
    password: password,
    type: "org_admin",
  };

  try {
    // The request present in the body is converted into a single json string
    const uploadBillRes = await networkObj.contract.submitTransaction(
      "registerUser",
      userdetails.emailId,
      userdetails.name,
      userdetails.password,
      userdetails.type
    );
    // Invoke the smart contract function
    if (uploadBillRes) {
      console.log(
        `Register user details by ${
          uploadBillRes.ID
        } the result is ${uploadBillRes.toString()}`
      );
      counter = counter++;
      res.status(201).json(JSON.parse(uploadBillRes.toString()));
    } else {
      if (uploadBillRes.error) {
        res.status(400).json(response.error);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Error User already exists");
  }
};

exports.queryUser = async (req, res, org, AdminID, queryName) => {
  const networkObj = await network.connectToNetwork(req, res, org, AdminID);
  const { ID } = req.body;
  if (queryName == "queryUser") {
    queryfunction(req, res, ID, "queryUser", networkObj);
  } else if (queryName == "deleteUser") {
    queryfunction(req, res, ID, "deleteUser", networkObj);
  } else {
    // const response = await networkObj.contract.evaluateTransaction(queryName, args);
    //  const result_toString = response.toString()
    //  await networkObj.gateway.disconnect();
    res.status(300).json("Retry wrong transction Triggered!");
  }
};

queryfunction = async (req, res, ID, queryName, networkObj) => {
  try {
    const response = await networkObj.contract.evaluateTransaction(
      queryName,
      ID
    );
    await networkObj.gateway.disconnect();

    if (response.error) {
      res.status(400).json(response.error);
    }
    console.log(
      `Transaction has been evaluated, result is: ${response.toString()}`
    );

    if (response.toString() == `The User ID: ${ID} does not exist`) {
      res.status(201).json(response.toString());
    } else {
      res.status(201).json(JSON.parse(response.toString()));
    }
    return response;
  } catch {
    res.status(400).json("User does not exist");
  }
};

exports.updateUserDetails = async (req, res, org, AdminID) => {
  const networkObj = await network.connectToNetwork(req, res, org, AdminID);
  const { ID, emailId, name, password, type } = req.body;
  // The request present in the body is converted into a single json string
  const uploadBillRes = await networkObj.contract.submitTransaction(
    "updateUser",
    ID,
    emailId,
    name,
    password,
    type
  );
  // Invoke the smart contract function
  if (uploadBillRes.error) {
    res.status(400).json(response.error);
  }
  console.log(
    `Bill is Uploaded by ${ID} the result is ${uploadBillRes.toString()}`
  );
  res.status(201).json(JSON.parse(response.toString()));
};

exports.updateorgDetails = async (req, res, org, AdminID) => {
  const networkObj = await network.connectToNetwork(req, res, org, AdminID);
  const { ID, networkName, orgName } = req.body;
  // The request present in the body is converted into a single json string
  let key = networkName;
  let orgDetails = { [key]: orgName };
  //how to set key value dynamically

  try {
    const uploadBillRes = await networkObj.contract.submitTransaction(
      "updateorgDetails",
      ID,
      networkName,
      orgName
    );
    // Invoke the smart contract function
    if (uploadBillRes.error) {
      res.status(400).json(uploadBillRes.error);
    }
    console.log(
      `Bill is Uploaded by ${ID} the result is ${uploadBillRes.toString()}`
    );
    res.status(201).json(JSON.parse(uploadBillRes.toString()));
  } catch (error) {
    console.log(error);
  }
};

exports.updatechannelDetails = async (req, res, org, AdminID) => {
  const networkObj = await network.connectToNetwork(req, res, org, AdminID);
  const { ID, networkName, channelname, addExistingNetwork } = req.body;
  // The request present in the body is converted into a single json string
  try {
    const uploadBillRes = await networkObj.contract.submitTransaction(
      "updatechannelDetails",
      ID,
      networkName,
      channelname,
      addExistingNetwork
    );
    // Invoke the smart contract function
    if (uploadBillRes.error) {
      res.status(400).json(response.error);
    }
    console.log(
      `Bill is Uploaded by ${ID} the result is ${uploadBillRes.toString()}`
    );
    res.status(201).json(JSON.parse(uploadBillRes.toString()));
  } catch (error) {
    console.log(error);
  }
};

exports.updatesmartContracts = async (req, res, org, AdminID) => {
  const networkObj = await network.connectToNetwork(req, res, org, AdminID);
  try {
    const {
      ID,
      networkName,
      channelname,
      smartContractName,
      addExistingChannel,
    } = req.body;
    // The request present in the body is converted into a single json string
    const uploadBillRes = await networkObj.contract.submitTransaction(
      "updatesmartContracts",
      ID,
      networkName,
      channelname,
      smartContractName,
      addExistingChannel
    );
    // Invoke the smart contract function
    if (uploadBillRes.error) {
      res.status(400).json(uploadBillRes.error);
    }
    console.log(
      `Bill is Uploaded by ${ID} the result is ${uploadBillRes.toString()}`
    );
    res.status(201).json(JSON.parse(uploadBillRes.toString()));
  } catch (error) {
    console.log(error);
  }
};
