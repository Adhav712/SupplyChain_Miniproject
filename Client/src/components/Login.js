import React from "react";
import "./Login.css";

export default function Login() {
  //const history = useHistory();
    return(
      
      <div className="general">
      <div id="loginform">
        <h2 id="headerTitle">Login</h2>
        <div id="drop" class="rows">
          <select>
            <option value="volvo">Owner</option>
            <option value="saab">Producer</option>
            <option value="mercedes">Consumer</option>
            <option value="audi">Retailer</option>
          </select>
        </div>
        <div className="row"><input type="email" placeholder="Enter your email" /> </div>
        <div className="row"><input type="password" placeholder="Enter your password"/> </div>
          <div id="button" class="row"> 
            <button>Login</button>
          </div>
        
      </div>

      </div>
      )
  }
  
   










