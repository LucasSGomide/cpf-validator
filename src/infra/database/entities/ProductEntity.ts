import { Entity, Column, PrimaryColumn, Generated } from 'typeorm'

@Entity({ name: 'Product' })
export class ProductEntity {
    @PrimaryColumn()
    @Generated('uuid')
    id?: number

    @Column({ type: 'text', nullable: false })
    name: string

    @Column({ type: 'text', nullable: false })
    description: string

    @Column({ type: 'decimal', nullable: false })
    price!: number

    @Column({ type: 'decimal', default: 0 })
    length?: number

    @Column({ type: 'decimal', default: 0 })
    height?: number

    @Column({ type: 'decimal', default: 0 })
    width?: number

    @Column({ type: 'decimal', default: 0 })
    weight?: number
}
