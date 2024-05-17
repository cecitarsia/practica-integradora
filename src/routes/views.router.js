import { Router } from 'express';
const router = Router()
import ProductManager from '../managers/productManager.js'

const productManager = new ProductManager()


// Trae la vista de todos los productos
router.get("/",async(req,res)=>{
    const products = await productManager.getProducts()
    res.render("index",{products})
})

// Trae la vista del formulario para cargar productos
router.get('/realtimeproducts', (req,res) => {
    res.render('realTimeProducts', {})
})



export default router