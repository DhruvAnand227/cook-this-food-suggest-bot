import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    city : {
        type: String,
        required: true
    },

    cuisines: {
        type: [String],
        required: true
    },

    food_preference: {
        type: String,
        enum: ["veg", "non-veg", "vegan"],
        required: true
    },

    ingredients: {
        type: [String],
        required: true
    }
});

const User = mongoose.model("User", userSchema);

export default User;