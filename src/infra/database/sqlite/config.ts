import sqlite3 from 'sqlite3'
import { makeDatabaseTables } from './DatabaseFactory'

export const database = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message)
        throw err
    }
    console.log('SQLite database connected...')
})

makeDatabaseTables(database)
