import { render, screen, fireEvent } from '@testing-library/react';
import AdminLayout from '../layout';
import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

// Mocks
jest.mock('next-auth/react');
jest.mock('next/navigation');

// Mock Ant Design icons
jest.mock('@ant-design/icons', () => ({
  HomeOutlined: () => <span>HomeIcon</span>,
  ShoppingOutlined: () => <span>ShoppingIcon</span>,
  UserOutlined: () => <span>UserIcon</span>,
  ShoppingCartOutlined: () => <span>CartIcon</span>,
  SettingOutlined: () => <span>SettingIcon</span>,
  LogoutOutlined: () => <span>LogoutIcon</span>,
  HeartOutlined: () => <span>HeartIcon</span>,
}));

describe('AdminLayout', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue('/admin');
  });

  it('shows loading state', () => {
    (useSession as jest.Mock).mockReturnValue({ status: 'loading', data: null });
    render(<AdminLayout>Test Content</AdminLayout>);
    expect(screen.getByText('Loading Admin Panel...')).toBeInTheDocument();
  });

  it('redirects if unauthenticated', () => {
    (useSession as jest.Mock).mockReturnValue({ status: 'unauthenticated', data: null });
    render(<AdminLayout>Test Content</AdminLayout>);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('redirects if user is not admin', () => {
    (useSession as jest.Mock).mockReturnValue({ 
      status: 'authenticated', 
      data: { user: { role: 'user' } } 
    });
    render(<AdminLayout>Test Content</AdminLayout>);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('renders layout content for admin', () => {
    (useSession as jest.Mock).mockReturnValue({ 
      status: 'authenticated', 
      data: { user: { name: 'Admin User', role: 'admin' } } 
    });
    
    render(<AdminLayout><div>Child Content</div></AdminLayout>);

    expect(screen.getByText('CPANEL')).toBeInTheDocument();
    expect(screen.getByText('Admin User')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
    
    // Check menu items
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('handles logout', () => {
    (useSession as jest.Mock).mockReturnValue({ 
      status: 'authenticated', 
      data: { user: { name: 'Admin User', role: 'admin' } } 
    });

    render(<AdminLayout>Content</AdminLayout>);
    
    const logoutBtn = screen.getByText('Logout');
    fireEvent.click(logoutBtn);

    expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/' });
  });
});
