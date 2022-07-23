import { Entity, Column, PrimaryColumn, Generated } from 'typeorm'

@Entity({ name: 'DiscountCoupon' })
export class DiscountCouponEntity {
    @PrimaryColumn()
    @Generated('uuid')
    id: string

    @Column({ type: 'text', nullable: false })
    code!: string

    @Column({ type: 'decimal', nullable: false })
    percentage!: number

    @Column({ type: 'date', nullable: false })
    expire_date!: Date
}
