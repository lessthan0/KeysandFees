import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { Lease } from './Lease.js';
import { User } from './User.js';

export enum PropertyStatus {
  VACANT = 'vacant',
  OCCUPIED = 'occupied',
}
@Entity()
export class Property {
  @PrimaryColumn({ type: 'varchar' })
  propertyId: string;

  @Column({ type: 'varchar' })
  address: string;

  @BeforeInsert()
  generateId(): void {
    this.propertyId = uuidv7();
  }

  @Column({
    type: 'enum',
    enum: PropertyStatus,
    default: 'vacant',
  })
  status: PropertyStatus;
  @Column('int')
  bedrooms: number;

  @Column('int')
  yearbuilt: number;

  @Column('int')
  monthsRent: number;

  @Column({ type: 'text', nullable: true })
  imageUrl!: string | null;

  @ManyToOne(() => User, (user) => user.properties, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner!: User;

  @OneToMany(() => Lease, (lease) => lease.property)
  leases!: Lease[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
