import React,{useState} from "react";
import "./Login.css";
import { useNavigate  } from 'react-router-dom';
import useStore from "./store";
import Trushchain from "../assets/Trushchain.png";


export default function Login() {
  let navigate = useNavigate();

  const SelectedOrg = useStore((state) => state.SelectedOrg);
  const Checkauth = useStore((state) => state.Checkauth);
  const auth = useStore(state => state.isLoggedIn);
  let data;
  
  
  const Organization = useStore(state => state.org);
  const [mailid,setmailid] = useState("");
  const [password,setpassword] = useState("");
  
  const LoginCheck = async()=>{
      //const fetchs = await fetch(`https://3000-adhav712-supplychainmin-auk2ectrrub.ws-us41.gitpod.io/$login`,{
      const fetchs = await fetch(`http://localhost:3000/login`,{
        method: 'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          choose_org : Organization,
          AdminID: `${Organization}_Admin`,
          emailId  : mailid+Organization,
          password : password
        })
      })
     
        const data = await fetchs.json();
        console.log(data);
        Checkauth(data);
        console.log("auth"  ,auth);
        if(auth == 'authenticated'){
          navigate('OrgPage');
          console.log("authenticated");
        }
}





  
  return(
      
      <div className="general">
      <image className="logo" src={Trushchain} />
      <div id="loginform1">
        <h2 id="headerTitle">TrustChain</h2>
        <div id="drop" class="rows">
          <select onChange={(event) => data = (event.target.value)} >
          <option value="Owner">SelectedOrg</option>
            <option value="Owner">Owner</option>
            <option value="Producer">Producer</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Distributor">Distributor</option>
            <option value="Retailer">Retailer</option>
          </select>
        </div>
        <div className="row"><input type="email" placeholder="Enter your email" onChange={  e => setmailid(e.target.value)}/> </div>
        <div className="row"><input type="password" placeholder="Enter your password" onChange = {e => setpassword(e.target.value)}/> </div>
          <div  id="button" class="row"> 
            <button 
            onClick={() => {
              SelectedOrg(data)
              console.log("data",data)
              LoginCheck()
            }}>Login</button>
          </div>
        
      </div>
      </div>  
      )
  }
  
   










