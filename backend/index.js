import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'



dotenv.config()
const PORT = process.env.PORT|| 4000

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
connectDB()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send('AT_dqjoaPQFKGXrpBGSKud5nKAUgWQptLeRJt6a9TlRgw91oRuPFrl5iqKgwov47PFWpRQN7ilkjTqpA')
)


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})