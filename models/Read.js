const { Schema, model } = require('mongoose');

// Schema to create User model
const readSchema = new Schema(
    {
        text: {
            type: String,
            unique: true,
        },
    },
    {
        toJson: {
            virtuals: true,
        },
        id: false,
    }
);

const Read = model('Read', readSchema);
  
module.exports = Read;