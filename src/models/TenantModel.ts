import { z } from 'zod';
import { AppDataSource } from '../dataSource.js';
import { Tenant } from '../entities/Tenant.js';
import { User } from '../entities/User.js';
import { CreateTenantSchema, UpdateTenantSchema } from '../validators/tenantValidator.js';

const TenantRepository = AppDataSource.getRepository(Tenant);
const UserRepository = AppDataSource.getRepository(User);
async function getTenantsForUser(userId: string): Promise<Tenant[]> {
  return await TenantRepository.find({
    where: {
      owner: { userId },
    },
    relations: {
      leases: true,
    },
  });
}

async function getTenantForUser(userId: string, tenantId: string): Promise<Tenant | null> {
  return await TenantRepository.findOne({
    where: {
      tenantId,
      owner: { userId },
    },
    relations: {
      owner: true,
      leases: true,
    },
  });
}

async function createTenant(
  userId: string,
  data: z.infer<typeof CreateTenantSchema>,
): Promise<Tenant | null> {
  const owner = await UserRepository.findOneBy({ userId });

  if (!owner) {
    return null;
  }

  const tenant = TenantRepository.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email ?? null,
    phone: data.phone ?? null,
    maritalStatus: data.maritalStatus ?? null,
    notes: data.notes ?? null,
    owner,
  });

  return await TenantRepository.save(tenant);
}

async function updateTenant(
  userId: string,
  tenantId: string,
  data: z.infer<typeof UpdateTenantSchema>,
): Promise<Tenant | null> {
  const tenant = await getTenantForUser(userId, tenantId);

  if (!tenant) {
    return null;
  }

  if (data.firstName !== undefined) {
    tenant.firstName = data.firstName;
  }

  if (data.lastName !== undefined) {
    tenant.lastName = data.lastName;
  }

  if (data.email !== undefined) {
    tenant.email = data.email ?? null;
  }

  if (data.phone !== undefined) {
    tenant.phone = data.phone ?? null;
  }

  if (data.maritalStatus !== undefined) {
    tenant.maritalStatus = data.maritalStatus ?? null;
  }

  if (data.notes !== undefined) {
    tenant.notes = data.notes ?? null;
  }

  return await TenantRepository.save(tenant);
}

async function deleteTenant(userId: string, tenantId: string): Promise<boolean> {
  const tenant = await getTenantForUser(userId, tenantId);

  if (!tenant) {
    return false;
  }

  await TenantRepository.remove(tenant);
  return true;
}

export { createTenant, deleteTenant, getTenantForUser, getTenantsForUser, updateTenant };
