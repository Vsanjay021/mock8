const { Restaurant } = require("../models/restaurant.model")

exports.addrestaurants = async (req, res) => {
    try {
        const { name, street, city, state, country, zip } = req.body;
        if (name == undefined || street == undefined || city == undefined || state == undefined || country == undefined || zip == undefined) {
            return res.send(500).send({ msg: "Enter all the fields" })
        }
        await Restaurant.insertMany([{ name, address: { street, city, state, country, zip } }]);
        return res.status(201).send({ msg: "Restaurant created successfully" });
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
}
exports.getAllrestaurants = async (req, res) => {
    try {
        const data = await Restaurant.find();
        return res.status(200).send(data)
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
}

exports.getAllrestaurantsById = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await Restaurant.findById(id);
        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
}

exports.getrestaurantsMenu = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await Restaurant.findById(id);
        return res.status(200).send(data.menu)
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
}

exports.addMenu = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, price, image } = req.body;
        const restaurant = await Restaurant.findById(id);
        restaurant.menu.push({ name, description, price, image });
        await restaurant.save();
        return res.status(201).send({ msg: "menu created successfully", restaurant })
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
}
exports.deleteMenu = async (req, res) => {
    try {
        let rid = req.params.id;
        let menuid = req.params.menuid;
        const result = await Restaurant.updateOne({ _id: rid },
            {
                $pull: {
                    menu: {
                        _id: menuid
                    }
                }
            }
        )
        const menu=await Restaurant.findById(rid);
        return res.status(202).send({msg:"Menu with is id is removed",result,menu})
    } catch (error) {
        return res.status(400).send({ msg: error.message });
    }
}