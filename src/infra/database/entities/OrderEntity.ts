import { Entity, Column, PrimaryColumn, Generated, OneToMany } from 'typeorm'
import { OrderItemEntity } from './OrderItemEntity'

@Entity({ name: 'Order' })
export class OrderEntity {
    @PrimaryColumn()
    @Generated('uuid')
    id!: string

    @Column({ type: 'datetime', nullable: false })
    request_date!: Date

    @Column({ type: 'text', nullable: false })
    cpf!: string

    @Column({ type: 'text', nullable: false })
    code!: string

    @Column({ type: 'decimal' })
    price!: number

    @Column({ type: 'decimal', default: 0 })
    freight_price!: number

    @Column({ type: 'integer', nullable: true })
    coupon_code?: string

    @Column({ type: 'integer', nullable: true })
    coupon_percentage?: number

    @OneToMany(() => OrderItemEntity, (order_item) => order_item.order)
    order_items: OrderItemEntity[]
}
