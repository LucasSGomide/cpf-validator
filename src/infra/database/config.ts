import { DataSource } from 'typeorm'
import { ProductEntity } from './entities/ProductEntity'

function createDataSource(): DataSource {
    return new DataSource({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [`${__dirname}/entities/*{.js,.ts}`],
        synchronize: true,
        logging: false,
    })
}

async function seedDatabase(connection: DataSource): Promise<void> {
    const productSeed = [
        {
            name: 'Guitarra',
            description: 'Guitarra fender modelo XYZ',
            price: 1000,
            width: 100,
            height: 30,
            length: 10,
            weight: 3,
        },
        {
            name: 'Amplificador',
            description: 'Amplificador modelo XYZ',
            price: 5000,
            width: 50,
            height: 50,
            length: 50,
            weight: 20,
        },
        {
            name: 'Cabo',
            description: 'Cabo material XYZ',
            price: 30,
            width: 10,
            height: 10,
            length: 10,
            weight: 1,
        },
    ]
    const productRepository = connection.getRepository(ProductEntity)
    await productRepository.insert(productSeed)
}

export async function createDatabase(): Promise<DataSource> {
    const dataSource = createDataSource()
    const connection = await dataSource.initialize()
    await seedDatabase(connection)
    return connection
}
