import React from "react";
import "./UploadBill.css";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function Login() {
  let navigate = useNavigate();
  // const [result,setresult] = useState({
  //   Comments:"",
  //   ID:"",
  //   ProductId:"",
  //   billReceipt:"",
  // });  
  const [Comments,setComments] = useState("");
  const [ID,setID] = useState("");
  const [ProductId,setProductId] = useState("");
  const [billReceipt,setbillReceipt] = useState("");

  const onSubmitBill = async()=>{
    console.log("result",ID);
    console.log("result",Comments);
    console.log("result",ProductId);
    console.log("result",billReceipt);

    const fetchs = await fetch("http://localhost:3000/Producer",{
       method: 'post',
       headers:{'Content-Type':'application/json'},
       body: JSON.stringify({
         org : "Producer",
         AdminID: "Producer_Admin",
         func: "uploadBill",
         ID : ID,
         ProductId: ProductId,
         Comments: Comments,
         billReceipt: billReceipt
       })
     })
 
     const data = await fetchs.json();
     console.log(data);
   }

  return(
  
      <div className="general">
      <div id="loginform">
        <div className="nav">
            <button class="button-62" onClick={()=>navigate('/')}>Log Out</button>
        </div>
        <h2 id="headerTitle">Upload Bill</h2>
        <div className="row"><input 
              type="text" 
              placeholder="Enter ID" 
              onChange = {(event)=> setID(event.target.value)} 
              /> 
        </div>
        <div className="row"><input type="text" placeholder="Enter Product ID" 
              onChange = {(event)=> setProductId(event.target.value)}/> </div>
        <div className="row"><input type="text" placeholder="Comments" 
              onChange = {(event)=> setComments(event.target.value)}/> </div>
        <div className="row"><input type="text" placeholder="Bill Receipt" 
              onChange = {(event)=> setbillReceipt(event.target.value)}/> </div>
          <div id="button" class="row"> 
            <button onClick={onSubmitBill}>Upload</button>
          </div>
        
      </div>

      </div>
      )
  }
  
   










