const network = require("../Utils/network.js");
const { prettyJSONString } = require("../Utils/Utils.js");

//------------------------Admin Submit Transcations-----------------------
exports.uploadBill = async (req, res, org, AdminID) => {

        // Set up and connect to Fabric Gateway using the username in header
        const networkObj = await network.connectToNetwork(req,res,org,AdminID);

        const ID  = req.body.ID;
        const ProductId = req.body.ProductId;
        const Comments = req.body.Comments;
        const billReceipt = req.body.billReceipt;
        
        // The request present in the body is converted into a single json string
        const uploadBillRes = await networkObj.contract.submitTransaction('UploadBill', ID, ProductId, Comments, billReceipt);
        // Invoke the smart contract function
        if (uploadBillRes.error) {
            res.status(400).send(response.error);
          }
  console.log(`Bill is Uploaded by ${ID} the result is ${uploadBillRes.toString()}`);          
  res.status(201).send(`${prettyJSONString(uploadBillRes)}`);
};

//------------------------Admin Query Transcations-----------------------

exports.AdminBill_query = async(req,res,org,AdminID) => {
    const {queryName,ID} = req.body;
    
    const networkObj = await network.connectToNetwork(req,res,org,AdminID);

    if(queryName == "BillExists" || queryName == "readBill"){
      const response = await networkObj.contract.evaluateTransaction(queryName, ID);
      await networkObj.gateway.disconnect();
  
      if (response.error) {
        res.status(400).send(response.error);
      }
      console.log(`Transaction has been evaluated, result is: ${response.toString()}`);
      
      if(response.toString() == `The Bill ID: ${ID} does not exist`){
        res.status(400).send(`The Bill ID: ${ID} does not exist`);
      }else{
        res.status(201).send(`${prettyJSONString(response)}`);
      }
      
      
      return response

    }else{
        // const response = await networkObj.contract.evaluateTransaction(queryName, args);
        //  const result_toString = response.toString()
        //  await networkObj.gateway.disconnect();
         res.status(300).send("Retry wrong transction Triggered!");
    }
    

}
