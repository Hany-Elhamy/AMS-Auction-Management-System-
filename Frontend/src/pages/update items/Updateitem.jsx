import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Updateitem.css";
import '../../App';
import { getAuthToken } from "../../core/services/auth";
export const Updateitem=()=>{
    let { id } = useParams();
    const navigate = useNavigate();
     const { token, user } = getAuthToken();

    const currentdate=new Date();
    const currenthours=((currentdate.getHours())%12||12)+1;
    const [product, setProduct] = useState({
        loading: true,
        result: {},
        err: null,
        update: false,
        filename: "Choose file",
      });
      const form = useRef({
        productName:"",
        Category:"",
        desc:"",
        min_bid:0,
        duration:5,
        start:currenthours,
        // productImage:null,
        state:0,
        sellerID:user.id,
        CategoryID:0,
        image:null,
      });
      const end3=((form.current.start+form.current.duration));
      const form1=useRef({
         end:end3,
      });
      const update = (e) => {
        e.preventDefault();
        setProduct({ ...product, loading: true });
      
        axios.put(`http://localhost:4000/api/Product/${id}`,{
            productName: form.current.productName.value,
            desc: form.current.desc.value,
            duration: form.current.duration,
            min_bid: form.current.min_bid.value,
            start: form.current.start.value,
            end: form1.current.end.value,
            state:form.current.state,
          },{
            headers:{
              Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          })
          .then(() => {
            setProduct({ ...product, loading: false ,err:null});
            navigate('/Specificitem/'+id);
          })
          .catch((errors) => {
            if(typeof errors.response.data.message==="string"){
            setProduct({ ...product, loading: false,err:[{msg:errors.response.data.message}]});
            }
            else{
              setProduct({ ...product, loading: false,err:errors.response.data.message});
            }
            
          });
          console.log(form.current.productName.value,form.current.CategoryID.value,form.current.desc.value,form.current.min_bid.value,form.current.start.value,form1.current.end.value);
      };

      
      useEffect(() => {
        axios
          .get(`http://localhost:4000/api/Product/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((resposne) => {
            setProduct({ ...product, result: resposne.data, loading: false, err: null });
            console.log(resposne.data);
          })
          .catch((errors) => {
            setProduct({
              ...product,
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
      }, [product.update]);

      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setProduct({ ...product, filename: file.name });
        } else {
          setProduct({ ...product, filename: "Choose file" });
        }
      };

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
            <section className="update">
            <div className="box">
                <span className="borderline"></span>
                
                <form  onSubmit={
          (e) => update(e)
        } key={product.result.product.id}>
                    <h2> update Item</h2>
                    
                    <div className="inputBox">
                        <input type="text" required defaultValue={[product.result.product.productName]}  id="name"  ref={(val) => {
                          form.current.productName = val;
                        }} />
                        <span>Product_Name</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <select type="text" required  ref={(val) => {
                          form.current.CategoryID = val;
                        }} >
                            <option className="font" value="-1">{[product.result.category.name]}</option>

                        </select>
                        <span>Product_Category</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="text" required defaultValue={[product.result.product.desc]} ref={(val) => {
                            form.current.desc = val;
                          }}/>
                        <span>Product_Description</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="number" required defaultValue={[product.result.product.min_bid]} ref={(val) => {
                            form.current.min_bid = val;
                          }}/>
                        <span>Minimum_Bid</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="number" defaultValue={[product.result.product.start]} id="start"required ref={(val) => {
                            form.current.start = val;
                          }}/>
                        <span>Start_Date</span>
                        <i></i>
                    </div>
                    <div className="inputBox">
                        <input type="number" id="end"  defaultValue={[product.result.product.end+5]} required ref={(val) => {
                            form1.current.end = val;
                          }}/>
                        <span>End_Date</span>
                        <i></i>
                    </div>
                    {/* <div className="inputBox">
                        <input type="text"  readonly
                        required   id="image"   defaultValue={[product.result.product.productImage]} ref={(val) => {
                            form.current.productImage = val;
                          }} />
                        <span>Product_Image</span>
                        <i></i>
                    </div> */}
                    <input className="btn-update" type="submit" value="Update"/>
                    <button className="btn-update"  type="button" onClick={()=>{
                                navigate('/Specificitem/'+id)}} > Back</button>
                </form>
                 
            </div>


            </section>
 )}
        </React.Fragment>

    );
};