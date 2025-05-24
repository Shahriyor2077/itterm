
const {Schema, model}=require("mongoose");

const authorSocialSchema=new Schema({
    author_id: {type: String, required: true},
    social_id: {type: String, required: true},
    social_link: {type: String, required: true}
})
module.exports=model("authorSocial", authorSocialSchema)
