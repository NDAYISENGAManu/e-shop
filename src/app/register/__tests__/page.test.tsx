import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterPage from "../page";
import { useRouter } from "next/navigation";
import axios from "axios";

// Mock dependencies
jest.mock("next/navigation");
jest.mock("axios");

// Mock Link component
jest.mock("next/link", () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Mock Notification
const mockShowSuccess = jest.fn();
const mockShowError = jest.fn();
jest.mock("@/components/Notification", () => ({
  useNotification: () => ({
    showSuccess: mockShowSuccess,
    showError: mockShowError,
  }),
}));

describe("RegisterPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("should render registration form", () => {
    render(<RegisterPage />);

    expect(screen.getByText("Join Our Community")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("should render password field", () => {
    render(<RegisterPage />);

    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it("should render security questions section", () => {
    render(<RegisterPage />);

    expect(screen.getByText(/security questions/i)).toBeInTheDocument();
  });

  it("should have link to login page", () => {
    render(<RegisterPage />);

    const loginLink = screen.getByText("Login").closest("a");
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
