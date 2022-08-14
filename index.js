const express=require("express");
const app=express();
const path =require("path");
var ejs=require('ejs')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.set('public', path.join(__dirname, 'public'));
app.use(express.static("public"))
const mongoose=require("mongoose")
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}))
mongoose.connect("mongodb+srv://suyash5802:rashmi28march@cluster0.phaloec.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true});
const port=process.env.PORT||5000
let todoschema=new mongoose.Schema({
    todos:String
})
let  post= mongoose.model("post",todoschema);
let posts=[]
app.get("/",(req,res)=>{
    res.render("home",{
        abc:posts
    })
})
app.post("/",(req,res)=>{
    const postss=new post({
        todos:req.body.data
    })
    postss.save();
    posts.push(postss )
    res.redirect("/");
})

app.listen(port,()=>{
    console.log("Server started  at port 3000");
})