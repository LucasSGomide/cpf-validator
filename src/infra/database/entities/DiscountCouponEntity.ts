import { Entity, Column, PrimaryColumn, Generated } from 'typeorm'

@Entity({ name: 'DiscountCoupon' })
export class DiscountCouponEntity {
    @PrimaryColumn()
    @Generated('uuid')
    id?: number

    @Column({ type: 'text', nullable: false })
    name!: string

    @Column({ type: 'decimal', nullable: false })
    percentage!: number

    @Column({ type: 'date', nullable: false })
    expire_date!: Date
}
