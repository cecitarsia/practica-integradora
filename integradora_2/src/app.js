// IMPORTS   
import express from 'express'
import handlebars from 'express-handlebars'
import dotenv from 'dotenv'
import __dirname from './utils.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import mongoose from './config/database.js';
import MongoStore from 'connect-mongo'
import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/api/products.router.js'
import cartsRouter from './routes/api/carts.router.js'
import sessionsRouter from './routes/api/sessions.router.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT
const httpServer = app.listen(PORT, console.log(`Server running on port ${PORT}`))



app.use(cookieParser())
app.use(session({
    //ttl: Time To Live = Vida de la sesión
    //retries: # de veces que el servidor tratará de leer el archivo
    //path: ruta donde vivirá la carpeta para almacenar las sesiones
    // store: new fileStorage({path:'./sessions',ttl:100,retries:0}),
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URL,
        ttl:15,
    }),
    secret: "secretkey",
    resave:false,
    saveUninitialized:false
}))


// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

// Rutas
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)
app.use("/api/sessions", sessionsRouter)



