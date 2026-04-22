//import argon2 from 'argon2';
import { Request, Response } from 'express';
import { addProperty, updateProperty } from '../models/PropertyModels.js';
//import { parseDatabaseError } from '../utils/db-utils.js';
import { PropertyStatus } from '../entities/Properties.js';

import { CreatePropertySchema, UpdatePropertySchema } from '../validators/propertyValidators.js';

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
