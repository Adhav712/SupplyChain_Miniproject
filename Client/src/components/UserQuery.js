import {React,Fragment} from "react";
import "./Query.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import {OrgContext} from "./Login";
import useStore from "./store";
import 'tw-elements';


export default function UserQuery() {

  let navigate = useNavigate();
  const Organization = useStore(state => state.org);

  const [ID,setID] = useState("");
  const [result,setresult] = useState([{
    Comments:"",
    ID:"",
    ProductId:"",
    billReceipt:"",
}]);

  const onSubmitquery = async()=>{
    // console.log("result",Organization);
   //const fetchs = await fetch(`https://3000-adhav712-supplychainmin-auk2ectrrub.ws-us41.gitpod.io/${Organization}/queries`,{
   const fetchs = await fetch(`http://localhost:3000/UserQuery`,{
      method: 'post',
      headers:{'Content-Type':'application/json'},
      //headers:{'Content-Type':'text/html'},
      body: JSON.stringify({
        org : Organization,
        AdminID: `${Organization}_Admin`,
        queryName  : "PID_readBill",
        ProductId : ID
      })
    })
    //console.log(fetchs);
    const datas = await fetchs.json();
    // console.log(datas);
    // console.log(JSON.parse(datas));
    const data = JSON.parse(datas);
    if(data === `The Bill ID: ${ID} does not exist`){
      alert("No such bill exists");
      console.log("Working");
    } else {
      setresult(result =>[...result,data]);
    }
  }
  
  const renderItems = () => {
    

    const mapRows = result.map((item, index) => (
        <Fragment key={item.ID}>
            <div>
                {/* Passing unique value to 'key' prop, eases process for virtual DOM to remove specific element and update HTML tree  */}
                <p id="ID">ID: {item.ID}</p>
                <p id="ProductId">ProductId: {item.ProductId}</p>
                <p id="Comments">Comments: {item.Comments}</p>
                <div style={{display:"flex" ,justifyContent:"flex-start"}}>
                    <span>billReceipt: </span><a href={item.billReceipt} target="_blank" id="billReceipt">{item.billReceipt}</a>
                </div>
                {/* <span>Name : {item.name}</span>
                <span>User Type: {item.user_type}</span>
                <button onClick={() => this.deleteUser(item.id)}>
                    Delete User
                </button> */}
            </div>
        </Fragment>
    ));
    return mapRows;
};


  return(
      
      <div className="general">
        <div id="loginform_query">
          <div className="nav">
            <button className="button-62" onClick={()=>navigate('/')}>Log Out</button>
          </div>
            <h2 id="headerTitle">Query Bills</h2>
            <div className="divide">
                {/* <div className="row_Query">
                  <input 
                    type="text" 
                    placeholder="Enter ID" 
                    onChange={  e => 
                      setID(e.target.value)
                  }/> 
                </div> */}
                <div className="container">
                  <div className="material-textfield">
                    <input id= "input_query"  placeholder=" " type="text"  onChange={  e =>  setID(e.target.value)}/>
                    <label id = "label_Query">Enter ID</label>
                  </div>
                </div>
                <div className="top"> 
                    <button className="submit" onClick={onSubmitquery}>Submit</button>
                </div>
                <div>
            </div>
            </div>
            <div className="Display_query_result">
              {/* <p id="ID">ID: {result.ID}</p>
              <p id="ProductId">ProductId: {result.ProductId}</p>
              <p id="Comments">Comments: {result.Comments}</p>
              <div style={{display:"flex" ,justifyContent:"flex-start"}}>
                <span>billReceipt: </span><a href={result.billReceipt} target="_blank" id="billReceipt">{result.billReceipt}</a>
              </div> */}
              <ul>
                {renderItems()}
              </ul>
            </div>
            {/* <div className="display_billReceipt">
                  <p>Alternative text - include a link <a href= {result.billReceipt} target="_blank">to the PDF!</a></p>
            </div> */}

            
        </div>

      </div>
      )
  }
  
   










