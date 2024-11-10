import "./Header.css";
import image from "../../assests/images/bid.png";
import images from "../../assests/icons/computer-icons-bidding-auction-business-service-bid.jpg";
import { Link, useNavigate } from "react-router-dom";
import {IoHome} from 'react-icons/io5';
import {IoCreate} from 'react-icons/io5';
import {FiLogOut} from 'react-icons/fi';
import {MdOutlineProductionQuantityLimits} from 'react-icons/md';
import {MdRemoveShoppingCart} from 'react-icons/md';
import {FaShopify} from 'react-icons/fa';
// import '../Hadeer_Seller/Nav-script.js';
// import'../Hadeer_Seller/Nav.css';
import { Navimage } from "../Hadeer_Seller/Navimage.jsx";
import '../../App.css';
import React from "react";
import { getAuthToken,removeAuthToken } from "../../core/services/auth";
export const Header = ()=>{
    const {token,user} = getAuthToken();
    const navigate = useNavigate();

    return(
        <>

        <div id="progressbar"></div>
        <div id="scrollpath"></div>
        <header >
        <div className="nav-bar">
                <a href="" className="logo">monsh aucation</a>
                <div className="navigation">
                    <div className="nav-items">
                    {user&&user.role==="Bidder"&&(
                            <>
                        <Link to={'/bidder-home'}><IoHome/> Home</Link>
                        <Link to={'/history'}><MdOutlineProductionQuantityLimits/> History</Link>
                                <Link 
                    onClick={() => {
                        removeAuthToken();
                        navigate("/login");
                    }}><FiLogOut/> Logout</Link>
                        </>
                        )}
                        {user&&user.role==="Seller"&&(
                            <>
                        <Link to={'/seller-home'}><IoHome/> Home</Link>
                        <Link to={'Item'}><MdOutlineProductionQuantityLimits/> Items</Link>
                        <Link to={'Sold'}><FaShopify/> Sold Items</Link>
                        <Link to={'Expired'}><MdRemoveShoppingCart/> Expired Items</Link>
                        <Link to={'Create'}><IoCreate/> Creation</Link>
                        <Link 
                        onClick={() => {
                            removeAuthToken();
                            navigate("/login");
                        }}> <FiLogOut/> Logout</Link>
                        </>
                        )}
                        {user && user.role === "Admin" && (
                            <>
                            <Link to={"/admin-home"} className="nav-link">
                                Home
                            </Link>
                            
                            </>)}

                            {!token && (
            <>
              
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              
              
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              
            </>
          )}
          {token && (
            <li
              style={{ cursor: "pointer" }}
              onClick={() => {
                removeAuthToken();
                navigate("/login");
              }}
              className="nav-items"
            >
            </li>
          )}
        
          
                    </div>
                </div>
            </div>
            
            <div className="scroll-indicator-container">
                <div className=" scroll-indicator-bar">
                </div>
            </div>
        </header>
        <Navimage/>
        </>
               
    
      );
    }
    
