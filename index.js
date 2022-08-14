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
mongoose.connect("mongodb://localhost:27017/tododb",{useNewUrlParser:true});

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
    console.log(posts)
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("Server started  at port 3000");
})