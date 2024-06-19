import productModel from "../models/product.model.js"

class ProductManager {

    async addProduct(title, description, code, price, status, stock, category, thumbnail) {
        try {
            const productNotValid = !title || !description || !price || !code || !stock || !status || !category

            if (productNotValid) {
                console.error("Faltan datos.")
            } else {
                let result = await productModel.create({ title, description, code, price, status, stock, category, thumbnail })
                return result
            }

        } catch (error) {
            console.error("Error al agregar producto", error);
        }
    }

    // Trae los productos con query o valores por defecto
    async getProducts(query) {
        try {

            let { limit = 10, page = 1, filter, sort } = query;

            let sortOptions = {};
            if (sort) {
                sortOptions.price = parseInt(sort);
            }

            let filterOptions = {};
            if (filter && filter.category) {
                filterOptions.category = filter.category;
            }

            let options = {
                limit: parseInt(limit) || 10,
                page: parseInt(page) || 1,
                sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
                lean: true
            };
            let products = await productModel.paginate(filterOptions, options);
            return products;

        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    }


    // Traer un producto por ID
    async getProductById(pid) {
        try {
            const product = await productModel.findById(String(pid));
            return product
        } catch (error) {
            console.error("Producto no encontrado", error);
        }
    }

    // Editar un producto por ID
    async updateProduct(id, productToUpdate) {
        try {
            let result = await productModel.updateOne({ _id: id }, productToUpdate);
            return result;
        } catch (error) {
            console.log('Error al actualizar el producto', error);
        }
    }

    // Eliminar un producto por ID
    async deleteProduct(pid) {
        try {
            let result = await productModel.deleteOne({ _id: pid })
            return result;
        } catch (error) {
            console.log(error)
        }
    }


}

export default ProductManager