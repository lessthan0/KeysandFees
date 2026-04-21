import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn, Unique } from 'typeorm';

import { v7 as uuidv7 } from 'uuid';
import { Lease } from './Lease.js';

@Entity()
@Unique(['lease', 'rentMonth'])
export class RentPayment {
  @PrimaryColumn({ type: 'varchar' })
  paymentId!: string;
  @BeforeInsert()
  generateId(): void {
    this.paymentId = uuidv7();
  }

  @ManyToOne(() => Lease, (lease) => lease.payments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  lease!: Lease;

  @Column({ type: 'varchar', length: 7 })
  rentMonth!: string;

  @Column('int')
  amountPaidCents!: number;
}
