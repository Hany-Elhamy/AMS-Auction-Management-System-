
import './App.css';
import {Header} from "./shared/Header/Header";
import { Nav } from "./shared/Hadeer_Seller/Nav";
import {Footer} from "./shared/Footer/Footer"
import { Outlet,useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from "react";
import { Login } from "./pages/auth/login/login";
import { Register } from "./pages/auth/register/register";
import { Headerlr } from "./shared/headerloginreg/headerlr";

import axios from "axios";
function App() {
  const id=4;
  const [user, setUser] = useState({
    loading: true,
    result: {},
    err: null,
  });
        
  const form = useRef({
    RoleID:0,
  });
  
  useEffect(() => {
    setUser({ ...user, loading: true });
    axios
      .get(`http://localhost:4000/api/User/${id}`)
      .then((data) => {
        setUser({ ...user, result: data.data, loading: false, err: null });
      console.log(data.data)
      console.log(data.data.RoleID)
      })
      .catch((err) => {
        setUser({ ...user, loading: false, err: [{ msg: `something went wrong ${err}` }] });
      });
  }, []);

  return (
    
    <div className='background'>
    <Header/>
    {/* { user.result.RoleID==2 &&(
     <Header />
    )}
     { user.result.RoleID==3&&( <Nav/> )} */}
     <Outlet/>
     {/* <Footer/> */}
    </div>
  );
}

export default App;
