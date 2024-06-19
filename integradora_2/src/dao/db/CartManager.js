import cartModel from "../models/cart.model.js"

class CartManager {

    // Agrega un carrito vacio a la colección
    async addCart() {
        try {
            const cart = { products: [] };
            let result = await cartModel.create(cart)
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // Trae todos los carritos
    async getCarts() {
        try {
            let carts = await cartModel.find()
            return carts;
        } catch (error) {
            console.log(error)
        }
    }


    // Trae un carrito por ID
    async getCartById(cid) {

        try {
            let result = await cartModel.findOne({ _id: cid }).populate("products.product");
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    // Agrega un producto a un carrito
    async addProductToCart(cid, pid) {
        // Esto es porque desde el botón no envío ningun cid, entonces se lo asigno acá
        if (cid === null) {
            cid = '665780c00631c45cd5ec1dc4'

        } else {

            try {
                const cart = await cartModel.findOne({ _id: cid });
                const productIndex = cart.products.findIndex(product => product.product.equals(pid));

                if (productIndex !== -1) {
                    cart.products[productIndex].quantity += 1;
                } else {
                    cart.products.push({ product: pid, quantity: 1 });
                }
                await cart.save()
                return cart

            } catch (error) {
                throw new Error('Error al agregar el producto al carrito: ' + error.message);
            }
        }
    }

    // Elimina un carrito
    async deleteCart(cid) {
        try {
            let result = await cartModel.deleteOne({ _id: cid })
            return result;
        } catch (error) {
            console.log(error)
        }
    }


    //Eliminar del carrito el producto seleccionado. >> NO FUNCIONA
    async deleteProductFromCart(cid, pid) {
        try {
            const cart = await cartModel.findOne({ _id: cid });

            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            //const productIndex = cart.products.findIndex(product => product.product.equals(pid));
            const productIndex = cart.products.indexOf(product => product.id === pid);
            console.log(productIndex)

            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }

            cart.products.splice(productIndex, 1)

            await cart.save()
            return cart

        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
            return { error: 'Error al eliminar el producto del carrito' };
        }
    }


    // deberá actualizar la cantidad de un producto en el carrito.
    async addProductQty(cid, pid, qty) {
        try {
            const cart = await cartModel.findOne({ _id: cid });
            const productIndex = cart.products.findIndex(product => product.product.equals(pid));

            if (productIndex !== -1) {
                cart.products[productIndex].quantity = qty;
                await cart.save()
            } 
            return cart

        } catch (error) {
            throw new Error('Error al editar el producto: ' + error.message);
        }
    }

    // deberá eliminar los products del carrito seleccionado.
    async deleteProductsInCart(cid) {
        try {
            const result = await cartModel.updateOne({ _id: cid }, { $set: { products: [] } });
            return result;
        } catch (error) {
            console.error('Error al eliminar los productos del carrito:', error);
        }
    }

}

export default CartManager