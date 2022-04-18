const express = require("express");
const app = express();
const port = "3000";
const cors = require('cors');

const adminRoutes = require('./controllers/src/routes.js');


const auth = require('./controllers/Utils/login.js');


async function main() {

    app.use(cors())
    app.use(express.json())
    app.options('*', cors());  
    app.use(express.urlencoded ({
    extended: false
    }));

    app.post('/login',async (req,res) => {

        const{login_role,choose_org,hospid,AdminID,Insurance_adminid,PID,DocID,adminid,emailId,password} = req.body
        let isLoggedIn=false;
        if(choose_org === 'hospital')
            switch (login_role){
                case 'admin':
                    const authentication_admin = auth.adminLogin(res,res,choose_org,hospid,AdminID,adminid,emailId,password);
                    isLoggedIn = authentication_admin;
            
                    break;
                case 'doctor':
                    const authentication_doctor = auth.doctorLogin(res,res,choose_org,hospid,AdminID,DocID,emailId,password);
                    (isLoggedIn = authentication_doctor);
                    break;   
                case 'patient':
                    const authentication_patient = auth.patientLogin(res,res,choose_org,hospid,AdminID,PID,emailId,password);
                    isLoggedIn = authentication_patient;
                    break
        }else{
            //Insurance login
            const authentication_Insurance_admin = auth.InsuranceAdminLogin(req,res,choose_org,adminid,Insurance_adminid,emailId,password);
            isLoggedIn = authentication_Insurance_admin;
        }
        
        return isLoggedIn;
    })

    uploadBill = async (req, res, org, AdminID,func) => {
        if(func == "uploadBill"){
            adminRoutes.uploadBill(req,res,org,AdminID);
        }else{
            res.status(300).send("Wrong input");
        }
    }
    //-------------------Producer Routes Starts---------------------
    
    app.post('/Owner',(req,res) =>{
        const func = req.body.func;
        const org = req.body.org;
        const AdminID = req.body.AdminID;
        uploadBill(req,res,org,AdminID,func);
    })

    app.post('/Producer',(req,res) =>{
        const func = req.body.func;
        const org = req.body.org;
        const AdminID = req.body.AdminID;
        uploadBill(req,res,org,AdminID,func);
    })

    app.post('/Manufacturer',(req,res) =>{
        const func = req.body.func;
        const org = req.body.org;
        const AdminID = req.body.AdminID;
        uploadBill(req,res,org,AdminID,func);
    })

    app.post('/Distributor',(req,res) =>{
        const func = req.body.func;
        const org = req.body.org;
        const AdminID = req.body.AdminID;
        uploadBill(req,res,org,AdminID,func);
    })

    app.post('/Retailor',(req,res) =>{
        const func = req.body.func;
        const org = req.body.org;   
        const AdminID = req.body.AdminID;
        uploadBill(req,res,org,AdminID,func);
    })


    app.post('/Owner/queries', (req,res) => {
        const org = req.body.org;
        const AdminID = req.body.AdminID;

        const result = adminRoutes.AdminBill_query(req,res,org,AdminID)
        console.log("Queried result:",result);
    })

    app.post('/Producer/queries', (req,res) => {
        const org = req.body.org;
        const AdminID = req.body.AdminID;

        const result = adminRoutes.AdminBill_query(req,res,org,AdminID)
        console.log("Queried result:",result);
    })

    app.post('/Manufacturer/queries', (req,res) => {
        const org = req.body.org;
        const AdminID = req.body.AdminID;

        const result = adminRoutes.AdminBill_query(req,res,org,AdminID)
        console.log("Queried result:",result);
    })

    app.post('/Distributor/queries', (req,res) => {
        const org = req.body.org;
        const AdminID = req.body.AdminID;

        const result = adminRoutes.AdminBill_query(req,res,org,AdminID)
        console.log("Queried result:",result);
    })

    app.post('/Retailor/queries', (req,res) => {
        const org = req.body.org;
        const AdminID = req.body.AdminID;

        const result = adminRoutes.AdminBill_query(req,res,org,AdminID)
        console.log("Queried result:",result);
    })

    //-------------------Producer Routes Ends---------------------


    app.listen(port, () => {
        console.log("Server is listening")
    })
}


main();
