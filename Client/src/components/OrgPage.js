import React from "react";
import "./OrgPage.css";
import { useNavigate } from 'react-router-dom';

export default function OrgPage() {
  let navigate = useNavigate();
    return(
      
      <div className="general">
      <div id="loginform">
        <div className="nav">
            <button class="button-62" onClick={()=>navigate('/')}>Log Out</button>
        </div>
        <h2 id="headerTitle">Organisation Page</h2>
        <div class="nav1">
            <div className="nav">
                <button class="button-62" onClick={()=>navigate('Query')}>Query Bill</button>
            </div>
            <div className="nav">
                <button class="button-62" onClick={()=>navigate('')}>View History</button>
            </div>
        </div>
        <div id="loginformOrg">
            <h6>Fill the history details</h6>
        </div>
        <div className="nav2">
                <button class="button-62" onClick={()=>navigate('UploadBill')}>Upload Bill</button>
        </div>
        
      </div>

      </div>
      )
  }
  
   










