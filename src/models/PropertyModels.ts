import { AppDataSource } from '../dataSource.js';
import { Property, PropertyStatus } from '../entities/Properties.js';

const propertyRepository = AppDataSource.getRepository(Property);
async function addProperty(
  address: string,
  bedrooms: number,
  yearbuilt: number,
  status: PropertyStatus,
): Promise<Property> {
  const newProperty = new Property();
  newProperty.address = address;
  newProperty.bedrooms = bedrooms;
  newProperty.yearbuilt = yearbuilt;
  newProperty.status = status;
  // userId is generated automatically by @BeforeInsert

  return propertyRepository.save(newProperty);
}

export { addProperty };
