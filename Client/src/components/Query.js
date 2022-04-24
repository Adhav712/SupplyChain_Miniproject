import React from "react";
import "./Query.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import {OrgContext} from "./Login";
import useStore from "./store";


export default function Query() {

  let navigate = useNavigate();
  const Organization = useStore(state => state.org);

  const [ID,setID] = useState("");
  const [result,setresult] = useState({
    Comments:"",
    ID:"",
    ProductId:"",
    billReceipt:"",

  });

  const onSubmitquery = async()=>{
    // console.log("result",Organization);
   const fetchs = await fetch(`https://3000-adhav712-supplychainmin-auk2ectrrub.ws-us41.gitpod.io/${Organization}/queries`,{
   // const fetchs = await fetch(`http://localhost:3000/${Organization}/queries`,{
      method: 'post',
      headers:{'Content-Type':'application/json'},
      //headers:{'Content-Type':'text/html'},
      body: JSON.stringify({
        org : Organization,
        AdminID: `${Organization}_Admin`,
        queryName  : "readBill",
        ID : ID
      })
    })
    console.log(fetchs);
    //const data = await fetchs.toString();
    const data = await fetchs.json();
    console.log(data);
    if(data == `The Bill ID: ${ID} does not exist`){
      alert("No such bill exists");
      console.log("Working");
    } else {
      setresult({
        ID: data.ID,
        Comments: data.Comments,
        ProductId: data.ProductId,
        billReceipt: data.billReceipt
      });
      console.log(data);
      console.log(result);
    }
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
  
   










