const express = require("express");
const { register, login, updatePassword } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/register", register)
userRouter.post("/login", login);
userRouter.patch("/user/:id/reset",updatePassword);
userRouter.put("/user/:id/reset",updatePassword);

module.exports = {
    userRouter
};
