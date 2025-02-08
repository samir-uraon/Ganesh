const mongoose =require("mongoose");

function mongomodel(){
let	mongo_schema = new mongoose.Schema({
			name:{type:String,require:true},
			email:{type:String,require:true},
			password:{type:String,require:true},
			referral:	{type:String,require:true}
	})
	let mongo_model=mongoose.model("test1",mongo_schema)
	return mongo_model
}



module.exports={mongomodel}