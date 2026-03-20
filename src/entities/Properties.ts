import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
export enum PropertyStatus {
  VACANT = 'vacant',
  OCCUPIED = 'occupied',
}
@Entity()
export class Property {
  @PrimaryColumn()
  address: string;

  @PrimaryColumn({ unique: true })
  propertyId: string;

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
}
