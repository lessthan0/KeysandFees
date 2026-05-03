import { Request, Response } from 'express';

import { CreateLeaseSchema, UpdateLeaseSchema } from '../validators/leaseValidators.js';

import fs from 'fs/promises';
import {
  addPdfToLease,
  createLease,
  endLeaseForUser,
  getLeaseById,
  getLeasesForUserProperty,
  updateLease,
} from '../models/LeaseModel.js';
import { isAdmin } from '../sessionConfig.js';
import { LeaseDocBodySchema } from '../validators/uploadValidator.js';

async function listLeasesForProperty(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const { propertyId } = req.params;

    const leases = await getLeasesForUserProperty(userId, propertyId);

    res.status(200).json(leases);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
async function getLease(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const { leaseId } = req.params;

    const lease = await getLeaseById(userId, leaseId, isAdmin(req));

    if (!lease) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(lease);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
async function addLease(req: Request, res: Response): Promise<void> {
  const result = CreateLeaseSchema.safeParse(req.body);

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

    const { propertyId } = req.params;

    const lease = await createLease(userId, propertyId, result.data);

    if (!lease) {
      res.status(404).json({
        message: 'Property or tenant not found',
      });
      return;
    }

    res.status(201).json(lease);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
async function editLease(req: Request, res: Response): Promise<void> {
  const result = UpdateLeaseSchema.safeParse(req.body);

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

    const { leaseId } = req.params;

    const lease = await updateLease(userId, leaseId, result.data);

    if (!lease) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(lease);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function removeLease(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const { leaseId } = req.params;

    const lease = await endLeaseForUser(userId, leaseId);

    if (!lease) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(lease);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function uploadLease(req: Request, res: Response): Promise<void> {
  const userId = req.session.authenticatedUser?.userId;
  if (!userId) {
    res.sendStatus(401);
    return;
  }

  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded or file rejected' });
    return;
  }

  const parseResult = LeaseDocBodySchema.safeParse(req.body);
  if (!parseResult.success) {
    await fs.unlink(req.file.path); // clean up the orphan file
    res.status(400).json(parseResult.error);
    return;
  }

  try {
    const updated = await addPdfToLease(
      userId,
      req.file.path,
      req.file.size,
      req.file.originalname,
    );
    if (!updated) {
      await fs.unlink(req.file.path);
      res.sendStatus(404);
      return;
    }
    res.status(201).json(updated);
  } catch (err) {
    await fs.unlink(req.file.path);
    console.error('I knew this shit would fail', err);
    res.sendStatus(500);
  }
}

export { addLease, editLease, getLease, listLeasesForProperty, removeLease, uploadLease };
