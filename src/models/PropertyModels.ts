import { z } from 'zod';
import { AppDataSource } from '../dataSource.js';
import { Property, PropertyStatus } from '../entities/Properties.js';
import { UpdatePropertySchema } from '../validators/propertyValidators.js';
const propertyRepository = AppDataSource.getRepository(Property);

async function getPropertyForUser(userId: string, propertyId: string): Promise<Property | null> {
  return await propertyRepository.findOne({
    where: {
      propertyId,
      owner: { userId },
    },
    relations: {
      owner: true,
      leases: true,
    },
  });
}
async function getPropertiesForUser(userId: string): Promise<Property[]> {
  return await propertyRepository.find({
    where: {
      owner: { userId },
    },
    relations: {
      leases: true,
    },
  });
}
async function addProperty(
  address: string,
  bedrooms: number,
  yearbuilt: number,
  rentAmount: number,
  status: PropertyStatus,
  imageUrl?: string | null,
): Promise<Property> {
  const newProperty = new Property();
  newProperty.address = address;
  newProperty.bedrooms = bedrooms;
  newProperty.yearbuilt = yearbuilt;
  newProperty.rentAmount = rentAmount;
  newProperty.status = status;
  newProperty.imageUrl = imageUrl;
  // userId is generated automatically by @BeforeInsert

  return propertyRepository.save(newProperty);
}

async function updateProperty(
  userId: string,
  propertyId: string,
  data: z.infer<typeof UpdatePropertySchema>,
): Promise<Property | null> {
  const propertyRepo = AppDataSource.getRepository(Property);

  const property = await propertyRepo.findOne({
    where: {
      propertyId,
      owner: { userId },
    },
    relations: {
      owner: true,
    },
  });

  if (!property) {
    return null;
  }

  if (data.address !== undefined) {
    property.address = data.address;
  }

  if (data.bedrooms !== undefined) {
    property.bedrooms = data.bedrooms;
  }

  if (data.yearbuilt !== undefined) {
    property.yearbuilt = data.yearbuilt;
  }

  if (data.rentAmount !== undefined) {
    property.rentAmount = data.rentAmount;
  }

  if (data.imageUrl !== undefined) {
    property.imageUrl = data.imageUrl;
  }

  if (data.status !== undefined) {
    property.status = data.status;
  }

  return await propertyRepo.save(property);
}

async function deleteProperty(userId: string, propertyId: string): Promise<boolean> {
  const property = await getPropertyForUser(userId, propertyId);
  const propertyRepo = AppDataSource.getRepository(Property);
  if (!property) {
    return false;
  }

  await propertyRepo.remove(property);
  return true;
}

export { addProperty, deleteProperty, getPropertiesForUser, getPropertyForUser, updateProperty };
