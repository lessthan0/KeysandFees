//import argon2 from 'argon2';
import { Request, Response } from 'express';
import {
  addProperty,
  deleteProperty,
  getPropertiesForUser,
  getPropertyForUser,
  updateProperty,
} from '../models/PropertyModels.js';
//import { parseDatabaseError } from '../utils/db-utils.js';
import { PropertyStatus } from '../entities/Properties.js';

import { CreatePropertySchema, UpdatePropertySchema } from '../validators/propertyValidators.js';

export async function getProperties(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;
    //const userId = requireLoggedIn(req, res);

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const properties = await getPropertiesForUser(userId);

    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getProperty(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;
    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const { propertyId } = req.params;

    const property = await getPropertyForUser(userId, propertyId);

    if (!property) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(property);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function registerProperty(req: Request, res: Response): Promise<void> {
  const result = CreatePropertySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }

  const { address, status, bedrooms, rentAmount, yearbuilt } = result.data;
  const stat = status as PropertyStatus;
  const newProperty = await addProperty(address, bedrooms, rentAmount, yearbuilt, stat);

  res.status(201).json({ property: newProperty });
}

export async function editProperty(req: Request, res: Response): Promise<void> {
  const result = UpdatePropertySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  try {
    const userId = req.session.authenticatedUser?.userId;
    const { propertyId } = req.params;

    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const property = await updateProperty(userId, propertyId, result.data);

    if (!property) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(property);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
export async function removeProperty(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;
    if (!userId) {
      res.sendStatus(401);
      return;
    }

    const { propertyId } = req.params;

    const deleted = await deleteProperty(userId, propertyId);

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
