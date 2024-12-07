import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sign from "./pages/Sign";




const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Sign" element={<Sign/>}/>
      </Routes>
      
    </div>
  );
};

export default App;