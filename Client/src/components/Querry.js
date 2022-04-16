import React from "react";
import "./Querry.css";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  
  let navigate = useNavigate();
    return(
      
      <div className="general">
        <div id="loginform">
          <div className="nav">
            <button class="button-62" onClick={()=>navigate('/')}>Log Out</button>
          </div>
            <h2 id="headerTitle">Querry Bills</h2>
            <div className="divide">
                <div className="row"><input type="text" placeholder="Enter ID" /> </div>
                <div class="top"> 
                    <button class="submit">Submit</button>
                </div>
                <div>
            </div>

            </div>
            
        </div>

      </div>
      )
  }
  
   










