const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./src/routes/userRoutes");
const errorhandle = require("./src/middleware/errorhandle")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/", (req,res) => {
    
})
app.use(errorhandle)


app.listen(process.env.PORT,process.env.HOST,()=>{
    console.log("hello");
})

module.exports = app;
