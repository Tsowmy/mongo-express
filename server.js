const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3002


const app = express();
app.use(express.static(__dirname)) //for css file (styles will add)

app.use(express.urlencoded({extended:true})) //whatever data enter the user in authentication , data will hit the middleware function  


mongoose.connect('mongodb://127.0.0.1:27017/students') //connecting the database
const db = mongoose.connection
db.once('open',()=>{
    console.log('Mongodb connection successful')
})


const userSchema = new mongoose.Schema({          //html user data
    regd_no:String,
    name:String,
    email:String,
    branch:String
})
const users = mongoose.model("branch_allotment",userSchema) //mongoose is a function called method


app.get('/',(req,res)=>{
    //res.send("sever is working")
    res.sendFile(path.join(__dirname,'form.html'))  // path of html file 
})

app.post('/post',async (req,res)=>{   //user click the submit button,data will post.all the data should be passed object called request body,then we need middleware function
    const { regd_no,name,email,branch } = req.body
    const user = new users({
        regd_no,
        name,
        email,
        branch
   })
   await user.save()
   console.log(user)
   res.send("form submitted successfully")
})


app.listen(port,()=>{
    console.log("server started!..")
})

