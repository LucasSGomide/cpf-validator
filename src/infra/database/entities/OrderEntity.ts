import {
    Entity,
    Column,
    PrimaryColumn,
    Generated,
    OneToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm'
import { DiscountCoupon } from './DiscountCouponEntity'
import { OrderItem } from './OrderItemEntity'

@Entity()
export class Order {
    @PrimaryColumn()
    @Generated('uuid')
    id?: number

    @Column({ type: 'datetime', nullable: false })
    request_date!: string

    @Column({ type: 'text', nullable: false })
    cpf!: string

    @Column({ type: 'integer', nullable: false })
    code!: number

    @Column({ type: 'decimal', default: 0 })
    price!: number

    @OneToOne(() => DiscountCoupon)
    @JoinColumn()
    discount_coupon: DiscountCoupon

    @OneToMany(() => OrderItem, (order_item) => order_item.order)
    order_items: OrderItem[]
}
