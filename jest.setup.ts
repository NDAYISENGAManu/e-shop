import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Suppress Ant Design console warnings in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    const stack = args[0]?.stack?.toString() || '';
    
    // Suppress Ant Design and JSDOM warnings
    if (
      message.includes('Not implemented: window.getComputedStyle') ||
      message.includes('Not implemented: HTMLFormElement.prototype.requestSubmit') ||
      message.includes('not wrapped in act(...)') ||
      message.includes('[antd: Form.Item]') ||
      message.includes('Warning: [antd:') ||
      stack.includes('@rc-component') ||
      stack.includes('antd/lib') ||
      stack.includes('getScrollBarSize') ||
      stack.includes('useScrollLocker')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };

  console.warn = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    
    // Suppress React act() warnings from Ant Design
    if (
      message.includes('An update to') ||
      message.includes('not wrapped in act(...)')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});
