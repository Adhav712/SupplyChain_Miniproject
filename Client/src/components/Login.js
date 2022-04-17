import React from "react";
import "./Login.css";
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Query from "./Query";

export default function Login() {
  let navigate = useNavigate();
  
  const [org,setorg] = useState("");
  let data;
  
  return(
      
      <div className="general">
      <div id="loginform1">
        <h2 id="headerTitle">Login</h2>
        <div id="drop" class="rows">
          <select onChange={(event) => data = (event.target.value)} >
            <option value="Owner">Owner</option>
            <option value="Producer">Producer</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Distributor">Distributor</option>
            <option value="Retailer">Retailer</option>
          </select>
        </div>
        <div className="row"><input type="email" placeholder="Enter your email" /> </div>
        <div className="row"><input type="password" placeholder="Enter your password"/> </div>
          <div  id="button" class="row"> 
            <button 
            onClick={() => {
              setorg(data)
              console.log("data",data)
              console.log("org",org)
              navigate('OrgPage')
            }}
              
            
            // onClick={()=>navigate('OrgPage')}
            >Login</button>
          </div>
        
      </div>
      </div>
      )
  }
  
   










