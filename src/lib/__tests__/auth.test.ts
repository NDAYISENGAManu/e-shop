import { authOptions } from '../auth';
import bcrypt from 'bcryptjs';
import { User } from '@/database/models';

// Mock bcryptjs
jest.mock('bcryptjs');

// Mock User model
jest.mock('@/database/models', () => ({
  User: {
    findOne: jest.fn(),
  },
}));

describe('Auth Configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CredentialsProvider authorize', () => {
    const credentialsProvider = authOptions.providers[0] as any;
    const authorize = credentialsProvider.options.authorize;

    it('should throw error if email is missing', async () => {
      await expect(
        authorize({ password: 'password123' }, {} as any)
      ).rejects.toThrow('Email and password are required');
    });

    it('should throw error if password is missing', async () => {
      await expect(
        authorize({ email: 'user@example.com' }, {} as any)
      ).rejects.toThrow('Email and password are required');
    });

    it('should throw error if user not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        authorize(
          { email: 'notfound@example.com', password: 'password123' },
          {} as any
        )
      ).rejects.toThrow('No user found with this email');
    });

    it('should throw error if password is invalid', async () => {
      const mockUser = {
        id: 1,
        email: 'user@example.com',
        password: 'hashedpassword',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authorize(
          { email: 'user@example.com', password: 'wrongpassword' },
          {} as any
        )
      ).rejects.toThrow('Invalid password');
    });

    it('should return user object on successful authentication', async () => {
      const mockUser = {
        id: 1,
        email: 'user@example.com',
        password: 'hashedpassword',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
        mustChangePassword: false,
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authorize(
        { email: 'user@example.com', password: 'correctpassword' },
        {} as any
      );

      expect(result).toEqual({
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        role: 'user',
        mustChangePassword: false,
      });
    });

    it('should handle mustChangePassword flag', async () => {
      const mockUser = {
        id: 2,
        email: 'admin@example.com',
        password: 'hashedpassword',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        mustChangePassword: true,
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authorize(
        { email: 'admin@example.com', password: 'password' },
        {} as any
      );

      expect(result).toEqual({
        id: '2',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        mustChangePassword: true,
      });
    });

    it('should default mustChangePassword to false if undefined', async () => {
      const mockUser = {
        id: 3,
        email: 'test@example.com',
        password: 'hashedpassword',
        firstName: 'Test',
        lastName: 'User',
        role: 'user',
        // mustChangePassword is undefined
      };

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authorize(
        { email: 'test@example.com', password: 'password' },
        {} as any
      );

      expect(result?.mustChangePassword).toBe(false);
    });
  });

  describe('JWT callback', () => {
    it('should add user data to token on sign in', async () => {
      const token = {};
      const user = {
        id: '123',
        email: 'user@example.com',
        role: 'admin',
        mustChangePassword: false,
      };

      // @ts-ignore
      const result = await authOptions.callbacks.jwt({ token, user });

      expect(result).toEqual({
        id: '123',
        role: 'admin',
        mustChangePassword: false,
      });
    });

    it('should preserve token if no user provided', async () => {
      const token = {
        id: '123',
        role: 'user',
        mustChangePassword: true,
      };

      // @ts-ignore
      const result = await authOptions.callbacks.jwt({ token, user: undefined });

      expect(result).toEqual(token);
    });
  });

  describe('Session callback', () => {
    it('should add token data to session', async () => {
      const session = {
        user: {
          email: 'user@example.com',
          name: 'John Doe',
        },
      };
      const token = {
        id: '456',
        role: 'admin',
        mustChangePassword: true,
      };

      // @ts-ignore
      const result = await authOptions.callbacks.session({ session, token });

      expect(result.user).toEqual({
        email: 'user@example.com',
        name: 'John Doe',
        id: '456',
        role: 'admin',
        mustChangePassword: true,
      });
    });

    it('should return session unchanged if no user in session', async () => {
      const session = {};
      const token = {
        id: '456',
        role: 'admin',
        mustChangePassword: false,
      };

      // @ts-ignore
      const result = await authOptions.callbacks.session({ session, token });

      expect(result).toEqual(session);
    });
  });

  describe('Auth configuration', () => {
    it('should use JWT session strategy', () => {
      expect(authOptions.session?.strategy).toBe('jwt');
    });

    it('should have correct page configurations', () => {
      expect(authOptions.pages).toEqual({
        signIn: '/login',
        signOut: '/logout',
        error: '/login',
      });
    });

    it('should have CredentialsProvider configured', () => {
      expect(authOptions.providers).toHaveLength(1);
      expect(authOptions.providers[0]).toHaveProperty('name', 'Credentials');
    });

    it('should use NEXTAUTH_SECRET from environment', () => {
      expect(authOptions.secret).toBe(process.env.NEXTAUTH_SECRET);
    });
  });
});
