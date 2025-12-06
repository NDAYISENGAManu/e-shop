import fs from 'fs';
import path from 'path';
import { logger } from '../logger';

// Mock fs module
jest.mock('fs');

const mockFs = fs as jest.Mocked<typeof fs>;

describe('Logger', () => {
  const LOG_DIR = path.join(process.cwd(), 'logs');

  beforeEach(() => {
    jest.clearAllMocks();
    mockFs.existsSync.mockReturnValue(true);
    mockFs.appendFileSync.mockImplementation(() => {});
    // Suppress console.log in tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete (process.env as any).NODE_ENV;
  });

  describe('info', () => {
    it('should log info message with timestamp', () => {
      logger.info('Test info message', { key: 'value' });

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.stringContaining('.log'),
        expect.stringContaining('[INFO] Test info message'),
        'utf8'
      );
    });

    it('should include data in log entry', () => {
      const testData = { user: 'john', action: 'login' };
      logger.info('User action', testData);

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining(JSON.stringify(testData, null, 2)),
        'utf8'
      );
    });
  });

  describe('success', () => {
    it('should log success message', () => {
      logger.success('Operation completed', { result: 'ok' });

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.stringContaining('.log'),
        expect.stringContaining('[SUCCESS] Operation completed'),
        'utf8'
      );
    });
  });

  describe('warning', () => {
    it('should log warning message', () => {
      logger.warning('Potential issue detected', { issue: 'low memory' });

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.stringContaining('.log'),
        expect.stringContaining('[WARNING] Potential issue detected'),
        'utf8'
      );
    });
  });

  describe('error', () => {
    it('should log error message with error details', () => {
      const error = new Error('Test error');
      logger.error('An error occurred', error);

      const call = mockFs.appendFileSync.mock.calls[0];
      expect(call[0]).toContain('.log');
      expect(call[1]).toContain('[ERROR] An error occurred');
      expect(call[1]).toContain('Test error');
    });

    it('should include stack trace in error log', () => {
      const error = new Error('Test error with stack');
      logger.error('Stack trace test', error);

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('Stack:'),
        'utf8'
      );
    });

    it('should handle non-Error objects', () => {
      logger.error('Error with string', 'simple error message');

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('[ERROR] Error with string'),
        'utf8'
      );
    });
  });

  describe('apiRequest', () => {
    it('should log API request with method and URL', () => {
      logger.apiRequest('GET', '/api/users', { query: 'test' });

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('API Request: GET /api/users'),
        'utf8'
      );
    });
  });

  describe('apiResponse', () => {
    it('should log successful API response', () => {
      logger.apiResponse('POST', '/api/users', 201, { id: 1 });

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('[SUCCESS] API Response: POST /api/users - 201'),
        'utf8'
      );
    });

    it('should log error API response', () => {
      logger.apiResponse('DELETE', '/api/users/1', 404, { error: 'Not found' });

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('[ERROR] API Error: DELETE /api/users/1 - 404'),
        'utf8'
      );
    });
  });

  describe('dbQuery', () => {
    it('should log database query', () => {
      logger.dbQuery('SELECT * FROM users WHERE id = ?', [1]);

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('DB Query: SELECT * FROM users WHERE id = ?'),
        'utf8'
      );
    });
  });

  describe('dbSuccess', () => {
    it('should log successful database operation', () => {
      logger.dbSuccess('User created', { userId: 123 });

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('[SUCCESS] DB Operation: User created'),
        'utf8'
      );
    });
  });

  describe('dbError', () => {
    it('should log database error', () => {
      const dbError = new Error('Connection failed');
      logger.dbError('Database connection', dbError);

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('[ERROR] DB Error: Database connection'),
        'utf8'
      );
    });
  });

  describe('authSuccess', () => {
    it('should log successful authentication', () => {
      logger.authSuccess('Login', { id: 1, email: 'user@example.com' });

      const call = mockFs.appendFileSync.mock.calls[0];
      expect(call[1]).toContain('[SUCCESS] Auth: Login');
      expect(call[1]).toContain('user@example.com');
    });
  });

  describe('authFailed', () => {
    it('should log failed authentication', () => {
      logger.authFailed('Login', 'Invalid credentials');

      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('[WARNING] Auth Failed: Login - Invalid credentials'),
        'utf8'
      );
    });
  });

  describe('log file naming', () => {
    it('should create log file with current date', () => {
      logger.info('Test message');

      const date = new Date().toISOString().split('T')[0];
      const expectedFileName = path.join(LOG_DIR, `${date}.log`);
      
      expect(mockFs.appendFileSync).toHaveBeenCalledWith(
        expectedFileName,
        expect.any(String),
        'utf8'
      );
    });
  });

  describe('development environment', () => {
    it('should log to console in development mode', () => {
      (process.env as any).NODE_ENV = 'development';
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      logger.info('Dev message', { test: true });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Dev message'),
        expect.objectContaining({ test: true })
      );
    });

    it('should not log to console in production mode', () => {
      (process.env as any).NODE_ENV = 'production';
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      logger.info('Prod message');

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
