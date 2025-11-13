import { Router } from 'express'
import { getBooks, postBook, deleteBook } from '../controller/books.controller'
const router = Router()

router.get('/', getBooks)

router.post('/', postBook)

router.delete('/:id', deleteBook)

export default router