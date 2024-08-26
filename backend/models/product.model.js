import e from 'express';
import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
