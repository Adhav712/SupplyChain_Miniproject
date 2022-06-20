import Login from "./components/Login";
import Query from "./components/Query";
import UploadBill from "./components/UploadBill"
import { BrowserRouter, Route,Routes } from "react-router-dom";
import OrgPage from "./components/OrgPage";
import Mainpage from "./components/main";
import UserQuery from "./components/UserQuery";


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/OrgPage" element={<OrgPage/>} />
          <Route path="/UserQuery" element={<UserQuery/>} />
          <Route path="/OrgPage/Query" element={<Query/>} /> 
          <Route path="/OrgPage/UploadBill" element={<UploadBill/>} />
        </Routes>
      </div>
    </BrowserRouter>
    
  )
}

export default App;
