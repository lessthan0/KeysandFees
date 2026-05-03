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
import { Lease } from './Lease.js';
import { User } from './User.js';

export enum PropertyStatus {
  VACANT = 'vacant',
  OCCUPIED = 'occupied',
}

@Entity()
export class Property {
  @PrimaryColumn({ type: 'varchar' })
  propertyId!: string;

  @BeforeInsert()
  generateId(): void {
    this.propertyId = uuidv7();
  }

  @Column({ type: 'varchar' })
  address!: string;

  @Column({
    type: 'enum',
    enum: PropertyStatus,
    default: PropertyStatus.VACANT,
  })
  status!: PropertyStatus;

  @Column({ type: 'int' })
  bedrooms!: number;

  @Column({ type: 'int', default: 1 })
  bathrooms!: number;

  @Column({ type: 'boolean', default: false })
  petFriendly!: boolean;

  @Column({ type: 'boolean', default: false })
  fencedBackyard!: boolean;

  @Column({ type: 'int' })
  yearbuilt!: number;

  @Column({ type: 'int' })
  rentAmount!: number;

  @Column({ type: 'text', nullable: true })
  imageUrl!: string | null;

  @Column({ type: 'varchar', nullable: true })
  imageOriginalName!: string | null;

  @Column({ type: 'int', nullable: true })
  imageFileSize!: number | null;

  @ManyToOne(() => User, (user) => user.properties, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  owner!: Relation<User>;

  @OneToMany(() => Lease, (lease) => lease.property)
  leases!: Lease[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
