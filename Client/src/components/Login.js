import React,{useState} from "react";
import "./Login.css";
import { useNavigate  } from 'react-router-dom';
import useStore from "./store";
import Trushchain from "../assets/Trushchain.png";


export default function Login() {
  let navigate = useNavigate();

 // const SelectedOrg = useStore((state) => state.SelectedOrg);
 const Checkauth = useStore((state) => state.Checkauth);
  const auth = useStore(state => state.isLoggedIn);
  let data;
  
  const [SelectedOrg,setSelectedOrg] = useState(" ");
//  const [Checkauth,setCheckauth] = useState("false");
  //const Organization = useStore(state => state.org);
  const [mailid,setmailid] = useState("");
  const [password,setpassword] = useState("");
  
  const LoginCheck = async(SelectedOrg)=>{
      //const fetchs = await fetch(`https://3000-adhav712-supplychainmin-auk2ectrrub.ws-us41.gitpod.io/$login`,{
      const fetchs = await fetch(`http://localhost:3000/login`,{
        method: 'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          choose_org : SelectedOrg,
          AdminID: `${SelectedOrg}_Admin`,
          emailId  : mailid+SelectedOrg,
          password : password
        })
      })
      
      try{
        data = await fetchs.json();
        console.log(data);
        if(data.authenticated === "true"){
          navigate('/OrgPage');
          Checkauth(data.authenticated);
          console.log("auth"  ,auth);

        }else{
          alert("Wrong EmailId or Password");
        }
      }catch(error){
        console.log(error);
        alert(`Error: ${error}`);
        window.location.reload();
      }     
}





  
  return(
      
      <div className="general">
      
      <div id="loginform1">
        <h2 id="headerTitle">TrustChain</h2>
        <div id="drop" className="rows">
          <select onChange={(event) => data = setSelectedOrg(event.target.value)} >
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
          <div  id="button" className="row"> 
            <button 
            onClick={() => {
              // const dataselect = data;
              // setSelectedOrg(data)
              console.log("NS",SelectedOrg);
              console.log("data",data);
              LoginCheck(SelectedOrg)
            }}>Login</button>
          </div>
        
      </div>
      </div>  
      )
  }
  
   










