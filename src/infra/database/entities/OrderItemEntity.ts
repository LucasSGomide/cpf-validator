import {
    Entity,
    Column,
    PrimaryColumn,
    Generated,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm'
import { OrderEntity } from './OrderEntity'
import { ProductEntity } from './ProductEntity'

@Entity({ name: 'OrderItem' })
export class OrderItemEntity {
    @PrimaryColumn()
    @Generated('uuid')
    id!: string

    @Column({ type: 'integer', nullable: false })
    quantity!: number

    @OneToOne(() => ProductEntity)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity

    @ManyToOne(() => OrderEntity, (order) => order.order_items)
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity
}
