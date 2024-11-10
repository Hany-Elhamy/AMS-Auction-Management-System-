import { Solditem } from "./Solditem";
import { useParams } from "react-router-dom";
import React from "react";
import './Solditem.css';
import { getAuthToken } from "../../core/services/auth";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
export const SolditemList=()=>{
    const { token, user } = getAuthToken();
   const currentdate=new Date();
   const currenthours=((currentdate.getHours()))+1;
    const [product, setProduct] = useState({
        loading: true,
        result: {},
        err: null,
      });
      const [sold, setSold] = useState({
        loading: true,
        result: {},
        err: null,
      });
      const [state, setstate] = useState({
        loading: true,
        result: {},
        err: null,
        update: false,
      });
      
      useEffect(() => {
        setProduct({ ...product, loading: true });
        axios
          .get("http://localhost:4000/api/Aucation",{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          
          .then((data) => {
            setProduct({ ...product, result: data.data, loading: false, err: null });
              console.log(data.data.aucation)
            const array1 =data.data.aucation;
    
            array1.forEach(element => {if(element.product.end<currenthours && element.product.state!=-1){
              axios.put(`http://localhost:4000/api/Product/${element.product.id}`,{
                state:1,
              },{
                headers:{
                  Authorization: `Bearer ${token}`,
                }
              })
              .then(() => {
                setstate({ ...state, loading: false ,err:null});
                
              })
              .catch((errors) => {
                if(typeof errors.response.data.message==="string"){
                  setstate({ ...state, loading: false,err:[{msg:errors.response.data.message}]});
                }
                else{
                  setstate({ ...state, loading: false,err:errors.response.data.message});
                }
                
              });
           
          }})
          })
          .catch((err) => {
            setProduct({ ...product, loading: false, err: [{ msg: `something went wrong ${err}` }] });
          });
      }, []);

      const loadingSpinner = () => {
        return (
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        );
      };
      const error = () => {
        return (
          <div className="container">
            
            <div className="row">
              {product.err.map((err, index) => {
                return (
                  <div key={index} className="col-sm-12 alert alert-danger" role="alert">
                    {err.msg}
                  </div>
                );
              })}
            </div>
          </div>
        );
      };
    return(
    <React.Fragment>
        {product.err !== null && error()}
            {product.loading === true ? (
                loadingSpinner()
            ) : (
        <section className="sold">
   <div className="margin-left">
        <h1> Sold Items</h1>
    
        {
          
          product.result.aucation.map((product) => {
            if(product.product.state==1)
                return(
                    <Solditem
                   
                    key={product.id}
                    id={product.id}
                    title={product.product.productName}
                    price={product.price}
                    bidder={product.user.name}
                    image={product.product.productImage}
                    description={product.product.desc}/>
                );
        })
        }
        <div className="clear"></div>
        </div>
        </section>
       
       )}
    </React.Fragment>
    );
}