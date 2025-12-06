import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

// Mock Ant Design icons
jest.mock("@ant-design/icons", () => ({
  HeartOutlined: () => <span data-testid="heart-icon" />,
  InstagramOutlined: () => <span data-testid="instagram-icon" />,
  FacebookOutlined: () => <span data-testid="facebook-icon" />,
  TwitterOutlined: () => <span data-testid="twitter-icon" />,
}));

describe("Footer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the brand name", () => {
    render(<Footer />);

    const brandNames = screen.getAllByText("Manu Handcraft");
    expect(brandNames.length).toBeGreaterThan(0);
  });

  it("should render the brand tagline", () => {
    render(<Footer />);

    expect(screen.getByText("Made with love")).toBeInTheDocument();
  });

  it("should render brand description", () => {
    render(<Footer />);

    expect(
      screen.getByText(/Curating authentic handmade treasures/i)
    ).toBeInTheDocument();
  });

  it("should render Quick Links section", () => {
    render(<Footer />);

    expect(screen.getByText("Quick Links")).toBeInTheDocument();
  });

  it("should render all navigation links", () => {
    render(<Footer />);

    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Track Order")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("should have correct href attributes for navigation links", () => {
    render(<Footer />);

    expect(screen.getByText("About Us").closest("a")).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getByText("Shop").closest("a")).toHaveAttribute(
      "href",
      "/products"
    );
    expect(screen.getByText("Track Order").closest("a")).toHaveAttribute(
      "href",
      "/orders"
    );
    expect(screen.getByText("Contact").closest("a")).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("should render Connect With Us section", () => {
    render(<Footer />);

    expect(screen.getByText("Connect With Us")).toBeInTheDocument();
  });

  it("should render social media icons", () => {
    render(<Footer />);

    expect(screen.getByTestId("instagram-icon")).toBeInTheDocument();
    expect(screen.getByTestId("facebook-icon")).toBeInTheDocument();
    expect(screen.getByTestId("twitter-icon")).toBeInTheDocument();
  });

  it("should render social media description", () => {
    render(<Footer />);

    expect(
      screen.getByText("Follow us for artisan stories and new collections")
    ).toBeInTheDocument();
  });

  it("should render heart icons", () => {
    render(<Footer />);

    const heartIcons = screen.getAllByTestId("heart-icon");
    expect(heartIcons.length).toBeGreaterThan(0);
  });

  it("should render current year in copyright", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(currentYear.toString()))
    ).toBeInTheDocument();
  });

  it("should render copyright text", () => {
    render(<Footer />);

    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  it("should render crafted by message", () => {
    render(<Footer />);

    expect(screen.getByText(/Crafted with/i)).toBeInTheDocument();
    expect(screen.getByText(/by Manu Handcraft/i)).toBeInTheDocument();
  });

  it("should have proper footer structure with three columns on desktop", () => {
    const { container } = render(<Footer />);

    // Check for grid layout
    const gridContainer = container.querySelector(
      ".grid.grid-cols-1.md\\:grid-cols-3"
    );
    expect(gridContainer).toBeInTheDocument();
  });

  it("should render SVG wave decoration", () => {
    const { container } = render(<Footer />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should have responsive footer layout", () => {
    const { container } = render(<Footer />);

    // Check for responsive classes
    const bottomBar = container.querySelector(".flex-col.md\\:flex-row");
    expect(bottomBar).toBeInTheDocument();
  });
});
