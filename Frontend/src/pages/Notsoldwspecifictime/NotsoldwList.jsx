import { Notsoldw } from "./Notsoldwi";
import React from "react";
import { IoTerminal } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { getAuthToken } from "../../core/services/auth";
import axios from "axios";

export const NotsoldwList=()=>{
  // const navigate = useNavigate();
    const { token, user } = getAuthToken();
    const currentdate=new Date();
    const currenthours=((currentdate.getHours()))+1;
    const [product, setProduct] = useState({
        loading: true,
        result: {},
        err: null,
        update: false,
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
        .get("http://localhost:4000/api/Product", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((data) => {
            
            setProduct({ ...product, result: data.data, loading: false, err: null });
          
            console.log(product.result.products);
            const array1 =data.data.products;

            array1.forEach(element => {if(element.end<currenthours && element.state!=1){
              axios.put(`http://localhost:4000/api/Product/${element.id}`,{
                state:-1,
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
      }, [ product.update]);

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

      const deletee = (id) => {
        setProduct({ ...product, loading: true, err: null });
        axios
          .delete(`http://localhost:4000/api/Product/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((resposne) => {
            setProduct({ ...product, loading: false, err: null, update: !product.update });
          })
          .catch((errors) => {
            setProduct({ ...product, loading: false, err: [{ msg: errors.response.data.message }] });
          });
    };
      

   
    return(

    <React.Fragment>
         {product.err !== null && error()}
            {product.loading === true ? (
                loadingSpinner()
            ) : (
         <section className="notsold">
      <section className="product"> 
        <h2 className="product-category">Not sold Items</h2>
        <button className="pre-btn"></button>
        <button className="nxt-btn"></button>
        <div className="product-container">
            {
              
                product.result.products.map((product) => {
                    if( product.state==0) 

                    return(
                <Notsoldw 
                key={product.id}
                id={product.id}
                title={product.productName}
                min_bid={product.min_bid}
                description={product.desc}
                image={product.productImage}
                func={deletee}
                />
                
                    );
                    console.log(product.productImage)
            })
        }
        </div>
        </section>
        </section>
         )}
    </React.Fragment>
    );
} ;