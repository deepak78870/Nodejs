 const app = require('./server/server');

app.get('/', (req, res) => {
    res.status(200).send("Welcome")
})

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server Started On http://localhost:${process.env.PORT}`);
})
empty = function empty(obj){
	for(var key in obj){
		if(Object.prototype.hasOwnProperty.call(obj,key)){
			return true;
		}else{
			return false;
		}
	}
}