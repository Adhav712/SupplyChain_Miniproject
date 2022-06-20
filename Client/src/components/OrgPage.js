import React, { useState,useEffect } from "react";
import "./OrgPage.css";
import { useNavigate } from 'react-router-dom';
import useStore from "./store";

export default function OrgPage() {
  let navigate = useNavigate();
    
  const Organization = useStore(state => state.org);
  const auth = useStore(state => state.isLoggedIn);

  

  const [ID,setID] = useState("");
  const [result,setresult] = useState([]);

  
  // const onSubmit = async()=>{
  //   // console.log("result",Organization);
  //   //const fetchs = await fetch(`https://3000-adhav712-supplychainmin-auk2ectrrub.ws-us41.gitpod.io//${Organization}/queries`,{
  //   const fetchs = await fetch(`http://localhost:3000/${Organization}/queries`,{
  //     method: 'post',
  //     headers:{'Content-Type':'application/json'},
  //     body: JSON.stringify({
  //       org : Organization,
  //       AdminID: `${Organization}_Admin`,
  //       queryName  : "readBill",
  //       ID : `${Organization}_Sony_Bill1`
  //     })
  //   })

  //   const data = await fetchs.json();
  //   setresult({
  //       ID: data.ID,
  //       Comments: data.Comments,
  //       ProductId: data.ProductId,
  //       billReceipt: data.billReceipt
  //     });
  //     console.log(data);
  //     console.log(result);
    
  // };
  
  const queryRecentTransactions = async()=>{
    try{
      for(let i=1;i<=3;i++){
        //const fetchs = await fetch(`https://3000-adhav712-supplychainmin-auk2ectrrub.ws-us41.gitpod.io/${Organization}/queries`,{
        const fetchs = await fetch(`http://localhost:3000/${Organization}/queries`,{
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
          const datas = JSON.parse(data);
          console.log(datas);
          setresult(({
            ID: datas.ID,
            Comments: datas.Comments,
            ProductId: datas.ProductId,
            billReceipt: datas.billReceipt
          }));

        //Addded a extra state because when we got json error because of string type we are sending
        //so if we get error we simply print Id bill don't exists
       if(data == `The Bill ID: ${ID} does not exist`){
          console.log("No more bill exists");
        }else{          
        console.log(datas);
       }
       console.log("Ended for loop",i);
      }
    }catch(e){
      console.log("Error in queryRecentTransactions",e);
    }  
    
  }

  useEffect(()=>{
    //onSubmit();
    queryRecentTransactions();
  },[]);
  
  
  return(
      
      <div className="general">
      <div id="loginform_orgFull">
        <div className="nav">
            
            <button className="button-62" onClick={()=>navigate('Query')}>Query Bill</button>
            <button className="button-62" ><a href= {`http://localhost:8080/#/`} target="_blank" id="button-62-link">View History</a></button>
            <button className="button-62" onClick={()=>navigate('/')}>Log Out</button>
        </div>
        <h2 id="headerTitle" >Organization Page</h2>
        <p style={{display:"flex" , justifyContent:"center"}}>isLoggedIn : {auth}</p>
        <p style={{display:"flex" , justifyContent:"center"}}>Organization : {Organization}</p>
        
        <div id="loginform_Org">
            <h3>Recent Transcations</h3>
            <p className="Details">ID: {result.ID}</p>
            <p className="Details">ProductId: {result.ProductId}</p>
            <p className="Details">Comments: {result.Comments}</p>
            <div style={{display:"flex" ,justifyContent:"flex-start"}}>
                <span>billReceipt: </span><a href={result.billReceipt} target="_blank" className="Details">{result.billReceipt}</a>
            </div>
              
        </div>
        <div className="nav2">
                <button className="button-6" onClick={()=>navigate('UploadBill')}>Upload Bill</button>
        </div>
        
      </div>

      </div>
      )
  }
  
   




  





