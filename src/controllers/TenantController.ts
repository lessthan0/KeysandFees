import { Request, Response } from 'express';

import {
  createTenant,
  deleteTenant,
  getTenantForUser,
  getTenantsForUser,
  updateTenant,
} from '../models/TenantModel.js';

import { CreateTenantSchema, UpdateTenantSchema } from '../validators/tenantValidator.js';

export async function getTenants(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const tenants = await getTenantsForUser(userId);

    res.status(200).json(tenants);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getTenant(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const { tenantId } = req.params;

    const tenant = await getTenantForUser(userId, tenantId);

    if (!tenant) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(tenant);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function addTenant(req: Request, res: Response): Promise<void> {
  const result = CreateTenantSchema.safeParse(req.body);

  if (!result.success) {
    res.sendStatus(400);
    return;
  }

  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const tenant = await createTenant(
      result.data.firstName,
      result.data.lastName,
      result.data.email,
      result.data.maritalStatus,
      result.data.notes,
    );

    if (!tenant) {
      res.sendStatus(404);
      return;
    }
    //print out the tenant, the david tenant
    res.status(201).json(tenant);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function editTenant(req: Request, res: Response): Promise<void> {
  const result = UpdateTenantSchema.safeParse(req.body);

  if (!result.success) {
    res.sendStatus(400);
    return;
  }

  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      return;
    }

    const { tenantId } = req.params;

    const tenant = await updateTenant(userId, tenantId, result.data);

    if (!tenant) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(tenant);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
export async function removeTenant(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      return;
    }

    const { tenantId } = req.params;

    const deleted = await deleteTenant(userId, tenantId);

    if (!deleted) {
      res.sendStatus(404);
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
