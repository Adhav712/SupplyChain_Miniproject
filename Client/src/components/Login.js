import React from "react";
import "./Login.css";
import { useNavigate  } from 'react-router-dom';
import useStore from "./store";


export default function Login() {
  let navigate = useNavigate();

  const SelectedOrg = useStore((state) => state.SelectedOrg);
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
              SelectedOrg(data)
              console.log("data",data)
              navigate('OrgPage')
            }}>Login</button>
          </div>
        
      </div>
      </div>  
      )
  }
  
   










