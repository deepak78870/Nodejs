import React, { useCallback, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from "axios";
import swal from 'sweetalert';
import { validate } from 'validate.js';


export default function Login() {
  const [code, setCode] = useState("3456");
  console.log("code: ", code);
  // States for registration
  let navigate = useNavigate();
  const [user, setUser] = useState({
       email: "",
       password: "",
 });
 const [error, setError] = useState({
  email: "",
  password: "",
});
validate = (name, value) => {
  switch (name) {
      case "email":
          if (!value) {
              return "Email is Required";
          } else if (
              !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
          ) {
              return "Enter a valid email address";
          } else {
              return "";
          }
      case "password":
          if (!value) {
              return "Password is Required";
          } else if (value.length < 6 || value.length > 12) {
              return "Please fill at least 6 character";
          } else {
              return "";
          }
      default: {
          return "";
      }
  }
};
 const onInputChange = e => {
     setUser({ ...user, [e.target.name]: e.target.value});
       console.log(user);
     setError({...error,[e.target.name]: validate(e.target.value)
  })

 };
 
 const onSubmit = async e => {
  e.preventDefault();
  
  let validationErrors = {};
  Object.keys(user).forEach(name => {
      const error = validate(name, user[name]);
      if (error && error.length > 0) {
          validationErrors[name] = error;
      }
  });
  if (Object.keys(validationErrors).length > 0) {
    setError(validationErrors);
      return;
  }

  await axios.post(`http://localhost:3501/api/signin/`,user).then(res=> {
    console.log(res);
      if(res.data.status === 1) {debugger
        localStorage.setItem('id', res.data.data[0].Id);
        localStorage.setItem('token', res.data.data[0].jwt);

          swal({
              title: "You have successfully login!",
              text: "You click on okay button",
              icon: "success",
              button: "Okay",
            }).then(
              navigate('/')
            )
      } else if(res.data.message == ' This email is not registered.'){
        swal({
          title: "Incorrect email id!",
          text: "You click on okay button",
          icon: "error",
          button: "Okay",
        }).then(
          navigate('/login')
        )
      }else if(res.data.message == 'Password is incorrect.'){
        swal({
          title: "Password is Incorrect!",
          text: "You click on okay button",
          icon: "error",
          button: "Okay",
        }).then(
          navigate('/login')
        )
      }
      
    })
  
    
};
console.log(localStorage.getItem('id'));
  return (
    <>
      <div className='sign-up-form'>
        <form onSubmit={e => onSubmit(e)}>
          <h3>SIGNIN</h3>
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
            <p className='text-danger mb-0'>{error.email}</p>
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
            <p className='text-danger mb-0'>{error.password}</p>
          </div>
          <div className='text-center'>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <Link to='/signup' style= {{"margin-left":"40px"}}>Signup</Link> 
          </div>
        </form>
      </div>


    </>
  );
}