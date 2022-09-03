const product_model = require('../model/ProductModel');
const helper = require('../helper/helper')

exports.getproduct = async (req,res)=>{
    try{
        const data = await product_model.getproduct();
        res.json({ message: 'Product Fetch Successfully', status: 1, data: data });
        
       }catch (err) {
        res.json({ message: 'error', status: 0 });
  }
}


exports.addproduct  = async(req,res)=>{
    try{
        const inputs = req.body;
        console.log(inputs)
        const check = validation_addproductdata(inputs);
        if(check){
            res.json(check);
        }else{
            const data = await product_model.addproduct(inputs);
            const product_Id = (data.insertId);
            res.json({ message: 'Product Add Successfully', status: 1, data: product_Id });
        
       }
    }catch (err) {
    res.json({ message: 'error', status: 0 });
  }
}

//Update Product
exports.updateproduct = async(req,res)=>{
    try{
        const inputs = req.body;
        console.log(inputs)
        const check = validation_updateproductdata(inputs);
        if(check){
            res.json(check);
        }else{
            const data = await product_model.updateproduct(inputs);
            const product_Id = (data.insertId);
            res.json({ message: 'Product Updated Successfully', status: 1, data: product_Id });
        
       }
    }catch (err) {
    res.json({ message: 'error', status: 0 });
  }
}

//Delete Product

exports.deleteproduct =async (req,res)=>{
    try{
        const inputs = req.body;
        console.log(inputs)
        const check = validation_deletedata(inputs);
        if(check){
            res.json(check);
        }else{
            const data = await product_model.deleteproduct(inputs);
            const product_Id = (data.insertId);
            res.status(200).json({ message: 'Product Deleted Successfully', status: 1, data: {} });
        
       }
    }catch (err) {
    res.status(400).json({ message: 'error', status: 0 });
  }


}

//Filter API By Category

exports.filterbycategory = async (req,res)=>{
    try{
        const inputs = req.body;
        console.log(inputs)
        const check = field_validate1(inputs);
        if(check){
            res.json(check);
        }else{
            const data = await product_model.filterbycategoryproduct(inputs);
           if(empty(data)){
                res.status(200).json({ message: 'Product Data Deleted Successfully', status: 1, data: {} });
            }else{
                res.status(200).json({ message: 'Not found', status: false, data: {} });
            }
        
       }
    }catch (err) {
    res.status(400).json({ message: 'error', status: 0 });
  }

}

//filter by title 

exports.filterbytitle =async (req,res)=>{
    try{
        const inputs = req.body;
        console.log(inputs)
        const check = field_validate(inputs);
        if(check){
            res.json(check);
        }else{
            const data = await product_model.filterbytitleproduct(inputs);
            if(empty(data)){
                res.status(200).json({ message: 'Product Data Fetched Successfully', status: 1, data: data });
            }else{
                res.status(200).json({ message: 'Not found', status: false, data: {} });
            }
           
       }
    }catch (err) {
    res.status(400).json({ message: 'error', status: 0 });
  }


}

function field_validate(user_data){
    if (! empty(user_data)) {
        return {status: 0, message: 'Please provide some inputs'};
    }
    if (helper.validate_field('title', user_data.title)) {
        return helper.validate_field('title', user_data.title);
    } 
    return false;
}
function field_validate1(user_data){
    if (! empty(user_data)) {
        return {status: 0, message: 'Please provide some inputs'};
    }
    if (helper.validate_field('category', user_data.category)) {
        return helper.validate_field('category', user_data.category);
    } 
    return false;

}

function validation_addproductdata(user_data) {
    if (! empty(user_data)) {
        return {status: 0, message: 'Please provide some inputs'};
    }
    // if (helper.validate_field('image', user_data.image)) {
    //     return helper.validate_field('image', user_data.image);
    // } 
    if (helper.validate_field('title', user_data.title)) {
        return helper.validate_field('title', user_data.title);
    } 
    if (helper.validate_field('category', user_data.category)) {
        return helper.validate_field('category', user_data.category);
    } 
    if (helper.validate_field('description', user_data.description)) {
        return helper.validate_field('description', user_data.description);
    }   
    if (helper.validate_field('amount', user_data.amount)) {
        return helper.validate_field('amount', user_data.amount);
    }   
    
    return false;
    }

    function validation_updateproductdata(user_data) {
        if (! empty(user_data)) {
            return {status: 0, message: 'Please provide some inputs'};
        }
        if (helper.validate_field('image', user_data.image)) {
            return helper.validate_field('image', user_data.image);
        } 
        if (helper.validate_field('title', user_data.title)) {
            return helper.validate_field('title', user_data.title);
        } 
        if (helper.validate_field('category', user_data.category)) {
            return helper.validate_field('category', user_data.category);
        } 
        if (helper.validate_field('description', user_data.description)) {
            return helper.validate_field('description', user_data.description);
        }   
        if (helper.validate_field('amount', user_data.amount)) {
            return helper.validate_field('amount', user_data.amount);
        }   
        if (helper.validate_field('product_Id', user_data.product_Id)) {
            return helper.validate_field('product_Id', user_data.product_Id);
        }    
        
        return false;
        }

        function validation_deletedata(user_data) {
            if (! empty(user_data)) {
                return {status: 0, message: 'Please provide some inputs'};
            }
            if (helper.validate_field('product_Id', user_data.product_Id)) {
                return helper.validate_field('product_Id', user_data.product_Id);
            }   
            return false;
            }
    
    