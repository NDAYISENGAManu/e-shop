import { render, screen } from '@testing-library/react';
import AdminDashboard from '../page';
import { useQuery } from '@tanstack/react-query';

// Mock useQuery
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

// Mock axios (though not strictly needed if useQuery is mocked, but good practice if code changes)
jest.mock('axios');

// Mock Ant Design icons
jest.mock('@ant-design/icons', () => ({
  ShoppingOutlined: () => <span data-testid="shopping-icon" />,
  UserOutlined: () => <span data-testid="user-icon" />,
  ShoppingCartOutlined: () => <span data-testid="cart-icon" />,
  DollarOutlined: () => <span data-testid="dollar-icon" />,
  RiseOutlined: () => <span data-testid="rise-icon" />,
}));

describe('AdminDashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dashboard overview and stats correctly', () => {
    // Mock return values for useQuery
    (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
      if (queryKey[0] === 'admin-stats') {
        return {
          data: {
            totalProducts: 15,
            totalUsers: 8,
            totalOrders: 25,
            totalRevenue: 75000, // $750.00
          },
          isLoading: false,
        };
      }
      if (queryKey[0] === 'recent-orders') {
        return {
          data: [
            {
              id: 101,
              user: { email: 'customer@example.com' },
              total: 5000, // $50.00
              status: 'delivered',
              createdAt: '2023-12-01T10:00:00Z',
            },
          ],
          isLoading: false,
        };
      }
      return { data: null, isLoading: false };
    });

    render(<AdminDashboard />);

    // Check Header
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
    expect(screen.getByText('Monitor your handcraft marketplace performance')).toBeInTheDocument();

    // Check Stats
    expect(screen.getByText('Total Products')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();

    expect(screen.getByText('Total Orders')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$750.00')).toBeInTheDocument();

    // Check Recent Orders Table
    expect(screen.getByText('Recent Orders')).toBeInTheDocument();
    expect(screen.getByText('Latest transactions from your customers')).toBeInTheDocument();
    
    // Check Table Content
    expect(screen.getByText('#101')).toBeInTheDocument();
    expect(screen.getByText('customer@example.com')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('delivered')).toBeInTheDocument();
  });

  it('handles missing data gracefully', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    render(<AdminDashboard />);

    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
    // Should show 0 or defaults
    expect(screen.getAllByText('0')).toHaveLength(3); // For counts (Products, Users, Orders)
    expect(screen.getByText('$0.00')).toBeInTheDocument(); // For revenue
  });
});
