import { z } from 'zod';
import { AppDataSource } from '../dataSource.js';
import { Property, PropertyStatus } from '../entities/Properties.js';
import { CreatePropertySchema, UpdatePropertySchema } from '../validators/propertyValidators.js';

import { User } from '../entities/User.js';
const UserRepository = AppDataSource.getRepository(User);
const PropertyRepository = AppDataSource.getRepository(Property);
type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;
type UpdatePropertyInput = z.infer<typeof UpdatePropertySchema>;

async function getPropertyForUser(
  userId: string,
  propertyId: string,
  isAdmin: boolean = false,
): Promise<Property | null> {
  return await PropertyRepository.findOne({
    where: {
      propertyId,
      ...(isAdmin
        ? {}
        : {
            owner: { userId },
          }),
    },
    relations: {
      owner: true,
      leases: true,
    },
  });
}

async function getPropertiesForUser(userId: string, isAdmin: boolean = false): Promise<Property[]> {
  return await PropertyRepository.find({
    where: {
      ...(isAdmin
        ? {}
        : {
            owner: { userId },
          }),
    },
    relations: {
      leases: true,
    },
  });
}

async function addProperty(userId: string, data: CreatePropertyInput): Promise<Property | null> {
  const owner = await UserRepository.findOne({
    where: { userId },
  });

  if (!owner) {
    return null;
  }

  const newProperty = PropertyRepository.create({
    address: data.address,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    petFriendly: data.petFriendly,
    fencedBackyard: data.fencedBackyard,
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
  data: UpdatePropertyInput,
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
    property.status = data.status as PropertyStatus;
  }

  if (data.bathrooms !== undefined) {
    property.bathrooms = data.bathrooms;
  }

  if (data.petFriendly !== undefined) {
    property.petFriendly = data.petFriendly;
  }

  if (data.fencedBackyard !== undefined) {
    property.fencedBackyard = data.fencedBackyard;
  }

  return await PropertyRepository.save(property);
}

async function addImageToProperty(
  propertyId: string,
  imagePath: string,
  fileSize: number,
  originalName: string,
): Promise<Property | null> {
  const property = await PropertyRepository.findOne({
    where: { propertyId },
  });

  if (!property) {
    return null;
  }

  property.imageUrl = imagePath;
  property.imageFileSize = fileSize;
  property.imageOriginalName = originalName;

  const savedPhoto = await PropertyRepository.save(property);
  return savedPhoto;
}

async function deleteProperty(userId: string, propertyId: string): Promise<boolean> {
  const property = await getPropertyForUser(userId, propertyId);

  if (!property) {
    return false;
  }

  await PropertyRepository.remove(property);
  return true;
}

export {
  addImageToProperty,
  addProperty,
  deleteProperty,
  getPropertiesForUser,
  getPropertyForUser,
  updateProperty,
};
