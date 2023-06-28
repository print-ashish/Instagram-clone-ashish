 

const express = require("express");
const app = express();
const PORT = process.env.port || 8000;
const data = require("./data");
const cors = require("cors");
require("./models/model")
require("./models/post")
const path = require("path")
//mongodb connection
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://as727243:ashish727244@cluster0.c3dhhno.mongodb.net/?retryWrites=true&w=majority")

mongoose.connection.on("connected",()=>
{
    console.log("databse connected");
})
mongoose.connection.on("error",()=>
{
    console.log("error connecting to database ");
})


app.use(express.json())
app.use(cors());
app.use(require("./routes/auth"))

//serving frontend

app.use(express.static(path.join(__dirname,"./instaclone/build")))
app.get("*",(req,res)=>
{
    res.sendFile(path.join(__dirname,"/instaclone/build/index.html"),function (err){res.status(500).send(err)})
})

app.listen(PORT,()=>
{
    console.log(`server started at + ${PORT}`)
})