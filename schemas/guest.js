const {Schema, model} = require('mongoose');

const guestSchema=new Schema({
    guest_ip: {type: String, required: true},
    guest_os: {type: String},
    guest_device: {type: String},
    guest_browser: {type: String},
    guest_reg_date :{type: String},
})

module.exports=model("guest", guestSchema)