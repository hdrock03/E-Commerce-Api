const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    products: [
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1 // when we select any product its default number is 1
            }
        }
    ],
    amount:{type:Number, required:true},
    address:{type:Object, required:true}, // address ko object diye h qki adress me line 1,2,state,pin rhta h 
    status: {type:String, default: "pending"}
    
},{timestamps:true}) 

module.exports = mongoose.model('Order', OrderSchema)