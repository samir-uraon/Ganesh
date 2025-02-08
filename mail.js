const nodemailer=require("nodemailer")

function mailit(reciveremail,sendername,recode){
const transporter=nodemailer.createTransport({
	host:"smtp.gmail.com",
	//port:587,
	service:"Gmail",
	port: 465,
	secure:true,
	auth:{
					user:"vectorx06@gmail.com",
					pass:"ammw zahv njwp dblo"
	}

})

const info=transporter.sendMail({
	from:"vectorx06@gmail.com",
	to:`${reciveremail}`,
	subject:"Welcome to VectorX Academy!",
	html:`<b><font face='verdana' size='3' color='black'>Dear ${sendername},</font><br><br><font face="monospace" size="3" color="black">Thank you for joining VectorX Academy! We&rsquo;re thrilled to have you on board and excited about the impact you&rsquo;ll make on our students and team.<br><br>Your unique PRO referral code is <b><font color="#16a082">${recode}</font></b> <br><br> See the fee structure.<br><br>We&rsquo;re here to support you every step of the way.<br> Welcome to the team&mdash;let&rsquo;s achieve great things together!<br><br>Best regards,<br><br><font color="gray">Team of VectorX Academy</font></font></b>`,
	attachments:[  {  
		filename: 'PROs.pdf',
		path: __dirname+"/public/PROs poster_2.pdf",
			contentType:'application/pdf'
	}
]
},(err,result)=>{
	if(err){
	
		
	}
	else{
		
		
	}
})
}

module.exports={mailit}