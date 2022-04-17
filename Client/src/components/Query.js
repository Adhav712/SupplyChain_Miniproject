import React from "react";
import "./Query.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Login from "./Login";

export default function Query() {
  
  let navigate = useNavigate();
  // const [Producer,setProducer] = Login();
  const [ID,setID] = useState("");
  const [result,setresult] = useState({
    Comments:"",
    ID:"",
    ProductId:"",
    billReceipt:"",

  });

  const onSubmitquery = async()=>{
   const fetchs = await fetch("http://localhost:3000/Producer/queries",{
      method: 'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        org : "Producer",
        AdminID: "Producer_Admin",
        queryName  : "readBill",
        ID : ID
      })
    })

    const data = await fetchs.json();
    setresult({
      ID: data.ID,
      Comments: data.Comments,
      ProductId: data.ProductId,
      billReceipt: data.billReceipt
    });
    console.log(data);
    console.log(result);
  }
  

  return(
      
      <div className="general">
        <div id="loginform">
          <div className="nav">
            <button class="button-62" onClick={()=>navigate('/')}>Log Out</button>
          </div>
            <h2 id="headerTitle">Query Bills</h2>
            <div className="divide">
                <div className="row">
                  <input 
                    type="text" 
                    placeholder="Enter ID" 
                    onChange={  e => 
                      setID(e.target.value)
                  }/> 
                </div>
                <div class="top"> 
                    <button class="submit" onClick={onSubmitquery}>Submit</button>
                </div>
                <div>
            </div>
            </div>
            <div className="Display_query_result">
              <p id="ID">ID: {result.ID}</p>
              <p id="ProductId">ProductId: {result.ProductId}</p>
              <p id="Comments">Comments: {result.Comments}</p>
              <p id="billReceipt">billReceipt: {result.billReceipt}</p>
            </div>
            <div className="display_billReceipt">
                  <p>Alternative text - include a link <a href= {result.billReceipt} target="_blank">to the PDF!</a></p>
            </div>

            
        </div>

      </div>
      )
  }
  
   










