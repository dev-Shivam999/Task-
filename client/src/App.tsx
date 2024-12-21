import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Profile from "./pages/Profile";
import Edits from "./pages/Edits";
import Payment from "./pages/Payment";
import Table from "./pages/Table";
import First from "./components/first";




const App = () => {
  return (
    

      <Routes>
        <Route path="/" element={<Home/>}>
        <Route index element={<First/>} />
        <Route path="Table" element={<Table/>} />
      
        </Route>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Sign" element={<Sign/>}/>
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Payment" element={<Payment/>}/>
        <Route path="/Table" element={<Table/>}/>
        <Route path="/Edits/:id" element={<Edits/>}/>
      </Routes>
      
 
  );
};

export default App;