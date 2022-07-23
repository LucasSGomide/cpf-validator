import {
    Entity,
    Column,
    PrimaryColumn,
    Generated,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm'
import { Order } from './OrderEntity'
import { Product } from './ProductEntity'

@Entity()
export class OrderItem {
    @PrimaryColumn()
    @Generated('uuid')
    id?: number

    @Column({ type: 'integer', nullable: false })
    quantity!: number

    @OneToOne(() => Product)
    @JoinColumn()
    product: Product

    @ManyToOne(() => Order, (order) => order.order_items)
    order: Order
}
