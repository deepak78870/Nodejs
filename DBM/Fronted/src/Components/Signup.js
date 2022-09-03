import React,{ useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
 
export default function Signup() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
       name: "",
       email: "",
       mobile:"",
       password: "",
 });
 const onInputChange = e => {
 setUser({ ...user, [e.target.name]: e.target.value});
     console.log(user);

 };
 
 const onSubmit = async e => {
  e.preventDefault();
  await axios.post(`http://localhost:3501/api/signup/`,user).then(res=> {
    console.log(res);
      if(res.data.status === 1) {
          swal({
              title: "User Details Submitted!",
              text: "You click on okay button",
              icon: "success",
              button: "Okay",
            }).then(
              navigate('/')
            )
      } else{
        navigate('/')
      }
      if(res.data.message === 'name cannot be empty') {
        swal({
          title: "Name cannot be empty!",
          text: "You click on okay button",
          icon: "warning",
          button: "Okay",
        })
      }
      else if(res.data.message === 'email cannot be empty') {
        swal({
          title: "Email cannot be empty",
          text: "You click on okay button",
          icon: "warning",
          button: "Okay",
        })
      }
      else if(res.data.message === 'password cannot be empty') {
        swal({
          title: "Password cannot be empty",
          text: "You click on okay button",
          icon: "warning",
          button: "Okay",
        })
      }
    })
    
};
  return (
      <>
      <div className='sign-up-form'>
      
      <form onSubmit={e => onSubmit(e)}>
      <h3>SIGNUP</h3>  
      <div className="mb-3">
    <label htmlFor="exampleInputusername" className="form-label">
      User Name
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputusername"
      aria-describedby="userHelp"
      placeholder='enter user name'
      name ="name"
      value={user.name} onChange={e => onInputChange(e)}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      placeholder='enter email'
      name ="email"
      value={user.email} onChange={e => onInputChange(e)}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Mobile 
    </label>
    <input
      type="Number"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      placeholder='enter mobile'
      name ="mobile"
      value={user.mobile} onChange={e => onInputChange(e)}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      placeholder='enter password'
      name ="password"
      value={user.password} onChange={e => onInputChange(e)}
    />
  </div>
  <div className='text-center'>
  <button type="submit" className="btn btn-primary">
    Submit
  </button>
  </div>
</form>
      </div>
         

      </>
  );
}