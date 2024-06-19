import { Router } from 'express'
import CartManager from '../../dao/db/CartManager.js'

const router = Router()
const cartManager = new CartManager()


// Agrega un carrito vacio
router.post("/", async (req, res) => {
    const result = await cartManager.addCart();
    res.send({ result: "success", payload: result });
})

// Traer todos los carritos
router.get("/", async (req, res) => {
    const result = await cartManager.getCarts()
    res.send({ result: "success", payload: result })
})

// Traer un carrito por ID
router.get("/:cid", async (req, res) => {
    let cid = req.params.cid
    const result = await cartManager.getCartById(cid);
    res.send({ result: "success", payload: result })
})


// Agrega un producto a un carrito
router.post("/:cid/products/:pid", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    const result = await cartManager.addProductToCart(cid, pid);
    res.send({ result: "success", payload: result });
})


// Elimina del carrito el producto seleccionado >> NO FUNCIONA
router.delete("/:cid/products/:pid ", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    console.log(cid, pid)
    const result = await cartManager.deleteProductFromCart(cid, pid);
    console.log(result)
    res.send({ result: "success", payload: result });
})


// deberá actualizar la cantidad de un producto en el carrito.
router.put("/:cid/products/:pid", async (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    let qty = req.body.quantity
    const result = await cartManager.addProductQty(cid, pid, qty);
    res.send({ result: "success", payload: result });
})

// deberá eliminar los products del carrito seleccionado.
router.delete("/:cid", async (req, res) => {
    let cid = req.params.cid;
    const result = await cartManager.deleteProductsInCart(cid);
    res.send({ result: "success", payload: result });
})



export default router