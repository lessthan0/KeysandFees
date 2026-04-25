import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  Relation,
  Unique,
} from 'typeorm';

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
  lease!: Relation<Lease>;

  @Column({ type: 'varchar', length: 7 })
  rentMonth!: string;

  @Column('int')
  rentAmount!: number;

  @CreateDateColumn()
  paidAt!: Date;

  @Column({ type: 'boolean' })
  late!: boolean | false;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;
}
