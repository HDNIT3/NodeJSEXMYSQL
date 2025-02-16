const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./src/routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/", (req,res) => {
    
})

app.listen(3000,"localhost",()=>{
    console.log("hello");
})

module.exports = app;
