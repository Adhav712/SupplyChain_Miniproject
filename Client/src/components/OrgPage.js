import React, { useState,useEffect } from "react";
import "./OrgPage.css";
import { useNavigate } from 'react-router-dom';
import useStore from "./store";

export default function OrgPage() {
  let navigate = useNavigate();
    
  const Organization = useStore(state => state.org);

  

  const [ID,setID] = useState("");
  const [result,setresult] = useState([]);

  
  const onSubmit = async()=>{
    // console.log("result",Organization);
    const fetchs = await fetch(`https://3000-adhav712-supplychainmin-auk2ectrrub.ws-us41.gitpod.io//${Organization}/queries`,{
    //const fetchs = await fetch(`http://localhost:3000/${Organization}/queries`,{
      method: 'post',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        org : Organization,
        AdminID: `${Organization}_Admin`,
        queryName  : "readBill",
        ID : `${Organization}_Sony_Bill1`
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
    
  };
  
  const queryRecentTransactions = async()=>{
      for(let i=1;i<3;i++){
        const fetchs = await fetch(`https://3000-adhav712-supplychainmin-auk2ectrrub.ws-us41.gitpod.io/${Organization}/queries`,{
        //const fetchs = await fetch(`http://localhost:3000/${Organization}/queries`,{
          method: 'post',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            org : Organization,
            AdminID: `${Organization}_Admin`,
            queryName  : "readBill",
            ID : `${Organization}_Sony_Bill${i}`
          })
        })
       
          const data = await fetchs.json();
          console.log(data);
          setresult((data));

        //Addded a extra state because when we got json error because of string type we are sending
        //so if we get error we simply print Id bill don't exists

        //  setresult((JSON.parse(data)));
      //  if(data == `The Bill ID: ${ID} does not exist`){
      //     console.log("No more bill exists");
      //   }else{          
      //   console.log(data);
      //   setresult((data));
      //  }
      }
  }

  useEffect(()=>{
    //onSubmit();
    queryRecentTransactions();
  },[]);
  
  
  return(
      
      <div className="general">
      <div id="loginform">
        <div className="nav">
            <button class="button-62" onClick={()=>navigate('/')}>Log Out</button>
        </div>
        <h2 id="headerTitle">Organization Page</h2>
        <div class="nav1">
            <div className="nav">
                <button class="button-62" onClick={()=>navigate('Query')}>Query Bill</button>
            </div>
            <div className="nav">
                <button class="button-62" ><a href= {`https://8080-adhav712-supplychainmin-auk2ectrrub.ws-us41.gitpod.io/#/`} target="_blank" id="button-62-link">View History</a></button>
                {/* <button class="button-62" ><a href= {`http://localhost:8080/#/`} target="_blank" id="button-62-link">View History</a></button> */}
            </div>
        </div>
        <div id="loginformOrg">
            <h3>Recent Transcations</h3>
            <p className="Details">{result.ID}</p>
            <p className="Details">{result.ProductId}</p>
            <p className="Details">{result.Comments}</p>
            <p className="Details">{result.billReceipt}</p>
        </div>
        <div className="nav2">
                <button class="button-6" onClick={()=>navigate('UploadBill')}>Upload Bill</button>
        </div>
        
      </div>

      </div>
      )
  }
  
   




  





