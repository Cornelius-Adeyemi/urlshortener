require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const UrlModel = require("./schema");
const myRouter = require("./direct")



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;




db.on("error", function(err){
   console.log(err)
})



db.once("open", function(){
    console.log("connection with the data base established");
});


app.get("/",function(req,res){

     res.sendFile(__dirname + "/index.html")
})

app.use("/api/shorturl",myRouter )



const PORT = process.env.PORT || 3030;


app.listen(parseInt(PORT), ()=>{
    console.log("The server is live")
})
