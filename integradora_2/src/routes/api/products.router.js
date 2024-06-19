import { Router } from 'express';
import ProductManager from '../../dao/db/ProductManager.js'
const router = Router()
const productManager = new ProductManager()


// Traer todos los productos
router.get("/", async (req, res) => {
    const query = req.query
    const products = await productManager.getProducts(query)
    res.send({ result: "success", payload: products })

})

// Traer un producto por ID
router.get("/:pid", async (req, res) => {
    let pid = req.params.pid
    const product = await productManager.getProductById(pid);
    res.send({ result: "success", payload: product })
})

// Agregar un producto
router.post("/", async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnail } = req.body
    // Esta validacion no me funciona en el ProductManager
    if (!title || !description || !price || !code || !stock || !status || !category || !thumbnail) {
        res.send({ status: "error", error: "Faltan datos." })
    }
    const result = await productManager.addProduct(title, description, code, price, status, stock, category, thumbnail);
    res.send({ result: "success", payload: result });
})

// Editar un producto por ID
router.put("/:pid", async (req, res) => {
    let pid = req.params.pid
    let productToUpdate = req.body
    if (!productToUpdate.title || !productToUpdate.description || !productToUpdate.price || !productToUpdate.code || !productToUpdate.stock || !productToUpdate.category || !productToUpdate.thumbnail) {
        res.send({  status: "error", error: "Parámetros no definidos." })
    }
    const result = await productManager.updateProduct(pid,productToUpdate);
    res.send({ result: "success", payload: result })
})

// Eliminar un producto por ID 
router.delete("/:pid", async (req, res) => {
    let { pid } = req.params
    let result = await productManager.deleteProduct(pid)
    res.send({ result: "success", payload: result })

})


export default router