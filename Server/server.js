const express = require("express");
const app = express();
const port = "3000";
const cors = require("cors");

const adminRoutes = require("./controllers/src/routes.js");

const auth = require("./controllers/Utils/login.js");

async function main() {
  app.use(cors());
  app.use(express.json());
  app.options("*", cors());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  // app.post('/login',async (req,res) => {

  //     const{choose_org,AdminID,emailId,password} = req.body
  //     let isLoggedIn=false;
  //         switch (choose_org){
  //             case 'Producer':
  //                 const authentication_Producer = auth.ProducerLogin(res,res,choose_org,AdminID,emailId,password);
  //                 isLoggedIn = authentication_Producer;
  //                 break;
  //             case 'Manufacutrer':
  //                 const authentication_Manufacutrer = auth.ManufacturerLogin(res,res,choose_org,AdminID,emailId,password);
  //                 isLoggedIn = authentication_Manufacutrer;
  //                 break;
  //             case 'Distributor':
  //                 const authentication_Distributor = auth.DistributorLogin(res,res,choose_org,AdminID,emailId,password);
  //                 isLoggedIn = authentication_Distributor;
  //                 break
  //             case 'Owner':
  //                 const authentication_Owner = auth.OwnerLogin(res,res,choose_org,AdminID,emailId,password);
  //                 isLoggedIn = authentication_Owner;
  //                 break
  //             case 'Retailer':
  //                 const authentication_Retailer = auth.RetailerLogin(res,res,choose_org,AdminID,emailId,password);
  //                 isLoggedIn = authentication_Retailer;
  //                 break
  //             default:
  //                 res.status(300).send("Wrong credential");
  // }})

  app.post("/login", async (req, res) => {
    const { ID, password } = req.body;
    let isLoggedIn = false;
    const authentication_Owner = auth.OwnerLogin(
      req,
      res,
      "Owner",
      "Owner_Admin",
      ID,
      password
    );
    if (authentication_Owner) {
      isLoggedIn = authentication_Owner;
    } else {
      res.status(300).send("Wrong credential");
    }
  });

  // uploadBill = async (req, res, org, AdminID,func) => {
  //    try{
  //     if(func == "uploadBill"){
  //         adminRoutes.uploadBill(req,res,org,AdminID);
  //     }else{
  //         res.status(300).send("Wrong input");
  //     }
  //    }catch{
  //           res.status(300).send("Wrong input");
  //    }

  // }

  app.post("/registerUser", async (req, res) => {
    const { emailId, name, password, type } = req.body;
    const result = await adminRoutes.registerUser(
      req,
      res,
      emailId,
      password,
      name,
      type,
      "Owner",
      "Owner_Admin"
    );
    console.log("Result:", result);
  });

  app.post("/queryUser", async (req, res) => {
    const result = await adminRoutes.queryUser(
      req,
      res,
      "Owner",
      "Owner_Admin",
      "queryUser"
    );
    console.log("Result:", result);
  });

  app.post("/deleteUser", async (req, res) => {
    const result = await adminRoutes.queryUser(
      req,
      res,
      "Owner",
      "Owner_Admin",
      "queryUser"
    );
    console.log("Result:", result);
  });

  app.post("/updateUserDetails", async (req, res) => {
    const { ID, emailId, name, password, type } = req.body;
    const result = await adminRoutes.updateUserDetails(
      req,
      res,
      "Owner",
      "Owner_Admin",
      ID,
      emailId,
      name,
      password,
      type
    );
    console.log("Result:", result);
  });

  app.post("/updateorgDetails", async (req, res) => {
    const result = await adminRoutes.updateorgDetails(
      req,
      res,
      "Owner",
      "Owner_Admin"
    );
    console.log("Result:", result);
  });

  app.post("/updatechannelDetails", async (req, res) => {
    const result = await adminRoutes.updatechannelDetails(
      req,
      res,
      "Owner",
      "Owner_Admin"
    );
    console.log("Result:", result);
  });

  app.post("/updatesmartContracts", async (req, res) => {
    const result = await adminRoutes.updatesmartContracts(
      req,
      res,
      "Owner",
      "Owner_Admin"
    );
    console.log("Result:", result);
  });

  //-------------------Producer Routes Starts---------------------
  app.post("/Owner", (req, res) => {
    const func = req.body.func;
    const org = req.body.org;
    const AdminID = req.body.AdminID;
    uploadBill(req, res, org, AdminID, func);
  });

  app.post("/Producer", (req, res) => {
    const func = req.body.func;
    const org = req.body.org;
    const AdminID = req.body.AdminID;
    uploadBill(req, res, org, AdminID, func);
  });

  app.post("/Manufacturer", (req, res) => {
    const func = req.body.func;
    const org = req.body.org;
    const AdminID = req.body.AdminID;
    uploadBill(req, res, org, AdminID, func);
  });

  app.post("/Distributor", (req, res) => {
    const func = req.body.func;
    const org = req.body.org;
    const AdminID = req.body.AdminID;
    uploadBill(req, res, org, AdminID, func);
  });

  app.post("/Retailer", (req, res) => {
    const func = req.body.func;
    const org = req.body.org;
    const AdminID = req.body.AdminID;
    uploadBill(req, res, org, AdminID, func);
  });

  app.post("/Owner/queries", (req, res) => {
    const org = req.body.org;
    const AdminID = req.body.AdminID;

    const result = adminRoutes.AdminBill_query(req, res, org, AdminID);
    console.log("Queried result:", result);
  });

  app.post("/Producer/queries", (req, res) => {
    const org = req.body.org;
    const AdminID = req.body.AdminID;

    const result = adminRoutes.AdminBill_query(req, res, org, AdminID);
    console.log("Queried result:", result);
  });

  app.post("/Manufacturer/queries", (req, res) => {
    const org = req.body.org;
    const AdminID = req.body.AdminID;

    const result = adminRoutes.AdminBill_query(req, res, org, AdminID);
    console.log("Queried result:", result);
  });

  app.post("/Distributor/queries", (req, res) => {
    const org = req.body.org;
    const AdminID = req.body.AdminID;

    const result = adminRoutes.AdminBill_query(req, res, org, AdminID);
    console.log("Queried result:", result);
  });

  app.post("/Retailor/queries", (req, res) => {
    const org = req.body.org;
    const AdminID = req.body.AdminID;

    const result = adminRoutes.AdminBill_query(req, res, org, AdminID);
    console.log("Queried result:", result);
  });

  app.post("/UserQuery", (req, res) => {
    const org = req.body.org;
    const AdminID = req.body.AdminID;

    const result = adminRoutes.UserQuery(req, res, org, AdminID);
    console.log("Queried result:", result);
  });

  //-------------------Producer Routes Ends---------------------

  app.listen(port, () => {
    console.log("Server is listening");
  });
}

main();
