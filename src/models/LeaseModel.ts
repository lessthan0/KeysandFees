import { z } from 'zod';
import { AppDataSource } from '../dataSource.js';
import { Lease, LeaseStatus } from '../entities/Lease.js';
import { Property, PropertyStatus } from '../entities/Properties.js';
import { Tenant } from '../entities/Tenant.js';

import { CreateLeaseSchema, UpdateLeaseSchema } from '../validators/leaseValidators.js';

const LeaseRepository = AppDataSource.getRepository(Lease);
const PropertyRepository = AppDataSource.getRepository(Property);
const TenantRepository = AppDataSource.getRepository(Tenant);

async function getLeasesForUserProperty(userId: string, propertyId: string): Promise<Lease[]> {
  return await LeaseRepository.find({
    where: {
      property: {
        propertyId,
        owner: { userId },
      },
    },
    relations: {
      property: true,
      tenant: true,
      payments: true,
    },
  });
}
async function getLeaseById(userId: string, leaseId: string): Promise<Lease | null> {
  try {
    const lease = await LeaseRepository.findOne({
      where: {
        leaseId,
        property: {
          owner: { userId },
        },
      },
      relations: {
        property: {
          owner: true,
        },
        tenant: {
          owner: true,
        },
        payments: true,
      },
    });

    return lease;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function getLeaseForUser(userId: string, leaseId: string): Promise<Lease | null> {
  return await LeaseRepository.findOne({
    where: {
      leaseId,
      property: {
        owner: { userId },
      },
    },
    relations: {
      property: {
        owner: true,
      },
      tenant: true,
      payments: true,
    },
  });
}
async function createLease(
  userId: string,
  propertyId: string,
  data: z.infer<typeof CreateLeaseSchema>,
): Promise<Lease | null> {
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

  const tenant = await TenantRepository.findOne({
    where: {
      tenantId: data.tenantId,
      owner: { userId },
    },
    relations: {
      owner: true,
    },
  });

  if (!tenant) {
    return null;
  }

  const lease = LeaseRepository.create({
    property,
    tenant,
    startDate: data.startDate,
    endDate: data.endDate,
    rentAmount: data.rentAmount,
    status: LeaseStatus.ACTIVE,
    endedAt: null,
  });

  property.status = PropertyStatus.OCCUPIED;

  await PropertyRepository.save(property);

  return await LeaseRepository.save(lease);
}

async function updateLease(
  userId: string,
  leaseId: string,
  data: z.infer<typeof UpdateLeaseSchema>,
): Promise<Lease | null> {
  const lease = await getLeaseForUser(userId, leaseId);

  if (!lease) {
    return null;
  }

  if (data.startDate !== undefined) {
    lease.startDate = data.startDate;
  }

  if (data.endDate !== undefined) {
    lease.endDate = data.endDate;
  }

  if (data.rentAmount !== undefined) {
    lease.rentAmount = data.rentAmount;
  }

  return await LeaseRepository.save(lease);
}
async function endLeaseForUser(userId: string, leaseId: string): Promise<Lease | null> {
  const lease = await getLeaseForUser(userId, leaseId);

  if (!lease) {
    return null;
  }

  lease.status = LeaseStatus.UNLEASED;
  lease.endedAt = new Date();

  lease.property.status = PropertyStatus.VACANT;

  await PropertyRepository.save(lease.property);

  return await LeaseRepository.save(lease);
}

export {
  createLease,
  endLeaseForUser,
  getLeaseById,
  getLeaseForUser,
  getLeasesForUserProperty,
  updateLease,
};
