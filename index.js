const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./router/user.router");
const { restaurantRouter } = require("./router/restaurant.route");
const { orderRouter } = require("./router/order.router");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors({
    origin: "*"
}))


app.get("/",(req,res)=>{
    res.send({msg:"Welcome to mock8 API"})
})
app.use("/api",userRouter);
app.use("/api",restaurantRouter);
app.use("/api",orderRouter)

let port = process.env.port;

app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`listening at port ${port}...`)
})