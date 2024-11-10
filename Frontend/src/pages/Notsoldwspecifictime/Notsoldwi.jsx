import React from "react";
import './Notsoldw.js';
import './Notsoldw.css';

export const Notsoldw =(props)=>{
  return (
   <React.Fragment>
   
            <div className="product-card">
                <div className="product-image">
                    <img src={props.image} className="product-thumb" alt=""/>
              
                    <button className="card-btn"  onClick={()=>{ 
        props.func(props.id)
      }}>Delete</button>
                </div>
                <div className="product-info">
                <p className="product-brand">Product_Name:{props.title}</p>
                    <p className="product-short-description"> {props.description}</p>
                    <span className="price">min-bid: $ {props.min_bid}</span>
                </div>
            </div>
   </React.Fragment>
  );
};

