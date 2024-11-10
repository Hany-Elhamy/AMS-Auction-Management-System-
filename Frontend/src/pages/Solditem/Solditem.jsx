import React from "react";
import './Solditem.css';

export const Solditem=(props)=>{
    return(
        <React.Fragment>
          
    
    <div className="flip-card">
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <img src={props.image} alt="Avatar" />
      </div>
      <div className="flip-card-back">
        <h1></h1> 
        <p >product_Name:{props.title}</p> 
        <hr/>
        <p  className="back2" > description:{props.description}</p>
      <hr/>
      <p  className="back2" > bidder:{props.bidder}</p>
      <hr/>
      <p  className="back2" > price:{props.price}</p>
      <hr/>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star checked"></span>
      <span className="fa fa-star"></span>
  
      </div>
    </div>
  </div>
  

        </React.Fragment>

    );
};