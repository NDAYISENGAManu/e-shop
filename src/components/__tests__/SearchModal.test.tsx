import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchModal from "../SearchModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Mock dependencies
jest.mock("@tanstack/react-query");
jest.mock("axios");
jest.mock("next/link", () => {
  return ({ children, href, onClick }: any) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
});

// Mock Ant Design icons
jest.mock("@ant-design/icons", () => ({
  SearchOutlined: () => <span data-testid="search-icon" />,
}));

describe("SearchModal", () => {
  const mockProducts = [
    {
      id: 1,
      name: "Handmade Chair",
      category: "office",
      price: 15000,
      images: [{ url: "/chair.jpg" }],
    },
    {
      id: 2,
      name: "Wooden Table",
      category: "living room",
      price: 25000,
      images: [{ url: "/table.jpg" }],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
  });

  it("should render search button", () => {
    render(<SearchModal />);

    const button = screen.getByTitle("Search products");
    expect(button).toBeInTheDocument();
  });

  it("should open modal when search button is clicked", () => {
    render(<SearchModal />);

    const button = screen.getByTitle("Search products");
    fireEvent.click(button);

    expect(screen.getByText("Search Handcrafted Products")).toBeInTheDocument();
  });

  it("should render search input in modal", () => {
    render(<SearchModal />);

    const button = screen.getByTitle("Search products");
    fireEvent.click(button);

    expect(
      screen.getByPlaceholderText("Search for artisan products...")
    ).toBeInTheDocument();
  });

  it("should update search term on input change", () => {
    render(<SearchModal />);

    const button = screen.getByTitle("Search products");
    fireEvent.click(button);

    const input = screen.getByPlaceholderText("Search for artisan products...");
    fireEvent.change(input, { target: { value: "chair" } });

    expect(input).toHaveValue("chair");
  });

  it("should display loading state", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
    });

    render(<SearchModal />);

    const button = screen.getByTitle("Search products");
    fireEvent.click(button);

    const input = screen.getByPlaceholderText("Search for artisan products...");
    fireEvent.change(input, { target: { value: "test" } });

    expect(
      screen.getByText("Searching our artisan collection...")
    ).toBeInTheDocument();
  });

  it("should display search results", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
    });

    render(<SearchModal />);

    const button = screen.getByTitle("Search products");
    fireEvent.click(button);

    const input = screen.getByPlaceholderText("Search for artisan products...");
    fireEvent.change(input, { target: { value: "chair" } });

    expect(screen.getByText("Handmade Chair")).toBeInTheDocument();
    expect(screen.getByText("Wooden Table")).toBeInTheDocument();
  });

  it("should display product prices correctly", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
    });

    render(<SearchModal />);

    const button = screen.getByTitle("Search products");
    fireEvent.click(button);

    const input = screen.getByPlaceholderText("Search for artisan products...");
    fireEvent.change(input, { target: { value: "chair" } });

    expect(screen.getByText("$150.00")).toBeInTheDocument();
    expect(screen.getByText("$250.00")).toBeInTheDocument();
  });

  it("should display product categories", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
    });

    render(<SearchModal />);

    const button = screen.getByTitle("Search products");
    fireEvent.click(button);

    const input = screen.getByPlaceholderText("Search for artisan products...");
    fireEvent.change(input, { target: { value: "chair" } });

    expect(screen.getByText("office")).toBeInTheDocument();
    expect(screen.getByText("living room")).toBeInTheDocument();
  });

  it("should have correct href for product links", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false,
    });

    render(<SearchModal />);

    const button = screen.getByTitle("Search products");
    fireEvent.click(button);

    const input = screen.getByPlaceholderText("Search for artisan products...");
    fireEvent.change(input, { target: { value: "chair" } });

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/products/1");
    expect(links[1]).toHaveAttribute("href", "/products/2");
  });
});
