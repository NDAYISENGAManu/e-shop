import { render, screen } from "@testing-library/react";
import FeaturedProducts from "../FeaturedProducts";
import { useQuery } from "@tanstack/react-query";

// Mock dependencies
jest.mock("@tanstack/react-query");
jest.mock("axios");
jest.mock("next/link", () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

// Mock Loading component
jest.mock("../Loading", () => {
  return function MockLoading({ text }: { text?: string }) {
    return <div data-testid="loading">{text}</div>;
  };
});

// Mock Ant Design icons
jest.mock("@ant-design/icons", () => ({
  StarFilled: () => <span data-testid="star-icon" />,
  HeartOutlined: () => <span data-testid="heart-icon" />,
}));

describe("FeaturedProducts", () => {
  const mockProducts = [
    {
      id: 1,
      name: "Handmade Vase",
      price: 5000,
      category: "decor",
      images: [{ url: "/vase.jpg" }],
      stars: 5,
    },
    {
      id: 2,
      name: "Wooden Bowl",
      price: 3500,
      category: "kitchen",
      images: [{ url: "/bowl.jpg" }],
      stars: 4,
    },
    {
      id: 3,
      name: "Ceramic Plate",
      price: 2500,
      category: "kitchen",
      images: [{ url: "/plate.jpg" }],
      stars: 5,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<FeaturedProducts />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(
      screen.getByText("Loading featured products...")
    ).toBeInTheDocument();
  });

  it("should render section title", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    render(<FeaturedProducts />);

    expect(screen.getByText("Handcrafted Treasures")).toBeInTheDocument();
  });

  it("should render section badge", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    render(<FeaturedProducts />);

    expect(screen.getByText("Curated For You")).toBeInTheDocument();
  });

  it("should render section description", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    render(<FeaturedProducts />);

    expect(
      screen.getByText(/Discover our hand-picked selection/i)
    ).toBeInTheDocument();
  });

  it("should render all featured products", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    render(<FeaturedProducts />);

    expect(screen.getByText("Handmade Vase")).toBeInTheDocument();
    expect(screen.getByText("Wooden Bowl")).toBeInTheDocument();
    expect(screen.getByText("Ceramic Plate")).toBeInTheDocument();
  });

  it("should display product prices correctly", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    render(<FeaturedProducts />);

    expect(screen.getByText("$50.00")).toBeInTheDocument();
    expect(screen.getByText("$35.00")).toBeInTheDocument();
    expect(screen.getByText("$25.00")).toBeInTheDocument();
  });

  it("should render product images", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    render(<FeaturedProducts />);

    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "/vase.jpg");
    expect(images[1]).toHaveAttribute("src", "/bowl.jpg");
    expect(images[2]).toHaveAttribute("src", "/plate.jpg");
  });

  it("should use placeholder image when product has no image", () => {
    const productsWithoutImages = [{ ...mockProducts[0], images: [] }];

    (useQuery as jest.Mock).mockReturnValue({
      data: { products: productsWithoutImages },
      isLoading: false,
    });

    render(<FeaturedProducts />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/placeholder.jpg");
  });

  it("should have correct product links", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    render(<FeaturedProducts />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/products/1");
    expect(links[1]).toHaveAttribute("href", "/products/2");
    expect(links[2]).toHaveAttribute("href", "/products/3");
  });

  it("should render star icon", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    render(<FeaturedProducts />);

    const starIcons = screen.getAllByTestId("star-icon");
    expect(starIcons.length).toBeGreaterThan(0);
  });

  it("should render heart icons for products", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    render(<FeaturedProducts />);

    const heartIcons = screen.getAllByTestId("heart-icon");
    expect(heartIcons.length).toBeGreaterThan(0);
  });

  it("should handle empty products array", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: [] },
      isLoading: false,
    });

    render(<FeaturedProducts />);

    expect(screen.getByText("Handcrafted Treasures")).toBeInTheDocument();
    expect(screen.queryByText("Handmade Vase")).not.toBeInTheDocument();
  });

  it("should handle undefined data", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    render(<FeaturedProducts />);

    expect(screen.getByText("Handcrafted Treasures")).toBeInTheDocument();
  });

  it("should have grid layout", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    const { container } = render(<FeaturedProducts />);

    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });

  it("should have responsive grid classes", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    const { container } = render(<FeaturedProducts />);

    const grid = container.querySelector(".sm\\:grid-cols-2.lg\\:grid-cols-3");
    expect(grid).toBeInTheDocument();
  });

  it("should fetch featured products with correct query", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    render(<FeaturedProducts />);

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: ["featured-products"],
      })
    );
  });

  it("should have background decorative elements", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    const { container } = render(<FeaturedProducts />);

    const decorations = container.querySelectorAll(".bg-gradient-radial");
    expect(decorations.length).toBeGreaterThan(0);
  });

  it("should render decorative underline", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { products: mockProducts },
      isLoading: false,
    });

    const { container } = render(<FeaturedProducts />);

    const underline = container.querySelector(
      ".bg-gradient-to-r.from-\\[\\#c87941\\]"
    );
    expect(underline).toBeInTheDocument();
  });
});
