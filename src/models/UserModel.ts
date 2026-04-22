import { AppDataSource } from '../dataSource.js';
import { User } from '../entities/User.js';

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

async function addUser(email: string, passwordHash: string): Promise<User> {
  const newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  // userId is generated automatically by @BeforeInsert

  return UserRepository.save(newUser);
}
export { addUser, getAllUsers, getUserByEmail, getUserById, UserRepository };
