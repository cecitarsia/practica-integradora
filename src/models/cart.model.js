import mongoose from "mongoose"

const cartCollection = "Carts"

const cartSchema = new mongoose.Schema({
    products: {
      type:[
        {
          id: {type: String},
          quantity: {type: Number},
        },
      ]
    }
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel