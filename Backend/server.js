const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const addQuestion= require("./Routes/Question.js");
const path = require("path");

dotenv.config();


app.use(express.json());
app.use(cors());



// const dotenv = require("./");


app.get("/" ,(req,res)=>{
    res.send("API is running");
})

// dotenv.config();
connectDB();

app.use('/api/', addQuestion);

// app.get("/question",(req,res)=>{
//     res.send(questions);
// })


const PORT = process.env.PORT || 5000
app.listen(PORT ,console.log("Server started on PORT", PORT))
