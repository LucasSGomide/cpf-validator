import sqlite3 from 'sqlite3'
import { makeDatabase } from './DatabaseFactory'

export const database = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message)
        throw err
    }
    console.log('SQLite database connected...')
})

makeDatabase(database)
