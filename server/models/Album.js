const {Schema, model} = require("mongoose")

const schema = new Schema({
    host : {type: String},
    data: {type: String, required:true},
    name : {type: String, required:true},
    desc : {type: String, required:false},
    logo : {type: String, required:true},
    songs : {type: String, required:false},
    tags : {type: Object, required:false},
    status : {type: Boolean, required:true}
})

module.exports = model("Album", schema)