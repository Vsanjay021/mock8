const express=require("express");
const { order,getOrderById, updateOrderStatus, getAllorder } = require("../controllers/order.controller");
const { authentication } = require("../middlewares/auth");

const orderRouter=express.Router();

orderRouter.post("/orders",authentication,order)
orderRouter.get("/orders/:id",authentication,getOrderById)
orderRouter.put("/orders/:id",authentication,updateOrderStatus);
orderRouter.get("/orders",authentication,getAllorder)

module.exports = {
    orderRouter
};
