import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmModal from "../ConfirmModal";

// Mock Ant Design icons
jest.mock("@ant-design/icons", () => ({
  ExclamationCircleOutlined: () => <span data-testid="exclamation-icon" />,
}));

describe("ConfirmModal", () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  const defaultProps = {
    isOpen: true,
    title: "Confirm Action",
    message: "Are you sure you want to proceed?",
    onConfirm: mockOnConfirm,
    onCancel: mockOnCancel,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render when isOpen is true", () => {
    render(<ConfirmModal {...defaultProps} />);

    expect(screen.getByText("Confirm Action")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to proceed?")
    ).toBeInTheDocument();
  });

  it("should not render when isOpen is false", () => {
    render(<ConfirmModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByText("Confirm Action")).not.toBeInTheDocument();
  });

  it("should display the exclamation icon", () => {
    render(<ConfirmModal {...defaultProps} />);

    expect(screen.getByTestId("exclamation-icon")).toBeInTheDocument();
  });

  it("should call onConfirm when confirm button is clicked", () => {
    render(<ConfirmModal {...defaultProps} />);

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(<ConfirmModal {...defaultProps} />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it("should use custom confirm and cancel text", () => {
    render(
      <ConfirmModal {...defaultProps} confirmText="Delete" cancelText="Keep" />
    );

    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Keep")).toBeInTheDocument();
  });

  it("should use default button text when not provided", () => {
    render(<ConfirmModal {...defaultProps} />);

    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("should render the message correctly", () => {
    const customMessage = "This action cannot be undone. Continue?";
    render(<ConfirmModal {...defaultProps} message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("should render the title correctly", () => {
    const customTitle = "Delete User";
    render(<ConfirmModal {...defaultProps} title={customTitle} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
  });
});
