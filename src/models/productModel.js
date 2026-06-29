import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true, 
        },
        brand: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: false,
        },
        category: {
            type: String,
            enum: ['Electronics','Clothes', 'Others'],
            default: 'Others',
        },
    },
    {
        timestamps: true
    }
);

const ProductModel = mongoose.model('Product', productSchema);
export default ProductModel;