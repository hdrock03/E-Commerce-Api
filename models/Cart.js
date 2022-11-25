const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
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
    ]
    
},{timestamps:true}) 

module.exports = mongoose.model('Cart', CartSchema)