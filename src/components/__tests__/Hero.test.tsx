import { render, screen } from "@testing-library/react";
import Hero from "../Hero";

// Mock Next.js Link
jest.mock("next/link", () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

describe("Hero", () => {
  it("should render the hero section", () => {
    render(<Hero />);

    expect(screen.getByText("Discover the")).toBeInTheDocument();
  });

  it("should render main headline", () => {
    render(<Hero />);

    expect(screen.getByText("Discover the")).toBeInTheDocument();
    expect(screen.getByText("Art of Handcraft")).toBeInTheDocument();
  });

  it("should render decorative badge", () => {
    render(<Hero />);

    expect(screen.getByText("✨ Made with Love & Care")).toBeInTheDocument();
  });

  it("should render handwritten accent text", () => {
    render(<Hero />);

    expect(screen.getByText("Made by passionate artisans")).toBeInTheDocument();
  });

  it("should render description paragraph", () => {
    render(<Hero />);

    expect(
      screen.getByText(/Every piece tells a unique story/i)
    ).toBeInTheDocument();
  });

  it("should render Explore Collection button", () => {
    render(<Hero />);

    expect(screen.getByText("Explore Collection")).toBeInTheDocument();
  });

  it("should render Our Story button", () => {
    render(<Hero />);

    expect(screen.getByText("Our Story")).toBeInTheDocument();
  });

  it("should have correct link to products page", () => {
    render(<Hero />);

    const exploreButton = screen.getByText("Explore Collection").closest("a");
    expect(exploreButton).toHaveAttribute("href", "/products");
  });

  it("should have correct link to about page", () => {
    render(<Hero />);

    const aboutButton = screen.getByText("Our Story").closest("a");
    expect(aboutButton).toHaveAttribute("href", "/about");
  });

  it("should render hero image", () => {
    render(<Hero />);

    const image = screen.getByAltText("Handcrafted artisan products");
    expect(image).toBeInTheDocument();
  });

  it("should render trust indicators", () => {
    render(<Hero />);

    expect(screen.getByText("100% Handmade")).toBeInTheDocument();
    expect(screen.getByText("Eco-Friendly")).toBeInTheDocument();
  });

  it("should have background decorative elements", () => {
    const { container } = render(<Hero />);

    // Check for SVG decoration
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should have responsive grid layout", () => {
    const { container } = render(<Hero />);

    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });

  it("should render floating badge with unique items count", () => {
    render(<Hero />);

    expect(screen.getByText("500+")).toBeInTheDocument();
    expect(screen.getByText("Unique Items")).toBeInTheDocument();
  });

  it("should have proper semantic structure", () => {
    const { container } = render(<Hero />);

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();

    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });

  it("should apply gradient backgrounds", () => {
    const { container } = render(<Hero />);

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-gradient-to-br");
  });
});
