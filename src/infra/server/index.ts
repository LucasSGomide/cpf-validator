import express from 'express'
import { database } from '@infra/database/sqlite/config'

const app = express()
app.use(express.json())

const testJoin = `
    SELECT "order".id, "order".cpf, "order".code, "order".price, orderItem.quantity, orderItem.productId
    FROM "order" INNER JOIN orderItem
    ON "order".id = orderItem.orderId;
`

app.get('/teste', (req, res) => {
    res.send({ message: 'teste' }).json()
    database.all(testJoin, (err, row) => {
        console.log(row)
    })
})

app.listen(3000)
