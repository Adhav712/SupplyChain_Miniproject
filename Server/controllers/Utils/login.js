const network = require('./network.js');
const crypto = require('crypto');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



let caClient
let isLoggedIn;


function decrypt_token(data,key,iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const decripted = decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
  return decripted;
}


function generatejwttoken(res,req,emailId,org){
    let payload = {
        emailId: emailId,
        org: org
    }
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { algorithm : 'HS256'} );
    res.setHeader("set-cookie",[`JWT_TOKEN=${accessToken}; httponly; samesite=lax`]);
    console.log("\naccessToken",accessToken);
    return accessToken;
}


const logic = async (res,req,org,AdminID,emailId,password) => {
    const networkObj =  await network.connectToNetwork(req,res,org,AdminID);    

    const auth_check_res =  await network.invoke(networkObj,true,'authenticateUser',emailId);

    //const result =  auth_check_res.toString();
    try {
        const result =  JSON.parse(auth_check_res);
        
        const mailId = result.emailId;
        const encryptedData = result.password;
        const key = Buffer.from(result.key, 'hex');
        const iv = Buffer.from(result.iv, 'hex');

        console.log("encrypt",encryptedData);
        console.log("key",key);
        console.log("iv",iv);

        const respass = decrypt_token(encryptedData,key,iv);
        
        let i=0;
        let resmailid = "";
        for(i=0;i<mailId.length;i++){
            if(mailId[i] == '@'){
            resmailid = mailId.slice(0,i+15);
            break;
       }
    }

    console.log("resmailid",resmailid);
    console.log("respass",respass);
    const isLoggedIn = false;
    if(password == respass && mailId == resmailid){
        console.log("Authenticated");
        const accesstoken = generatejwttoken(req,res,emailId,org)
        res.status(201).json({
            authenticated : "true",
            AccessToken : accesstoken  
        });
        return true;
        
    }else{
        console.log("Declined");
        await res.status(500).json("Check your credentials or Internal server error");
        return (isLoggedIn == false);
    }


    } catch (error) {
        console.log("error",error);
        console.log("Identities not found");
        res.status(500).json("Check your credentials or Internal server error");
        console.log("--------------------------------------------------------------------------------");
    }
}

exports.OwnerLogin = async (res,req,org,AdminID,emailId,password) => {
    logic(res,req,org,AdminID,emailId,password);
}

exports.ProducerLogin = async (res,req,org,AdminID,emailId,password) => {
    logic(res,req,org,AdminID,emailId,password);
    
}

exports.ManufacturerLogin = async (res,req,org,AdminID,emailId,password) => {
    logic(res,req,org,AdminID,emailId,password);
}

exports.DistributorLogin = async (res,req,org,AdminID,emailId,password) => {
    logic(res,req,org,AdminID,emailId,password);
}

exports.RetailerLogin = async (res,req,org,AdminID,emailId,password) => {
    logic(res,req,org,AdminID,emailId,password);
}
