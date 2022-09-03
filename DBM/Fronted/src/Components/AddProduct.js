import React,{ useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
 
export default function AddProduct() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
       title: "",
       category: "",
       description:"",
       amount: "",
 });
 const jwt_token = localStorage.getItem('token')
 const onInputChange = e => {
 setUser({ ...user, [e.target.name]: e.target.value});
     console.log(user);

 };
 
 const onSubmit = async e => {
  e.preventDefault();
  await axios.post(`http://localhost:3501/api/addproduct/`,user,{
    headers:{
   jwt: jwt_token
   }}).then(res=> {
    console.log(res);
      if(res.data.status === 1) {
          swal({
              title: "Product Add Successfully!",
              text: "You click on okay button",
              icon: "success",
              button: "Okay",
            }).then(
              navigate('/')
            )
      } else{
        navigate('/')
      }
});
 }
  return (
      <>
      <div className='sign-up-form'>
      
      <form onSubmit={e => onSubmit(e)}>
      <h3>Product</h3>  
      <div className="mb-3">
    <label htmlFor="exampleInputusername" className="form-label">
      Title
    </label>
    <input
      type="text"
      className="form-control"
      id="title"
      aria-describedby="userHelp"
      placeholder='enter title'
      name ="title"
      value={user.title} onChange={e => onInputChange(e)}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Category
    </label>
    <input
      type="text"
      className="form-control"
      id="category"
      aria-describedby="emailHelp"
      placeholder='enter category'
      name ="category"
      value={user.category} onChange={e => onInputChange(e)}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Description 
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      placeholder='enter description'
      name ="description"
      value={user.description} onChange={e => onInputChange(e)}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Amount(Rs)
    </label>
    <input
      type="Number"
      className="form-control"
      id="amount"
      placeholder='enter amount'
      name ="amount"
      value={user.amount} onChange={e => onInputChange(e)}
    />
  </div>
  <div className='text-center'>
  <button type="submit" className="btn btn-primary">
    Add Product
  </button>
  </div>
</form>
      </div>
         

      </>
  );
  }
