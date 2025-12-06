import { render, screen } from "@testing-library/react";
import Services from "../Services";

// Mock Ant Design icons
jest.mock("@ant-design/icons", () => ({
  HeartOutlined: () => <span data-testid="heart-icon" />,
  SafetyOutlined: () => <span data-testid="safety-icon" />,
  TruckOutlined: () => <span data-testid="truck-icon" />,
  CustomerServiceOutlined: () => <span data-testid="customer-service-icon" />,
}));

describe("Services", () => {
  it("should render the services section", () => {
    render(<Services />);

    expect(screen.getByText(/Why Choose/i)).toBeInTheDocument();
  });

  it('should render section title with "Handcraft"', () => {
    render(<Services />);

    expect(screen.getByText("Handcraft")).toBeInTheDocument();
  });

  it("should render section description", () => {
    render(<Services />);

    expect(
      screen.getByText(
        "Experience the difference that authentic craftsmanship makes"
      )
    ).toBeInTheDocument();
  });

  it("should render all four service cards", () => {
    render(<Services />);

    expect(screen.getByText("Handmade With Love")).toBeInTheDocument();
    expect(screen.getByText("Quality Guaranteed")).toBeInTheDocument();
    expect(screen.getByText("Fast & Safe Delivery")).toBeInTheDocument();
    expect(screen.getByText("Dedicated Support")).toBeInTheDocument();
  });

  it("should render service descriptions", () => {
    render(<Services />);

    expect(
      screen.getByText(/Every piece is crafted by skilled artisans/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We carefully curate each item/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Your handcrafted treasures are packaged with care/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Our friendly team is here to help/i)
    ).toBeInTheDocument();
  });

  it("should render all service icons", () => {
    render(<Services />);

    expect(screen.getByTestId("heart-icon")).toBeInTheDocument();
    expect(screen.getByTestId("safety-icon")).toBeInTheDocument();
    expect(screen.getByTestId("truck-icon")).toBeInTheDocument();
    expect(screen.getByTestId("customer-service-icon")).toBeInTheDocument();
  });

  it("should have grid layout for services", () => {
    const { container } = render(<Services />);

    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });

  it("should have responsive grid classes", () => {
    const { container } = render(<Services />);

    const grid = container.querySelector(".md\\:grid-cols-2.lg\\:grid-cols-4");
    expect(grid).toBeInTheDocument();
  });

  it("should render decorative underline", () => {
    const { container } = render(<Services />);

    const underline = container.querySelector(
      ".bg-gradient-to-r.from-\\[\\#c87941\\]"
    );
    expect(underline).toBeInTheDocument();
  });

  it("should have proper section structure", () => {
    const { container } = render(<Services />);

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("py-24");
  });

  it("should render background decoration", () => {
    const { container } = render(<Services />);

    const backgroundDecoration = container.querySelector(".bg-gradient-radial");
    expect(backgroundDecoration).toBeInTheDocument();
  });

  it("should have hover effects classes", () => {
    const { container } = render(<Services />);

    const cards = container.querySelectorAll(".group");
    expect(cards.length).toBe(4);
  });

  it("should render service cards with white background", () => {
    const { container } = render(<Services />);

    const whiteBackgrounds = container.querySelectorAll(".bg-white");
    expect(whiteBackgrounds.length).toBeGreaterThan(0);
  });

  it("should apply rounded corners to cards", () => {
    const { container } = render(<Services />);

    const roundedCards = container.querySelectorAll(".rounded-2xl");
    expect(roundedCards.length).toBeGreaterThan(0);
  });

  it("should have icon containers with circular shape", () => {
    const { container } = render(<Services />);

    const iconContainers = container.querySelectorAll(".rounded-full");
    expect(iconContainers.length).toBeGreaterThan(0);
  });

  it("should display all service titles with correct styling", () => {
    const { container } = render(<Services />);

    const titles = [
      "Handmade With Love",
      "Quality Guaranteed",
      "Fast & Safe Delivery",
      "Dedicated Support",
    ];

    titles.forEach((title) => {
      const element = screen.getByText(title);
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("H3");
    });
  });

  it("should have gradient background on section", () => {
    const { container } = render(<Services />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-gradient-to-b");
  });
});
