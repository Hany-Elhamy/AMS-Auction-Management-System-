import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAuthToken } from "../../core/services/auth";
import './Specificitem.css';

export const Specificitem=(props)=>{
    const navigate = useNavigate();
    let { id } = useParams();
    const { token, user } = getAuthToken();
    const [specificUser, setSpecificUser] = useState({
        loading: true,
        result: {},
        err: null,
        update: false,
      });

      useEffect(() => {
        axios
          .get(`http://localhost:4000/api/Product/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((resposne) => {
            setSpecificUser({ ...specificUser, result: resposne.data, loading: false, err: null });
            console.log(resposne.data);
          })
          .catch((errors) => {
            setSpecificUser({
              ...specificUser,
              result: {
                productName: "",
                desc: "",
                category: {
                  name: "",
                },
               
              },
              loading: false,
              err: [{ msg: errors.response.data.message }],
            });
          });
      }, [specificUser.update]);
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
              {specificUser.err.map((err, index) => {
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
            {specificUser.err !== null && error()}
      {specificUser.loading === true ? (
        loadingSpinner()
      ) : (
            <section className="specific">
            <div className="card">
                <div className="lines"></div>
                <div className="imBx">
                    <img src={specificUser.result.product.productImage}  />
                </div>
                <div className="content">
                    <div className="details">
                        <h2 >product_Name:{specificUser.result.product.productName}</h2>
                        <div className="data">
                            <h3 >Last_minimum_bid<br/><span>{specificUser.result.product.min_bid}</span></h3>
                            <h3 >Description<br/><span>{specificUser.result.product.desc}</span></h3>
                            {/* <h3 >category<br/><span>{product_type}</span></h3> */}
                        </div>
                        <div className="actionBtn">
                            <a  className="delete_btn" onClick={() => {
                                            setSpecificUser({ ...specificUser, loading: true, err: null });
                                            axios
                                              .delete(`http://localhost:4000/api/Product/${id}`, {
                                                headers: {
                                                  Authorization: `Bearer ${token}`,
                                                },
                                              })
                                              .then((resposne) => {
                                                setSpecificUser({ ...specificUser, loading: false, err: null, update: !specificUser.update });
                                                navigate('/Expired/')
                                              })
                                              .catch((errors) => {
                                                setSpecificUser({ ...specificUser, loading: false, err: [{ msg: errors.response.data.message }] });
                                              });
                                          }}>DELETE</a>
                            <button onClick={()=>{
                                navigate('/Update/'+id)
                            }}>UPDATE&ADD</button>
                            <button  type="button"onClick={()=>{
                                navigate('/Expired')}} > Back</button>
                           
                        </div>
                    </div>
                </div>
                

            </div>
           
            </section>
            )}
        </React.Fragment>

    );
};