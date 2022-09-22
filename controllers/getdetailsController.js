const get_detailsService = require('../services/getdetailsService');
exports.get_details =[
   async (req,res)=>{
      await get_detailsService.get_details().then(data=>{
         res.json({status:true,message:"Data fetched",result:data})
      }).catch(err=>{
         res.json({status:false,message:"Data Not fetched",result:err.message})
      })
   }
]