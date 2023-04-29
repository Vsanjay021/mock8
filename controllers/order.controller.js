const { Order } = require("../models/order.model");
const { Restaurant } = require("../models/restaurant.model");

exports.order = async (req, res) => {
    try {
        const userId = req.userId;
        const { rid, name, price, quantity, totalprice, deliveryAddress } = req.body;
        const restaurant = await Restaurant.findById(rid);
        if (!restaurant) {
            return res.status(500).send({ "msg": "Invalid data" });
        }
        const newOrder = await Order.insertMany([
            {
                user: userId,
                restaurant: rid,
                totalPrice: quantity * price,
                deliveryAddress,
                status: "preparing"
            }
        ])
        newOrder[0].items.push({ name, price, quantity });
        await newOrder[0].save();
        return res.status(201).send({ msg: "Order created successfully", newOrder })
    } catch (error) {
        return res.status(201).send({ msg: error.message });
    }
}
exports.getOrderById = async (req, res) => {
    try {
        let id = req.params.id;
        let userId = req.userId;
        let order = await Order.findById({ _id: id, user: userId });
        return res.status(200).send(order);
    } catch (error) {
        return res.status(201).send({ msg: error.message });
    }
}
exports.updateOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate({ _id: id }, { status });
        return res.status(204).send({ msg: "Status has been updated" });
    } catch (error) {
        return res.status(201).send({ msg: error.message });
    }
}

exports.getAllorder = async (req, res) => {
    try {
        let order=await Order.find();
        return res.status(200).send(order)
    } catch (error) {
        return res.status(201).send({ msg: error.message });
    }
}