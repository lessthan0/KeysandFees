import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';

import { v7 as uuidv7 } from 'uuid';
import { Property } from './Properties.js';
import { RentPayment } from './RentPayments.js';
import { Tenant } from './Tenant.js';

export enum LeaseStatus {
  LEASED = 'leased',
  UNLEASED = 'unleased',
  ACTIVE = 'active',
}

@Entity()
export class Lease {
  @PrimaryColumn({ type: 'varchar' })
  leaseId!: string;

  @BeforeInsert()
  generateId(): void {
    this.leaseId = uuidv7();
  }

  @ManyToOne(() => Property, (property) => property.leases, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  property!: Relation<Property>;

  @ManyToOne(() => Tenant, (tenant) => tenant.leases, {
    nullable: false,
  })
  tenant!: Tenant;

  @Column({ type: 'date' })
  startDate!: Date;

  @Column({ type: 'date' })
  endDate!: Date;

  @Column('int')
  rentAmount!: number;

  @Column({
    type: 'enum',
    enum: LeaseStatus,
    default: LeaseStatus.LEASED,
  })
  status!: LeaseStatus;

  @Column({ type: 'timestamp', nullable: true })
  endedAt!: Date | null;

  @OneToMany(() => RentPayment, (payment) => payment.lease)
  payments!: RentPayment[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
