const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.register = async (req, res) => {
    try {
        const { name, email, password, street, city, state, country, zip } = req.body;
        if (name == undefined || email == undefined || password == undefined || street == undefined || city == undefined || state == undefined || country == undefined || zip == undefined) {
            return res.status(400).send({ msg: "Some fields are missing" });
        }
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(500).send({ msg: "User already present try loggingin" })
        }
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.send(400).send({ msg: "An error occured" })
            }
            // let newUser=new User({name,email,password:hash,address:{street,city,state,country,zip}});
            // await newUser.save();
            await User.insertMany([{ name, email, password: hash, address: { street, city, state, country, zip } }])
            return res.status(201).send({ msg: "User registered successfully" })
        })

    } catch (error) {
        return res.status(400).send(err.message)
    }
}
exports.login = async (req, res) => {
    try {
        const { password, email } = req.body;
        if (password == undefined || email == undefined) {
            return res.status(400).send({ msg: "some fields are missing" })
        }
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(500).send({ msg: "User not registered or incorrect email" })
        }
        bcrypt.compare(password, userExist.password, (err, result) => {
            if (err) {
                return res.status(400).send({ msg: "wrong credentials", err })
            }
            if (result) {
                let token = jwt.sign({ userId: userExist._id }, process.env.secret, { expiresIn: 60 * 60 });
                return res.status(201).send({ msg: "user loggedin successfully", token })
            }
        })
    } catch (error) {
        return res.status(400).send(err.message)
    }
}
exports.updatePassword = async (req, res) => {
    try {
        let userId=req.params.id;
        let {password}=req.body;
        if(password==undefined){
            return res.send(500).send({msg:"Enter the password"});
        }
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                return res.send(400).send({msg:"Something went wrong"})
            }
            let user=await User.findByIdAndUpdate(userId,{password:hash});
            if(user){
                return res.status(204).send({msg:"password has been updated successfully"})
            }else{
                return res.status(401).send({msg:"something went wrong"})
            }
        })

    } catch (error) {
        return res.status(401).send({msg:"Something went wrong"})
    }
}