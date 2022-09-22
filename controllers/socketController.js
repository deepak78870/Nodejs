const path   =  require('path');
exports.socket_listen = async (req,res)=>{
  
    res.sendFile(path.join(__dirname, "../public/index.html"))
}

exports.login_page  =  async(req,res)=>{
    res.sendFile(path.join(__dirname, "../public/loginPage.html"))
}