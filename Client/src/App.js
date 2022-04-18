import Login from "./components/Login";
import Query from "./components/Query";
import UploadBill from "./components/UploadBill"
import { BrowserRouter, Route,Routes } from "react-router-dom";
import OrgPage from "./components/OrgPage";



function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/:org" element={<OrgPage/>} />
          <Route path="/:org/Query" element={<Query/>} /> 
          <Route path="/:org/UploadBill" element={<UploadBill/>} />
            
        </Routes>
        
      </div>
    </BrowserRouter>
    
  )
}

export default App;
