import productModel from "../models/product.model.js"

class ProductManager {

    async addProduct(title, description, code, price, status, stock, category, thumbnail) {
        try {
            const productNotValid = !title || !description || !price || !code || !stock || !status || !category

            if (productNotValid) {
                console.error("Faltan datos.")
            } else {
                let result = await productModel.create({title, description, code, price, status, stock, category, thumbnail})
                return result
            }

        } catch (error) {
            console.error("Error al agregar producto", error);
        }
    }

    async getProducts() {
        try {
            let products = await productModel.find()
            return products
        } catch (error) {
            console.log(error)
        }
    }


    async getProductById(id) {
        try {
            const products = await this.getProducts()
            const productFound = products.find((product) => product.id === id)
            if (!productFound) {
                return 'El producto buscado no existe'
            } else {
                return productFound;
            }
        } catch (error) {
            console.error("ID de producto no encontrado", error);
        }
    }

    async updateProduct(id, value) {
        try {
            const products = await this.getProducts()


        } catch (error) {
            console.error("Error al actualizar el producto", error);
        }
    }


    async deleteProduct(id) {

        try {
			const products = await this.readProducts ();
			const index = products.findIndex ( product => product.id === id );

			if (index !== -1 ) {
				products.splice (index, 1)
				await fs.writeFile ( this.path, JSON.stringify(products, null, 2));

			} else {
				console.log('Producto no encontrado.');
			}

			return "El producto ha sido eliminado"

        } catch (error) {   
            console.log('No se pudo borrar el producto', error)  
        }
    }
}


export default ProductManager