const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/user.route");
const { doctorRouter } = require("./routes/doctor.route");
const { auth } = require("./middleware/auth");


const app = express();

//middleware
app.use(cors());
app.use(express.json());





//routes
app.get("/",(req,res)=>{
    res.status(200).send("Welcome to Doctor managment app backend Data!")
})


app.use("/user",userRouter);
app.use("/doctor",auth,doctorRouter);


app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log(`Connected to db!`)
    } catch (error) {
        console.log(`Unable to connect db!`);
        console.log(error.message)
    }
    console.log(`App is runnig on the port ${process.env.PORT}!`)
})