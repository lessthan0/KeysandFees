import { z } from 'zod';
import { AppDataSource } from '../dataSource.js';
import { Tenant } from '../entities/Tenant.js';
import { UpdateTenantSchema } from '../validators/tenantValidator.js';
import { UserRepository } from './UserModel.js';
const TenantRepository = AppDataSource.getRepository(Tenant);

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
  firstname: string,
  lastname: string,
  email?: string | null,
  phone?: string | null,
  maritalstatus?: string | null,
  notes?: string | null,
): Promise<Tenant | null> {
  const owner = await UserRepository.findOneBy({ userId });

  if (!owner) {
    return null;
  }

  const tenant = new Tenant();
  tenant.firstName = firstname;
  tenant.lastName = lastname;
  tenant.email = email;
  tenant.phone = phone;
  tenant.maritalStatus = maritalstatus;
  tenant.notes = notes;

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
    tenant.email = data.email;
  }

  if (data.phone !== undefined) {
    tenant.phone = data.phone;
  }

  if (data.maritalStatus !== undefined) {
    tenant.maritalStatus = data.maritalStatus;
  }

  if (data.notes !== undefined) {
    tenant.notes = data.notes;
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
