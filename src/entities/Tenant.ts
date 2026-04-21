import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Lease } from './Lease.js';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 80 })
  firstName!: string;

  @Column({ type: 'varchar', length: 80 })
  lastName!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone!: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  maritalStatus!: string | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @OneToMany(() => Lease, (lease) => lease.tenant)
  leases!: Lease[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
