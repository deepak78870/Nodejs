const get_detailsData = require('../data/getdetailsData');
 exports.get_details = async()=>{
    return await get_detailsData.get_details();
 }