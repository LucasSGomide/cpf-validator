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
    id?: number

    @Column({ type: 'integer', nullable: false })
    quantity!: number

    @OneToOne(() => ProductEntity)
    @JoinColumn()
    product: ProductEntity

    @ManyToOne(() => OrderEntity, (order) => order.order_items)
    order: OrderEntity
}
