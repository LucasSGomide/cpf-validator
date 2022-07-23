import {
    Entity,
    Column,
    PrimaryColumn,
    Generated,
    OneToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm'
import { DiscountCouponEntity } from './DiscountCouponEntity'
import { OrderItemEntity } from './OrderItemEntity'

@Entity({ name: 'Order' })
export class OrderEntity {
    @PrimaryColumn()
    @Generated('uuid')
    id?: number

    @Column({ type: 'datetime', nullable: false })
    request_date!: Date

    @Column({ type: 'text', nullable: false })
    cpf!: string

    @Column({ type: 'text', nullable: false })
    code!: string

    @Column({ type: 'decimal', default: 0 })
    price!: number

    @OneToOne(() => DiscountCouponEntity)
    @JoinColumn()
    discount_coupon?: DiscountCouponEntity

    @OneToMany(() => OrderItemEntity, (order_item) => order_item.order)
    order_items: OrderItemEntity[]
}
