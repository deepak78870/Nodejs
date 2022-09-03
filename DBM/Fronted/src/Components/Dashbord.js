import React, { Fragment, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';

const Dashboard = () =>{
    const[product, setProduct] = useState([])
    const[serch, setSerch] = useState("");
    console.log(product)
    const getProduct = async() => {
        await axios.get(`http://localhost:3501/api/getproduct/`).then(res=> {
            if(res.data.status === 1) {
                setProduct(res.data.data)
            }
        })
    }
    useEffect(()=> {
        getProduct();
    },[])
    function logout(){
        localStorage.setItem('id', '');
    }
    
    return(
       <Fragment>
          <header class="header_section">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg custom_nav-container pt-3">
          <Link class="navbar-brand" to="index.html">
            <img src="images/logo.png" alt=""/>
            <span>
              Deepak
            </span>
          </Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="d-flex  flex-column flex-lg-row align-items-center w-100 justify-content-between">
              <ul class="navbar-nav  ">
                <li class="nav-item active">
                    
                  <Link class="nav-link" to="#">Home </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="#"> About </Link>
                </li>
              
                <li class="nav-item">
                  <Link class="nav-link" to="#">Contact us</Link>
                </li>
              </ul>
              <form class="form-inline ">
                <input type="search" placeholder="Search" onChange={(e)=> setSerch(e.target.value)}/>
              </form>
              <div class="login_btn-contanier ml-0 ml-lg-5">
                {
                    localStorage.getItem('id')!== ''?<Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      Action
                    </Dropdown.Toggle>
              
                    <Dropdown.Menu variant='dark'>
                      <Dropdown.Item href="/update">Edit Profile</Dropdown.Item>
                      <Dropdown.Item href="/produtdetails">Product List</Dropdown.Item>
                      <Dropdown.Item  onClick={logout} href="/">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> : <Link to="/login">
                    <img src="images/user.png" alt=""/>
                    <span>
                      Login
                    </span>
                  </Link>
                }
              </div>
            </div>
          </div>

        </nav>
      </div>
    </header>

  <section class="health_section layout_padding">
    <div class="health_carousel-container">
      <h2 class="text-uppercase">
        Products
      </h2>
      <div class="carousel-wrap layout_padding2">
        <Row>
            {
                product.filter(user=>user.title.toLocaleLowerCase().includes(serch)).map(user=> {
                    return(
                        <Col md='6'>
                        <div class="item">
                            <div class="box">
                                <div class="btn_container">
                                    <Link to="">
                                    Buy Now
                                    </Link>
                                </div>
                                <div class="img-box">
                                    <img src={user.image} alt=""/>
                                </div>
                                <div class="detail-box">
                                    <div class="star_container">
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star-o" aria-hidden="true"></i>
        
                                    </div>
                                    <div class="text">
                                    <h6>
                                        {user.title}
                                    </h6>
                                    <h6 class="price">
                                        <span>
                                        Rs.
                                        </span>
                                        {user.amount}
                                    </h6>
                                    <h6 class="price">
                                        {user.description}
                                    </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    )
                })
            }
            

        </Row>
      </div>
    </div>
  </section>

       </Fragment>
    )
}
export default Dashboard