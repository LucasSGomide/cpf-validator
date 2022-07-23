import { DataSource } from 'typeorm'

export function CreateDataSource(): DataSource {
    return new DataSource({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [`${__dirname}/entities/*{.js,.ts}`],
        synchronize: true,
        logging: false,
    })
}
