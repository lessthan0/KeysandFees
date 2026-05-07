import { z } from 'zod';
import { AppDataSource } from '../dataSource.js';
import { Lease, LeaseStatus } from '../entities/Lease.js';
import { Property, PropertyStatus } from '../entities/Properties.js';
import { Tenant } from '../entities/Tenant.js';
import { User } from '../entities/User.js';
import { CreateLeaseSchema, UpdateLeaseSchema } from '../validators/leaseValidators.js';

const LeaseRepository = AppDataSource.getRepository(Lease);
const PropertyRepository = AppDataSource.getRepository(Property);
const TenantRepository = AppDataSource.getRepository(Tenant);
const UserRepository = AppDataSource.getRepository(User);

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
async function getLeaseById(
  userId: string,
  leaseId: string,
  isAdmin: boolean = false,
): Promise<Lease | null> {
  try {
    const lease = await LeaseRepository.findOne({
      where: {
        leaseId,
        ...(isAdmin
          ? {}
          : {
              property: {
                owner: { userId },
              },
            }),
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
  actorUserId: string,
  propertyId: string,
  data: z.infer<typeof CreateLeaseSchema>,
): Promise<Lease | null> {
  try {
    const { tenantId } = data;

    const actor = await UserRepository.findOne({
      where: {
        userId: actorUserId,
      },
    });

    if (!actor) {
      return null;
    }

    const isAdmin = actor.role === 'admin';

    let property: Property | null = null;

    if (isAdmin) {
      property = await PropertyRepository.findOne({
        where: {
          propertyId,
        },
        relations: {
          owner: true,
        },
      });
    } else {
      property = await PropertyRepository.findOne({
        where: {
          propertyId,
          owner: {
            userId: actorUserId,
          },
        },
        relations: {
          owner: true,
        },
      });
    }

    if (!property) {
      return null;
    }

    let tenant: Tenant | null = null;

    if (isAdmin) {
      tenant = await TenantRepository.findOne({
        where: {
          tenantId,
        },
        relations: {
          owner: true,
        },
      });
    } else {
      tenant = await TenantRepository.findOne({
        where: {
          tenantId,
          owner: {
            userId: actorUserId,
          },
        },
        relations: {
          owner: true,
        },
      });
    }

    if (!tenant) {
      return null;
    }

    if (property.owner.userId !== tenant.owner.userId) {
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
  } catch (err) {
    console.error('CREATE LEASE ERROR:', err);
    return null;
  }
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

async function addPdfToLease(
  leaseId: string,
  pdfPath: string,
  fileSize: number,
  originalName: string,
): Promise<Lease | null> {
  const lease = await LeaseRepository.findOne({
    where: { leaseId },
  });

  if (!lease) {
    return null;
  }

  lease.leasePdf = pdfPath;
  lease.leasePdfFileSize = fileSize;
  lease.leasePdfOriginalName = originalName;

  const savedLease = await LeaseRepository.save(lease); // cascades to LeasePdf

  return savedLease;
}

export {
  addPdfToLease,
  createLease,
  endLeaseForUser,
  getLeaseById,
  getLeaseForUser,
  getLeasesForUserProperty,
  updateLease,
};
