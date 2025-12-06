import { render, screen, renderHook } from "@testing-library/react";
import { NotificationProvider, useNotification } from "../Notification";
import { notification } from "antd";

// Mock antd notification
jest.mock("antd", () => ({
  notification: {
    useNotification: jest.fn(),
  },
}));

describe("Notification", () => {
  const mockApi = {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (notification.useNotification as jest.Mock).mockReturnValue([
      mockApi,
      <div data-testid="notification-holder" />,
    ]);
  });

  describe("NotificationProvider", () => {
    it("should render children", () => {
      render(
        <NotificationProvider>
          <div data-testid="child">Test Child</div>
        </NotificationProvider>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("should render notification context holder", () => {
      render(
        <NotificationProvider>
          <div>Test</div>
        </NotificationProvider>
      );

      expect(screen.getByTestId("notification-holder")).toBeInTheDocument();
    });
  });

  describe("useNotification hook", () => {
    it("should throw error when used outside provider", () => {
      // Suppress console.error for this test
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        renderHook(() => useNotification());
      }).toThrow("useNotification must be used within NotificationProvider");

      consoleSpy.mockRestore();
    });

    it("should return notification methods when used within provider", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NotificationProvider>{children}</NotificationProvider>
      );

      const { result } = renderHook(() => useNotification(), { wrapper });

      expect(result.current).toHaveProperty("showNotification");
      expect(result.current).toHaveProperty("showSuccess");
      expect(result.current).toHaveProperty("showError");
      expect(result.current).toHaveProperty("showInfo");
      expect(result.current).toHaveProperty("showWarning");
    });

    it("should call success notification", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NotificationProvider>{children}</NotificationProvider>
      );

      const { result } = renderHook(() => useNotification(), { wrapper });

      result.current.showSuccess("Success message");

      expect(mockApi.success).toHaveBeenCalledWith({
        message: "Success message",
        placement: "topRight",
        duration: 5,
      });
    });

    it("should call error notification", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NotificationProvider>{children}</NotificationProvider>
      );

      const { result } = renderHook(() => useNotification(), { wrapper });

      result.current.showError("Error message");

      expect(mockApi.error).toHaveBeenCalledWith({
        message: "Error message",
        placement: "topRight",
        duration: 5,
      });
    });

    it("should call info notification", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NotificationProvider>{children}</NotificationProvider>
      );

      const { result } = renderHook(() => useNotification(), { wrapper });

      result.current.showInfo("Info message");

      expect(mockApi.info).toHaveBeenCalledWith({
        message: "Info message",
        placement: "topRight",
        duration: 5,
      });
    });

    it("should call warning notification", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NotificationProvider>{children}</NotificationProvider>
      );

      const { result } = renderHook(() => useNotification(), { wrapper });

      result.current.showWarning("Warning message");

      expect(mockApi.warning).toHaveBeenCalledWith({
        message: "Warning message",
        placement: "topRight",
        duration: 5,
      });
    });

    it("should call showNotification with default type info", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NotificationProvider>{children}</NotificationProvider>
      );

      const { result } = renderHook(() => useNotification(), { wrapper });

      result.current.showNotification("General message");

      expect(mockApi.info).toHaveBeenCalledWith({
        message: "General message",
        placement: "topRight",
        duration: 5,
      });
    });

    it("should call showNotification with specified type", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <NotificationProvider>{children}</NotificationProvider>
      );

      const { result } = renderHook(() => useNotification(), { wrapper });

      result.current.showNotification("Custom type message", "warning");

      expect(mockApi.warning).toHaveBeenCalledWith({
        message: "Custom type message",
        placement: "topRight",
        duration: 5,
      });
    });
  });
});
