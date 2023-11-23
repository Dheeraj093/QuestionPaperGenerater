const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();


app.use(express.json());
app.use(cors());


const  addQuestion= require("./Routes/Question.js");
// const dotenv = require("./");
app.listen(5000,console.log("Server started on PORT 5000"))

app.get("/" ,(req,res)=>{
    res.send("API is running");
})

// dotenv.config();
connectDB();

app.use('/api/', addQuestion);

// app.get("/question",(req,res)=>{
//     res.send(questions);
// })