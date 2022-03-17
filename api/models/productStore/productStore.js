import mongoose from 'mongoose';

const storeSchema = mongoose.Schema({
    id: Number,
    name: String,
    productType: String,
    price: Number,
    rating: Number,
    image: String,
    description: String
})

export default mongoose.model("productStore", storeSchema)