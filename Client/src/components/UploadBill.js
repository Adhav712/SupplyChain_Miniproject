import React from "react";
import "./UploadBill.css";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  let navigate = useNavigate();
    return(
      
      <div className="general">
      <div id="loginform">
        <div className="nav">
            <button class="button-62" onClick={()=>navigate('/')}>Log Out</button>
        </div>
        <h2 id="headerTitle">Upload Bill</h2>
        <div className="row"><input type="text" placeholder="Enter ID" /> </div>
        <div className="row"><input type="text" placeholder="Enter Product ID"/> </div>
        <div className="row"><input type="text" placeholder="Comments"/> </div>
        <div className="row"><input type="text" placeholder="Bill Receipt"/> </div>
          <div id="button" class="row"> 
            <button>Upload</button>
          </div>
        
      </div>

      </div>
      )
  }
  
   










