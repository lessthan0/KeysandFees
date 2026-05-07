import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { AppDataSource } from '../dataSource.js';
import { User, UserRole } from '../entities/User.js';
import { UpdateProfileSchema } from '../validators/authValidator.js';

const UserRepository = AppDataSource.getRepository(User);

async function getAllUsers(): Promise<User[]> {
  return UserRepository.find();
}

async function getUserById(userId: string): Promise<User | null> {
  return UserRepository.findOne({ where: { userId } });
}

async function getUserByEmail(email: string): Promise<User | null> {
  return UserRepository.findOne({ where: { email } });
}
async function getUserProfile(userId: string): Promise<User | null> {
  return await UserRepository.findOne({
    where: { userId },
    relations: {
      properties: true,
      tenants: true,
    },
  });
}

async function updateUserProfile(
  userId: string,
  data: z.infer<typeof UpdateProfileSchema>,
): Promise<User | null> {
  const user = await UserRepository.findOneBy({ userId });

  if (!user) {
    return null;
  }

  if (data.email !== undefined) {
    user.email = data.email;
  }

  if (data.password !== undefined) {
    user.passwordHash = data.password;
  }

  if (data.role !== undefined) {
    user.role = data.role;
  }

  if (data.displayName !== undefined) {
    user.displayName = data.displayName as string;
  }

  return await UserRepository.save(user);
}

async function addUser(
  email: string,
  passwordHash: string,
  displayName: string,
  role: UserRole,
): Promise<User> {
  const newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  newUser.displayName = displayName;
  newUser.role = role;
  // userId is generated automatically by @BeforeInsert

  return UserRepository.save(newUser);
}

async function deleteUser(userId: string): Promise<boolean> {
  const user = await UserRepository.findOneBy({ userId });

  if (!user) {
    return false;
  }

  await UserRepository.remove(user);
  return true;
}
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.authenticatedUser?.userId) {
    res.sendStatus(401);
    return;
  }

  next();
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const user = req.session.authenticatedUser;

  if (!user) {
    res.sendStatus(401);
    return;
  }

  if (user.role !== 'admin') {
    res.sendStatus(403);
    return;
  }

  next();
}

function isAdmin(req: Request): boolean {
  return req.session.authenticatedUser?.role === 'admin';
}

export {
  addUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserProfile,
  isAdmin,
  requireAdmin,
  requireAuth,
  updateUserProfile,
};
