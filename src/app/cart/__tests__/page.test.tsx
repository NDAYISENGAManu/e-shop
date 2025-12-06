import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CartPage from "../page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Mock dependencies
jest.mock("next-auth/react");
jest.mock("next/navigation");
jest.mock("@tanstack/react-query");
jest.mock("axios");

// Mock Link component
jest.mock("next/link", () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Mock Loading component
jest.mock("@/components/Loading", () => {
  return function MockLoading({ fullScreen, text }: any) {
    return <div data-testid="loading">{text}</div>;
  };
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

describe("CartPage", () => {
  const mockPush = jest.fn();
  const mockRefetch = jest.fn();

  const mockCartData = {
    items: [
      {
        id: 1,
        productId: 1,
        quantity: 2,
        color: "Red",
        product: {
          name: "Office Chair",
          price: 15000,
          images: [{ url: "/chair.jpg" }],
        },
      },
      {
        id: 2,
        productId: 2,
        quantity: 1,
        color: "Blue",
        product: {
          name: "Sofa",
          price: 50000,
          images: [{ url: "/sofa.jpg" }],
        },
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    // Default useQuery mock
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      refetch: mockRefetch,
    });
  });

  it("should redirect to login if not authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    render(<CartPage />);

    expect(mockPush).toHaveBeenCalledWith("/login");
  });

  it("should show loading state", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      refetch: mockRefetch,
    });

    render(<CartPage />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.getByText("Loading cart")).toBeInTheDocument();
  });

  it("should render empty cart message", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: { items: [] },
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<CartPage />);

    expect(screen.getByText("Your Cart is Empty")).toBeInTheDocument();
    expect(
      screen.getByText(/you haven't added any items/i)
    ).toBeInTheDocument();
  });

  it("should have browse products link when cart is empty", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: { items: [] },
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<CartPage />);

    const browseLink = screen.getByText("Browse Products").closest("a");
    expect(browseLink).toHaveAttribute("href", "/products");
  });

  it("should render cart items", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockCartData,
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<CartPage />);

    expect(screen.getByText("Office Chair")).toBeInTheDocument();
    expect(screen.getByText("Sofa")).toBeInTheDocument();
  });

  it("should display item quantities", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockCartData,
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<CartPage />);

    expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
  });

  it("should display item colors", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockCartData,
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<CartPage />);

    expect(screen.getByText("Color: Red")).toBeInTheDocument();
    expect(screen.getByText("Color: Blue")).toBeInTheDocument();
  });

  it("should calculate and display item totals", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockCartData,
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<CartPage />);

    expect(screen.getByText("$300.00")).toBeInTheDocument(); // 15000 * 2 / 100
    expect(screen.getByText("$500.00")).toBeInTheDocument(); // 50000 * 1 / 100
  });

  it("should calculate and display cart total", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockCartData,
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<CartPage />);

    expect(screen.getByText("Total: $800.00")).toBeInTheDocument();
  });

  it("should render remove buttons for each item", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockCartData,
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<CartPage />);

    const removeButtons = screen.getAllByText("Remove");
    expect(removeButtons).toHaveLength(2);
  });

  it("should handle item removal", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockCartData,
      isLoading: false,
      refetch: mockRefetch,
    });
    (axios.delete as jest.Mock).mockResolvedValue({});

    render(<CartPage />);

    const removeButtons = screen.getAllByText("Remove");
    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith("/api/cart", {
        data: { itemId: 1 },
      });
      expect(mockShowSuccess).toHaveBeenCalledWith("Item removed from cart");
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it("should handle removal error", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockCartData,
      isLoading: false,
      refetch: mockRefetch,
    });
    (axios.delete as jest.Mock).mockRejectedValue(new Error("Network error"));

    render(<CartPage />);

    const removeButtons = screen.getAllByText("Remove");
    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith("Failed to remove item");
    });
  });

  it("should render checkout button", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockCartData,
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<CartPage />);

    expect(screen.getByText("Proceed to Checkout")).toBeInTheDocument();
  });

  it("should render product images", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockCartData,
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<CartPage />);

    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "/chair.jpg");
    expect(images[1]).toHaveAttribute("src", "/sofa.jpg");
  });
});
