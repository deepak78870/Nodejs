const express = require('express');
var app = express();
var AWS = require("aws-sdk");
var upload = require("express-fileupload");
app.use(upload());
app.post('/',async(req, res) => {
    try {
        const image = req.files.image;
        console.log("nasndj",image);
        const imageUrl = `profile_image/${Date.now()}.${((image.mimetype).split("/"))[1]}`;
        //const user = await userModel.findOne({ _id: user_id });

        const s3 = new AWS.S3({
            accessKeyId:'AKIASE2IITJ3NSL3KC7I',
            secretAccessKey: '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',
            region: 'ap-south-1'
        })
        // const params = {
        //     Bucket:'deepaktesting1',
        //     Key: imageUrl,
        //     Body: (image.data),
        //     ContentDisposition: 'inline',
        //     acl: "public-read"
        // }
        // const imageData = await s3.upload(params).promise();
        // console.log(imageData);
        const list = await s3.listObjectsV2({Bucket:'deepaktesting1'}).promise();//get all data from s3 bucket
        console.log(list);
        
        // await userModel.findOneAndUpdate({ _id: user_id }, { profileImage: imageData.Location, unsigendImageUrl: imageUrl });
        // if (user.unsigendImageUrl) {
        //     const newParams = {
        //         Bucket: process.env.AWS_BUCKET_NAME,
        //         Key: user.unsigendImageUrl
        //     };
        //     await s3.deleteObject(newParams, (error, data) => {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //             console.log('Image delete successfully');
        //         }
        //     });
        // }
        res.json({status:true,message:"User profile update successfully."}) 

    } catch (error) {
        console.log("error", error);
        res.json({status:true,message:"Internal Server Error."})
    }
});

app.listen('3000',()=>{
    console.log("Connected")
});