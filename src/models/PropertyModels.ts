import { z } from 'zod';
import { AppDataSource } from '../dataSource.js';
import { Property } from '../entities/Properties.js';
import { CreatePropertySchema, UpdatePropertySchema } from '../validators/propertyValidators.js';

import { User } from '../entities/User.js';
const UserRepository = AppDataSource.getRepository(User);
const PropertyRepository = AppDataSource.getRepository(Property);

async function getPropertyForUser(userId: string, propertyId: string): Promise<Property | null> {
  return await PropertyRepository.findOne({
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
  return await PropertyRepository.find({
    where: {
      owner: { userId },
    },
    relations: {
      leases: true,
    },
  });
}

async function addProperty(
  userId: string,
  data: z.infer<typeof CreatePropertySchema>,
): Promise<Property | null> {
  const owner = await UserRepository.findOne({
    where: { userId },
  });

  if (!owner) {
    return null;
  }

  const newProperty = PropertyRepository.create({
    address: data.address,
    bedrooms: data.bedrooms,
    yearbuilt: data.yearbuilt,
    rentAmount: data.rentAmount,
    status: data.status,
    imageUrl: data.imageUrl ?? null,
    owner,
  });

  return await PropertyRepository.save(newProperty);
}

async function updateProperty(
  userId: string,
  propertyId: string,
  data: z.infer<typeof UpdatePropertySchema>,
): Promise<Property | null> {
  const property = await PropertyRepository.findOne({
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
    property.imageUrl = data.imageUrl ?? null;
  }

  if (data.status !== undefined) {
    property.status = data.status;
  }

  return await PropertyRepository.save(property);
}

async function deleteProperty(userId: string, propertyId: string): Promise<boolean> {
  const property = await getPropertyForUser(userId, propertyId);

  if (!property) {
    return false;
  }

  await PropertyRepository.remove(property);
  return true;
}

export { addProperty, deleteProperty, getPropertiesForUser, getPropertyForUser, updateProperty };
