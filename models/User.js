const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: "Username is required",
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: "Email is required",
            unique: true,
            match: [/.+@.+\..+/, "Must match an email address!"]
        },
        password: {
            type: String,
            required: true,
        },
        investor_type: {
            type: String,
            // required: true,
        },
        fav_stock: {
            type: String,
            // required: true,
        },
        description: {
            type: String,
            // required: true,
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
userSchema.pre("save", function () {
    this.password = bcrypt.hashSync(this.password,4);
    return this.password

})

const User = model('User', userSchema);
  
module.exports = User;