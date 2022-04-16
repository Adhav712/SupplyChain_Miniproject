import Login from "./components/Login";
import Querry from "./components/Querry";
import UploadBill from "./components/UploadBill"
import { BrowserRouter, Route,Routes } from "react-router-dom";
import OrgPage from "./components/OrgPage";



function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/OrgPage/Querry" element={<Querry/>} /> 
          <Route path="/OrgPage/UploadBill" element={<UploadBill/>} />
          <Route path="/OrgPage" element={<OrgPage/>} />  
        </Routes>
        
      </div>
    </BrowserRouter>
    
  )
}

export default App;
