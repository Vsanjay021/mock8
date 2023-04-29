const mongoose=require("mongoose");

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        image: String
    }]
})

const Restaurant=mongoose.model("restaurant",schema);

module.exports = {
    Restaurant
};
