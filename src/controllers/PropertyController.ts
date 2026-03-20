//import argon2 from 'argon2';
import { Request, Response } from 'express';
import { addProperty } from '../models/PropertyModels.js';
//import { parseDatabaseError } from '../utils/db-utils.js';
import { PropertyStatus } from '../entities/Properties.js';
import { PropertySchema } from '../validators/propertyValidators.js';

export async function registerProperty(req: Request, res: Response): Promise<void> {
  const result = PropertySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ error: result.error });
    return;
  }

  const { address, status, bedrooms, yearbuilt } = result.data;
  const stat = status as PropertyStatus;
  const newProperty = await addProperty(address, bedrooms, yearbuilt, stat);

  res.status(201).json({ property: newProperty });
}
