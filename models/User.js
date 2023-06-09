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
        profile_pic: {
            type: String,
            default:'https://res.cloudinary.com/dykifpnqi/image/upload/v1686335476/blank-profile-picture-ga0d2566f2_1280_ae4a5i.png'
        },
        investor_type: {
            type: String,
            default: ''
            // required: true,
        },
        fav_stock: {
            type: String,
            default:''
            // required: true,
        },
        description: {
            type: String,
            // required: true,
            default:'',
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