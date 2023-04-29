const mongoose = require("mongoose");

const schema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
        items: [{
            name: {
                type:String,
                required:true
            },
            price: {
                type:Number,
                required:true
            },
            quantity: {
                type:Number,
                required:true,
            }
        }],
        totalPrice: {
            type:Number
        },
        deliveryAddress: {
            street: String,
            city: String,
            state: String,
            country: String,
            zip: String
        },
        status: {
            type:String,
            enum:["placed","preparing","on the way","delivered"]
        } // e.g, "placed", "preparing", "on the way", "delivered"
    }
)

const Order=mongoose.model("order",schema);

module.exports = {
    Order
};
