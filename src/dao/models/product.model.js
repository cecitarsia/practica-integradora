import mongoose from 'mongoose'

//Creo la coleccion con el nombre

const productCollection = "Products"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 200 },
    code: { type: String, required: true, max: 50 },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, max: 50 },
    thumbnail: { type: String, required: true, max: 100 }
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel
