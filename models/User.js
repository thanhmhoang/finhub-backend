const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, "Must match an email address!"]
        },
        password: {
            type: String,
            required: true,
            hashed: true,
        },
        investor_type: {
            type: String,
            required: true,
        },
        fav_stock: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 280,
        },
        stocks: [
            {
                type: Schema.Types.ObjectId,
                ref: "Stock",
            },
        ],
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('User', userSchema);
  
module.exports = User;