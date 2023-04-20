const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    user_name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
        match:
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("userData", registerSchema);