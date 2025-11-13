import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

import booksRouter from './routes/books.router'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

// app.use('/', (_req, res) => {
//   res.send('Welcome to the Book Management API')
// })
app.use('/livros', booksRouter)

export default app
