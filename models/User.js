const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    isAdmin: {
        type: Boolean, // mtlb admin true h ya nh isiliye usko boolean valur diye h
        default: false // agr koi user h to default me wo admin nh rhega unless specified
    },
    // createdAt:Date.now() // yeh phle use krte the ab isko replace kr diye h timestamp se

},{timestamps:true}) //it will tell when the user is created and when updated.

module.exports = mongoose.model('User', UserSchema)