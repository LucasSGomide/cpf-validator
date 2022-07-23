import 'reflect-metadata'
import express from 'express'
import { createDatabase } from '@infra/database/config'
import { ProductEntity } from '@infra/database/entities/ProductEntity'

const app = express()
app.use(express.json())

app.get('/createOrder', async (req, res) => {
    const connection = await createDatabase()
    const repository = connection.getRepository(ProductEntity)
    const products = await repository.find()
    res.send({ data: products }).json()
    connection.destroy()
})

app.listen(3000)
