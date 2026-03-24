let mongoose = require('mongoose');
let productSchema = mongoose.Schema({
    sku: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    },
    description:{
        type: String,
        default:"",
    },
    images:{
        type:[String],
        default:"https://i.imgur.com/cHddUCu.jpeg"
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    }
},{
    timestamps:true
})
module.exports = new mongoose.model('product',productSchema)