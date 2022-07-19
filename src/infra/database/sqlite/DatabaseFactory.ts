import { Database } from 'sqlite3'

export function makeDatabaseTables(database: Database) {
    const SQL_PRODUCT_CREATE = `
    CREATE TABLE product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        price NUM,
        length NUM, 
        height NUM,
        width NUM,
        weight NUM);
    `
    const SQL_PRODUCT_SEED = `
    INSERT INTO product (name, description, price, length, height, width, weight)
        VALUES ('Whey Protein', 'Whey protein concentrado 80%', 90, 15, 30, 15, 1),
               ('Creatine', 'Monohidrate Creatine', 60, 10, 15, 10, 0.3),
               ('Vitamins', 'Complex viitamines for athletes', 30, 10, 10, 10, 0.2);
    `
    const SQL_DISCOUNT_COUPON_CREATE = `
    CREATE TABLE coupon (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name INTEGER NOT NULL,
        percentage INTEGER NOT NULL,
        expire_date DATETIME NOT NULL);
    `
    const SQL_ORDER_CREATE = `
    CREATE TABLE "order" (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coupon_id INTEGER,
        request_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        cpf TEXT NOT NULL,
        code NUM NOT NULL,
        price NUM NOT NULL,
        freight_price NUM NULL,
        FOREIGN KEY(coupon_id) REFERENCES coupon(id));
    `
    const SQL_ORDER_ITEM_CREATE = `
    CREATE TABLE orderItem (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        order_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY(product_id) REFERENCES product(id),
        FOREIGN KEY(order_id) REFERENCES 'order'(id));
    `

    database.exec(
        `
        ${SQL_PRODUCT_CREATE}
        ${SQL_PRODUCT_SEED}
        ${SQL_DISCOUNT_COUPON_CREATE}
        ${SQL_ORDER_CREATE}
        ${SQL_ORDER_ITEM_CREATE}

        INSERT INTO "order" (cpf, code, price) VALUES ('123456', 15132156, 100);
        INSERT INTO "orderItem" (product_id, order_id, quantity) VALUES (1, 1, 10);
        INSERT INTO "orderItem" (product_id, order_id, quantity) VALUES (2, 1, 2);

    `,
        (err) => {
            if (err) {
                console.error(err.message)
                throw err
            }
            console.log('Product table created...')
            console.log('Product table seeded...')
            console.log('Coupon table created...')
            console.log('Order table created...')
            console.log('OrderItem table created...')
        }
    )
}
