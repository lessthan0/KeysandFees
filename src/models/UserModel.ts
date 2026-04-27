import { z } from 'zod';
import { AppDataSource } from '../dataSource.js';
import { User } from '../entities/User.js';
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

  if (data.displayName !== undefined) {
    user.displayName = data.displayName;
  }

  return await UserRepository.save(user);
}

async function addUser(email: string, passwordHash: string): Promise<User> {
  const newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;
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

export {
  addUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  getUserProfile,
  updateUserProfile,
};
