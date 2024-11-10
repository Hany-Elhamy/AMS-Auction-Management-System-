import React from "react";
import { Link } from "react-router-dom";
import {IoHome} from 'react-icons/io5';
import {IoCreate} from 'react-icons/io5';
import {FiLogOut} from 'react-icons/fi';
import {MdOutlineProductionQuantityLimits} from 'react-icons/md';
import {MdRemoveShoppingCart} from 'react-icons/md';
import {FaShopify} from 'react-icons/fa';
import './Nav-script.js';
import'./Nav.css';
import '../../App.css';

import { Navimage } from "./Navimage.jsx";
export const Nav = () =>{
  
return(
    <React.Fragment>
        <div id="progressbar"></div>
        <div id="scrollpath"></div>
        <header>
            <div className="nav-bar">
                <a href="" className="logo">monsh aucation</a>
                <div className="navigation">
                    <div className="nav-items">
                        <Link to={'/Home'}><IoHome/> Home</Link>
                        <Link to={'Item'}><MdOutlineProductionQuantityLimits/> Items</Link>
                        <Link to={'Sold'}><FaShopify/> Solded Items</Link>
                        <Link to={'Expired'}><MdRemoveShoppingCart/> Expired Items</Link>
                        <Link to={'Create'}><IoCreate/> Creation</Link>
                        <Link><FiLogOut/> Logout</Link>
                    </div>
                </div>
            </div>
            
            <div className="scroll-indicator-container">
                <div className=" scroll-indicator-bar">
                </div>
            </div>
        </header>
        <Navimage/>
    </React.Fragment>
);
};