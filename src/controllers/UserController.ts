import argon2 from 'argon2';
import { Request, Response } from 'express';
import { UserRole } from '../entities/User.js';

import {
  addUser,
  deleteUser,
  getUserByEmail,
  getUserProfile,
  updateUserProfile,
} from '../models/UserModel.js';

import { parseDatabaseError } from '../utils/db-utils.js';
import {
  LoginSchema,
  RegistrationSchema,
  UpdateProfileSchema,
} from '../validators/authValidator.js';

async function registerUser(req: Request, res: Response): Promise<void> {
  const result = RegistrationSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password, role, displayName } = result.data;

  try {
    const passwordHash = await argon2.hash(password);
    const newUser = await addUser(email, passwordHash, displayName, role);
    console.log(newUser);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function logIn(req: Request, res: Response): Promise<void> {
  const result = LoginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password } = result.data;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(403);
      return;
    }

    const { passwordHash } = user;
    if (!(await argon2.verify(passwordHash, password))) {
      res.sendStatus(403);
      return;
    }
    await req.session.clearSession();

    req.session.authenticatedUser = {
      userId: user.userId,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
    };
    req.session.isLoggedIn = true;

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function getProfile(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.sendStatus(404);
      return;
    }

    const profile = await getUserProfile(userId);

    if (!profile) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
async function updateProfile(req: Request, res: Response): Promise<void> {
  const result = UpdateProfileSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      res.status(400).json(result.error);
      return;
    }

    // Ensure required fields are present and match the expected type
    const updateData: {
      role: UserRole;
      displayName: unknown;
      email?: string;
      password?: string;
    } = {
      role: result.data.role,
      displayName: result.data.displayName,
    };

    if (result.data.email !== undefined) {
      updateData.email = result.data.email;
    }

    if (result.data.password !== undefined) {
      updateData.password = await argon2.hash(result.data.password);
    }

    const updatedUser = await updateUserProfile(userId, updateData);

    if (!updatedUser) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function deleteProfile(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.session.authenticatedUser?.userId;

    if (!userId) {
      return;
    }

    const deleted = await deleteUser(userId);

    if (!deleted) {
      res.sendStatus(404);
      return;
    }

    await req.session.clearSession();

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export { deleteProfile, getProfile, logIn, registerUser, updateProfile };
