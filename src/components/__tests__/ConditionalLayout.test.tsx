import { render, screen } from "@testing-library/react";
import ConditionalLayout from "../ConditionalLayout";
import { usePathname } from "next/navigation";

// Mock dependencies
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock components
jest.mock("../Navbar", () => {
  return function MockNavbar() {
    return <nav data-testid="navbar">Navbar</nav>;
  };
});

jest.mock("../Footer", () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

jest.mock("../PasswordChangeWrapper", () => {
  return function MockPasswordChangeWrapper({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div data-testid="password-wrapper">{children}</div>;
  };
});

describe("ConditionalLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render children", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(
      <ConditionalLayout>
        <div>Test Content</div>
      </ConditionalLayout>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should wrap children in PasswordChangeWrapper", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(
      <ConditionalLayout>
        <div>Test Content</div>
      </ConditionalLayout>
    );

    expect(screen.getByTestId("password-wrapper")).toBeInTheDocument();
  });

  it("should render Navbar and Footer for non-admin routes", () => {
    (usePathname as jest.Mock).mockReturnValue("/products");

    render(
      <ConditionalLayout>
        <div>Product Page</div>
      </ConditionalLayout>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should not render Navbar and Footer for admin routes", () => {
    (usePathname as jest.Mock).mockReturnValue("/admin");

    render(
      <ConditionalLayout>
        <div>Admin Page</div>
      </ConditionalLayout>
    );

    expect(screen.queryByTestId("navbar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer")).not.toBeInTheDocument();
  });

  it("should not render Navbar and Footer for admin sub-routes", () => {
    (usePathname as jest.Mock).mockReturnValue("/admin/products");

    render(
      <ConditionalLayout>
        <div>Admin Products</div>
      </ConditionalLayout>
    );

    expect(screen.queryByTestId("navbar")).not.toBeInTheDocument();
    expect(screen.queryByTestId("footer")).not.toBeInTheDocument();
  });

  it("should render Navbar and Footer for home page", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(
      <ConditionalLayout>
        <div>Home Page</div>
      </ConditionalLayout>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should render Navbar and Footer for about page", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");

    render(
      <ConditionalLayout>
        <div>About Page</div>
      </ConditionalLayout>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should render Navbar and Footer for cart page", () => {
    (usePathname as jest.Mock).mockReturnValue("/cart");

    render(
      <ConditionalLayout>
        <div>Cart Page</div>
      </ConditionalLayout>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should render Navbar and Footer for login page", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");

    render(
      <ConditionalLayout>
        <div>Login Page</div>
      </ConditionalLayout>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should handle null pathname gracefully", () => {
    (usePathname as jest.Mock).mockReturnValue(null);

    render(
      <ConditionalLayout>
        <div>Content</div>
      </ConditionalLayout>
    );

    // Should default to showing Navbar and Footer when pathname is null
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("should maintain correct component order", () => {
    (usePathname as jest.Mock).mockReturnValue("/products");

    const { container } = render(
      <ConditionalLayout>
        <main>Main Content</main>
      </ConditionalLayout>
    );

    const wrapper = container.firstChild;
    expect(wrapper?.firstChild).toHaveAttribute("data-testid", "navbar");
    expect(wrapper?.lastChild).toHaveAttribute("data-testid", "footer");
  });

  it("should render multiple children correctly", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(
      <ConditionalLayout>
        <div>First Child</div>
        <div>Second Child</div>
      </ConditionalLayout>
    );

    expect(screen.getByText("First Child")).toBeInTheDocument();
    expect(screen.getByText("Second Child")).toBeInTheDocument();
  });
});
