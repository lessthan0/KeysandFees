import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { AppDataSource } from '../dataSource.js';
import { User } from '../entities/User.js';
import { getUserById } from './UserModel.js';

jest.mock('../dataSource.js');

const mockedDataSource = jest.mocked(AppDataSource);

describe('getUserById', (): void => {
  const mockFindOneBy = jest.fn<(criteria: Partial<User>) => Promise<User | null>>();

  beforeEach((): void => {
    jest.clearAllMocks();

    mockedDataSource.getRepository.mockReturnValue({
      findOneBy: mockFindOneBy,
    } as never);
  });

  it('returns the user when one is found', async (): Promise<void> => {
    const fakeUser = {
      userId: 'abc',
      email: 'ada@example.com',
    } as User;

    mockFindOneBy.mockResolvedValue(fakeUser);

    const result = await getUserById('abc');

    expect(result).toEqual(fakeUser);
    expect(mockFindOneBy).toHaveBeenCalledWith({
      userId: 'abc',
    });
  });

  it('returns null when no user is found', async (): Promise<void> => {
    mockFindOneBy.mockResolvedValue(null);

    const result = await getUserById('missing');

    expect(result).toBeNull();
    expect(mockFindOneBy).toHaveBeenCalledWith({
      userId: 'missing',
    });
  });

  it('throws when the repository throws', async (): Promise<void> => {
    mockFindOneBy.mockRejectedValue(new Error('connection lost'));

    await expect(getUserById('abc')).rejects.toThrow('connection lost');

    expect(mockFindOneBy).toHaveBeenCalledWith({
      userId: 'abc',
    });
  });
});
