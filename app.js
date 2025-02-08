const express=require("express")
const dotenv =require("dotenv")
const bodyParser=require("body-parser")
const monogoose=require("mongoose")
const cors=require("cors");
const {mongomodel} =require("./mongo.js")
const {mailit}=require("./mail.js")


var app=express()
dotenv.config({path:"./.env"})
app.use(cors())
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

monogoose.connect(process.env.mongo_uri).then((res)=>{console.log("connect");
})
.catch((err)=>{console.log(err);
})


let mongo_model=mongomodel()





app.get("/",(req,res)=>{
 res.send("hello")
})



app.get("/contact",(req,res)=>{
	res.sendFile(__dirname+"/public/pages/contact.html")
})


app.post("/prodata",async (req,res)=>{

let {password,email,name,referelCode}=req.body

if(password && email && name && referelCode){	
	
	let newperson=new mongo_model({"name":name,"email":email,"password":password,"referrel":referelCode})

	if(!newperson){
		res.status(404).json({staus:"failed"})
	}
 
	let data2=await newperson.save()
	

	mailit(email,name.split(" ")[0],data2["referrel"])
 res.status(200).json({staus:"success","token":data2["_id"]})
	
}else{
res.status(404).json({staus:"failed"})}
})

app.post("/prolog",async(req,res)=>{
let datas=req.body
let userpassword=datas["password"]
let useemail=datas["email"]

mongo_model.findOne({ email: useemail }).then((user) =>{
	if (!user) {
			 res.status(404).json({status:"failed"});
	}
	
	
	else if(userpassword==user["password"]){
		let data=user["_id"]
res.status(200).json({status:"success",token:data})
	}else{
		res.status(404).json({status:"failed"});
	}

})
.catch((err)=>{res.status(404).json({status:"failed"})})
})

app.get("/take",async (req,res)=>{

let sender=req.query
//console.log(sender);

let uke=Object.keys(sender) 
let ukeyvalue=sender[uke]
let details=""

if(uke=="id"){
 details=await mongo_model.findById(ukeyvalue)
}
else if(uke=="name"){
	details=await mongo_model.findOne({name:ukeyvalue})
}
else if(uke=="email"){
	details=await mongo_model.findOne({email:ukeyvalue})
}


if(details){
data={}
data.name=details.name
data.email=details.email
data.referrel=details.referrel
	res.status(200).json(data)
}
else{
res.status(400).json({"name":"None","email":"None","referrel":"None"})}
})

//app.get("/sendEmailnow",(req,res)=>{
//	mailit("samiruraon03@gmail.com","samir uraon".split(" ")[0],"12345")
//	res.send("ok all clear")
//})

app.use((req,res)=>{
	res.sendFile(__dirname+"/public/pages/404page.html")
})



app.listen(process.env.port,(err)=>{
	if (err) throw console.log("port error");
 console.log("server start....");

})