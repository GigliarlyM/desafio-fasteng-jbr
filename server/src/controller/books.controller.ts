import { Request, Response } from 'express'
import { Book } from '../model/book.type'
import database from '../config/db'
import { ObjectId } from 'mongodb'

export const getBooks = async (_req: Request, res: Response) => {
    try {
        const booksFinded = await database.collection.find().toArray()

        res.status(200).send(booksFinded)
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error })
    }
}

export const postBook = async (req: Request, res: Response) => {
    try {
        const bookBody = req.body as Book

        const newBook = await database.collection.insertOne(bookBody)

        res.status(201).send(newBook)
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error })
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.id

        const result = await database.collection.deleteOne({ _id: new ObjectId(bookId) })

        const status = result.deletedCount === 1 ? 200 : 404

        res.status(status)
        res.send({
            deletedCount: result.deletedCount
        })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error })
    }
}
