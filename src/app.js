    // IMPORTS   
    import express from 'express'
    import handlebars from 'express-handlebars'
    import mongoose from 'mongoose'
    import __dirname from './utils.js'
    import { Server } from 'socket.io'
    import viewsRouter from './routes/views.router.js'
    import productsRouter from './routes/products.router.js'
    import ProductManager from './dao/db/managers/ProductManager.js'
    
    const app = express()
    const PORT = 8080
    const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))
    const socketServer = new Server(httpServer) 

    const productManager = new ProductManager()

    app.use(express.json())
    app.use(express.urlencoded({extended:true}))

    mongoose.connect("mongodb+srv://ceciliatarsia:cvMYcDEh8AFWoIYQ@cluster0.t9jz5hn.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {console.log("Conectado a la DB.")})
    .catch(error => console.error("Error en la conexión.", error))

    app.engine('handlebars', handlebars.engine())
    app.set('views', __dirname + '/views')
    app.set('view engine', 'handlebars')
    app.use(express.static(__dirname + '/public'))

    app.use("/api/products", productsRouter)
    // app.use("/api/carts", cartsRouter)
    app.use("/", viewsRouter)

    socketServer.on('connection', socket => {
        console.log("Nuevo cliente conectado")   

        socket.on('message', data => {
            console.log(data)
        })
    })

    