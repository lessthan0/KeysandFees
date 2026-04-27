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
    res.status(400).json(result.error.flatten());
    return;
  }

  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const tenant = await createTenant(userId, result.data);

    if (!tenant) {
      res.status(404).json({ message: 'Owner not found' });
      return;
    }

    res.status(201).json(tenant);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function editTenant(req: Request, res: Response): Promise<void> {
  const result = UpdateTenantSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(401);
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
      res.sendStatus(401);
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
