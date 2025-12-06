import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChangePasswordModal from "../ChangePasswordModal";
import { useNotification } from "../Notification";
import axios from "axios";

// Mock dependencies
jest.mock("axios");
jest.mock("../Notification", () => ({
  useNotification: jest.fn(),
}));

describe("ChangePasswordModal", () => {
  const mockOnPasswordChanged = jest.fn();
  const mockOnSkip = jest.fn();
  const mockShowSuccess = jest.fn();
  const mockShowError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNotification as jest.Mock).mockReturnValue({
      showSuccess: mockShowSuccess,
      showError: mockShowError,
    });
  });

  const defaultProps = {
    onPasswordChanged: mockOnPasswordChanged,
    onSkip: mockOnSkip,
  };

  it("should render modal with title", () => {
    render(<ChangePasswordModal {...defaultProps} />);

    expect(screen.getByText("Change Your Password")).toBeInTheDocument();
  });

  it("should render security message", () => {
    render(<ChangePasswordModal {...defaultProps} />);

    expect(screen.getByText(/For security reasons/i)).toBeInTheDocument();
  });

  it("should render all password input fields", () => {
    render(<ChangePasswordModal {...defaultProps} />);

    expect(screen.getByPlaceholderText("Current Password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("New Password (min 6 characters)")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Confirm New Password")
    ).toBeInTheDocument();
  });

  it("should render action buttons", () => {
    render(<ChangePasswordModal {...defaultProps} />);

    expect(screen.getByText("Change Password")).toBeInTheDocument();
    expect(screen.getByText("Skip for now")).toBeInTheDocument();
  });

  it("should update current password input", () => {
    render(<ChangePasswordModal {...defaultProps} />);

    const input = screen.getByPlaceholderText("Current Password");
    fireEvent.change(input, { target: { value: "oldpass123" } });

    expect(input).toHaveValue("oldpass123");
  });

  it("should update new password input", () => {
    render(<ChangePasswordModal {...defaultProps} />);

    const input = screen.getByPlaceholderText(
      "New Password (min 6 characters)"
    );
    fireEvent.change(input, { target: { value: "newpass123" } });

    expect(input).toHaveValue("newpass123");
  });

  it("should update confirm password input", () => {
    render(<ChangePasswordModal {...defaultProps} />);

    const input = screen.getByPlaceholderText("Confirm New Password");
    fireEvent.change(input, { target: { value: "newpass123" } });

    expect(input).toHaveValue("newpass123");
  });

  it("should show error if passwords do not match", async () => {
    render(<ChangePasswordModal {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "oldpass" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("New Password (min 6 characters)"),
      {
        target: { value: "newpass123" },
      }
    );
    fireEvent.change(screen.getByPlaceholderText("Confirm New Password"), {
      target: { value: "different123" },
    });

    const submitButton = screen.getByText("Change Password");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith("New passwords do not match");
    });
  });

  it("should show error if password is too short", async () => {
    render(<ChangePasswordModal {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "oldpass" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("New Password (min 6 characters)"),
      {
        target: { value: "12345" },
      }
    );
    fireEvent.change(screen.getByPlaceholderText("Confirm New Password"), {
      target: { value: "12345" },
    });

    const submitButton = screen.getByText("Change Password");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        "Password must be at least 6 characters"
      );
    });
  });

  it("should submit password change successfully", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: { success: true } });

    render(<ChangePasswordModal {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "oldpass123" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("New Password (min 6 characters)"),
      {
        target: { value: "newpass123" },
      }
    );
    fireEvent.change(screen.getByPlaceholderText("Confirm New Password"), {
      target: { value: "newpass123" },
    });

    const submitButton = screen.getByText("Change Password");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/api/auth/change-password", {
        currentPassword: "oldpass123",
        newPassword: "newpass123",
      });
    });

    await waitFor(() => {
      expect(mockShowSuccess).toHaveBeenCalledWith(
        "Password changed successfully!"
      );
      expect(mockOnPasswordChanged).toHaveBeenCalled();
    });
  });

  it("should handle API error", async () => {
    const errorMessage = "Current password is incorrect";
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: { error: errorMessage } },
    });

    render(<ChangePasswordModal {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "wrongpass" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("New Password (min 6 characters)"),
      {
        target: { value: "newpass123" },
      }
    );
    fireEvent.change(screen.getByPlaceholderText("Confirm New Password"), {
      target: { value: "newpass123" },
    });

    const submitButton = screen.getByText("Change Password");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(errorMessage);
    });
  });

  it("should handle generic API error", async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error("Network error"));

    render(<ChangePasswordModal {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "oldpass" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("New Password (min 6 characters)"),
      {
        target: { value: "newpass123" },
      }
    );
    fireEvent.change(screen.getByPlaceholderText("Confirm New Password"), {
      target: { value: "newpass123" },
    });

    const submitButton = screen.getByText("Change Password");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith("Failed to change password");
    });
  });

  it("should call onSkip when skip button is clicked", () => {
    render(<ChangePasswordModal {...defaultProps} />);

    const skipButton = screen.getByText("Skip for now");
    fireEvent.click(skipButton);

    expect(mockOnSkip).toHaveBeenCalled();
  });

  it("should show loading state during submission", async () => {
    (axios.post as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve({ data: {} }), 100))
    );

    render(<ChangePasswordModal {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "oldpass" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("New Password (min 6 characters)"),
      {
        target: { value: "newpass123" },
      }
    );
    fireEvent.change(screen.getByPlaceholderText("Confirm New Password"), {
      target: { value: "newpass123" },
    });

    const submitButton = screen.getByText("Change Password");
    fireEvent.click(submitButton);

    // Button should show loading state
    expect(submitButton.closest("button")).toHaveClass("ant-btn-loading");
  });
});
