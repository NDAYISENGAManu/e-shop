import { render, screen, waitFor } from "@testing-library/react";
import OrdersPage from "../page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

// Mock dependencies
jest.mock("next-auth/react");
jest.mock("next/navigation");
jest.mock("@tanstack/react-query");

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

describe("OrdersPage", () => {
  const mockPush = jest.fn();

  const mockOrders = [
    {
      id: 1,
      status: "delivered",
      total: 30000,
      createdAt: "2024-01-15T10:00:00Z",
      items: [
        {
          id: 1,
          quantity: 2,
          price: 15000,
          color: "Red",
          product: {
            name: "Office Chair",
            images: [{ url: "/chair.jpg" }],
          },
        },
      ],
    },
    {
      id: 2,
      status: "shipped",
      total: 50000,
      createdAt: "2024-01-20T15:30:00Z",
      items: [
        {
          id: 2,
          quantity: 1,
          price: 50000,
          color: "Blue",
          product: {
            name: "Sofa",
            images: [{ url: "/sofa.jpg" }],
          },
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("should redirect to login if not authenticated", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<OrdersPage />);

    waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login?redirect=/orders");
    });
  });

  it("should show loading state", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "loading",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<OrdersPage />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(screen.getByText("Loading your orders")).toBeInTheDocument();
  });

  it("should render empty orders message", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<OrdersPage />);

    expect(screen.getByText("No Orders Yet")).toBeInTheDocument();
    expect(
      screen.getByText(/you haven't placed any orders/i)
    ).toBeInTheDocument();
  });

  it("should have browse products link when no orders", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<OrdersPage />);

    const browseLink = screen.getByText("Browse Products").closest("a");
    expect(browseLink).toHaveAttribute("href", "/products");
  });

  it("should render page title", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockOrders,
      isLoading: false,
    });

    render(<OrdersPage />);

    expect(screen.getByText("My Orders")).toBeInTheDocument();
  });

  it("should render orders", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockOrders,
      isLoading: false,
    });

    render(<OrdersPage />);

    expect(screen.getByText("Order #1")).toBeInTheDocument();
    expect(screen.getByText("Order #2")).toBeInTheDocument();
  });

  it("should display order statuses", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockOrders,
      isLoading: false,
    });

    render(<OrdersPage />);

    expect(screen.getByText("delivered")).toBeInTheDocument();
    expect(screen.getByText("shipped")).toBeInTheDocument();
  });

  it("should display order dates", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockOrders,
      isLoading: false,
    });

    render(<OrdersPage />);

    expect(screen.getByText(/January 15, 2024/)).toBeInTheDocument();
    expect(screen.getByText(/January 20, 2024/)).toBeInTheDocument();
  });

  it("should display order items", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockOrders,
      isLoading: false,
    });

    render(<OrdersPage />);

    expect(screen.getByText("Office Chair")).toBeInTheDocument();
    expect(screen.getByText("Sofa")).toBeInTheDocument();
  });

  it("should display item quantities", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockOrders,
      isLoading: false,
    });

    render(<OrdersPage />);

    expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
  });

  it("should display item colors", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockOrders,
      isLoading: false,
    });

    render(<OrdersPage />);

    expect(screen.getByText("Color: Red")).toBeInTheDocument();
    expect(screen.getByText("Color: Blue")).toBeInTheDocument();
  });

  it("should display item prices", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockOrders,
      isLoading: false,
    });

    render(<OrdersPage />);

    expect(screen.getByText("$150.00")).toBeInTheDocument();
    expect(screen.getByText("$500.00")).toBeInTheDocument();
  });

  it("should calculate and display order totals", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockOrders,
      isLoading: false,
    });

    render(<OrdersPage />);

    expect(screen.getByText("Total: $300.00")).toBeInTheDocument();
    expect(screen.getByText("Total: $500.00")).toBeInTheDocument();
  });

  it("should render product images", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: mockOrders,
      isLoading: false,
    });

    render(<OrdersPage />);

    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "/chair.jpg");
    expect(images[1]).toHaveAttribute("src", "/sofa.jpg");
  });

  it("should use placeholder image when product has no images", () => {
    const orderWithoutImages = [
      {
        ...mockOrders[0],
        items: [
          {
            ...mockOrders[0].items[0],
            product: {
              ...mockOrders[0].items[0].product,
              images: [],
            },
          },
        ],
      },
    ];

    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: orderWithoutImages,
      isLoading: false,
    });

    render(<OrdersPage />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/placeholder.jpg");
  });

  it("should handle pending orders", () => {
    const pendingOrder = [
      {
        id: "pending",
        status: "pending",
        total: 10000,
        createdAt: "2024-01-25T12:00:00Z",
        items: [],
      },
    ];

    (useSession as jest.Mock).mockReturnValue({
      data: { user: { email: "test@example.com" } },
      status: "authenticated",
    });
    (useQuery as jest.Mock).mockReturnValue({
      data: pendingOrder,
      isLoading: false,
    });

    render(<OrdersPage />);

    expect(screen.getByText("Current Shopping Cart")).toBeInTheDocument();
    expect(screen.getByText("Pending - In Cart")).toBeInTheDocument();
  });
});
