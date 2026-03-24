let mongoose = require('mongoose');
let categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name khong duoc de trong"],
        unique: true
    },
    slug: {
        type: String,
        unique: true
    },
    image: {
        type: String,
        default: "https://i.imgur.com/QkIa5tT.jpeg"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject:{
        virtuals:true
    }
})

categorySchema.virtual('products', {
    ref: 'product',
    localField: '_id',
    foreignField: 'category'
})
module.exports = new mongoose.model('category', categorySchema)