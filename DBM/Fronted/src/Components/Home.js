import React, {useState, useEffect,useMemo} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import {Container,Row,Col } from 'react-bootstrap';
import axios from 'axios'
import {Link } from "react-router-dom";


const  Home = ()=> {
    const[product, setProduct] = useState([])
    console.log(product)
    const jwt_token = localStorage.getItem('token')
    const getProduct = async() => {
        await axios.get(`http://localhost:3501/api/getproduct/`,{
            headers:{
                jwt: jwt_token
            }
        }).then(res=> {
            if(res.data.status === 1) {
                setProduct(res.data.data)
            }
        })
    }
    useEffect(()=> {
        getProduct();
    },[])

//Search Field
   


  //console.log('test',deep)
  return (
    <><h2 style={{"textAlign":"center"}}>Products Details</h2>
      <Container>
      <Link to="/addproduct" className="btn btn-success"  style={{"float": "right"}}>Add</Link> 
      <Table striped bordered hover className="mt-5">
      <thead>
        <tr>
          <th>Sr. No</th>
          <th>Product Name</th>
          <th>Product Category</th>
          <th>Product Description</th>
          <th>Product Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          product?.map((item, index)=> {
            return(
              <tr>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.description}</td>
                <td>{item.amount}</td> 
                <td>
                <Link to="#" className="btn btn-primary" style={{"margin-right": "4px"}}>Edit</Link>
                <Link to="#" className="btn btn-danger">Delete</Link></td>  
            </tr> 
            )
          })
        }
        
      </tbody>
    </Table>
      </Container>
     
    </>
  );
}

export default Home ;

