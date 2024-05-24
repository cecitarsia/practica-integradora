import { Router } from 'express';
const router = Router()
import ProductManager from '../managers/ProductManager.js'
import productModel from '../models/product.model.js';
const productManager = new ProductManager()


// Traer todos los productos
router.get("/", async (req,res) => {
    const products = await productManager.getProducts()
    res.send({ result: "success", payload: products })

})  

// Traer un producto por ID
router.get("/:pid", async (req,res) => {
    try {
        let pid = parseInt(req.params.pid);
        const productById = await productManager.getProductById(pid);
        if (productById) {
            res.status(200).json(productById);
        } 
    } catch (error) {
        res.status(404).json({ message: "Producto no encontrado." });
    }
})

// Agregar un producto
router.post("/", async (req,res) => {
    const { title, description, code, price, status, stock, category, thumbnail } = req.body
    // Esta validacion no me funciona en el ProductManager
    if (!title || !description || !price || !code || !stock || !status || !category || !thumbnail) {
        res.send({ status: "error", error: "Faltan datos." })
    }
    const result = await productManager.addProduct(title, description, code, price, status, stock, category, thumbnail);
    res.send({ result: "success", payload: result });
})

// Editar un producto por ID
router.put("/:pid", async (req,res) => {    
    let { pid } = req.params
    let productToUpdate = req.body
    if (!productToUpdate.title || !productToUpdate.description || !productToUpdate.price || !productToUpdate.code || !productToUpdate.stock || !productToUpdate.category || !productToUpdate.thumbnail) {
        res.send( { status: "error", error: "Parámetros no definidos."})
    }
    let result = await productModel.updateOne({_id:pid}, productToUpdate)
    res.send({ result: "success", payload: result })
})

// Eliminar un producto por ID
router.delete("/:pid", async (req,res) => {
    let { pid } = req.params
    let result = await productModel.deleteOne({_id:pid})
    res.send({ result: "success", payload: result })
})


export default router