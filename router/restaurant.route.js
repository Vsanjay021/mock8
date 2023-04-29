const express=require("express");
const { addrestaurants, getAllrestaurants, getAllrestaurantsById, getrestaurantsMenu, addMenu, deleteMenu } = require("../controllers/restaurant.controller");

const restaurantRouter=express.Router();

restaurantRouter.post("/restaurants/add",addrestaurants)
restaurantRouter.get("/restaurants",getAllrestaurants)
restaurantRouter.get("/restaurants/:id",getAllrestaurantsById)
restaurantRouter.get("/restaurants/:id/menu",getrestaurantsMenu)
restaurantRouter.post("/restaurants/:id/menu",addMenu);
restaurantRouter.put("/restaurants/:id/menu",addMenu);
restaurantRouter.delete("/restaurants/:id/menu/:menuid",deleteMenu)

module.exports = {
    restaurantRouter
};
