import { render, screen } from "@testing-library/react";
import Loading from "../Loading";

// Mock Ant Design Spin component
jest.mock("antd", () => ({
  Spin: ({ size }: { size: string }) => (
    <div data-testid="spin-loader" data-size={size} />
  ),
}));

describe("Loading", () => {
  it("should render with default props", () => {
    render(<Loading />);

    expect(screen.getByTestId("spin-loader")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render with custom text", () => {
    render(<Loading text="Please wait" />);

    expect(screen.getByText("Please wait...")).toBeInTheDocument();
  });

  it("should render without text when text is empty string", () => {
    render(<Loading text="" />);

    expect(screen.queryByText(/\.\.\./)).not.toBeInTheDocument();
  });

  it("should apply fullScreen class when fullScreen is true", () => {
    const { container } = render(<Loading fullScreen={true} />);

    const wrapper = container.querySelector(".min-h-screen");
    expect(wrapper).toBeInTheDocument();
  });

  it("should not apply fullScreen class when fullScreen is false", () => {
    const { container } = render(<Loading fullScreen={false} />);

    const wrapper = container.querySelector(".min-h-\\[400px\\]");
    expect(wrapper).toBeInTheDocument();
  });

  it("should render Spin component with large size", () => {
    render(<Loading />);

    const spinner = screen.getByTestId("spin-loader");
    expect(spinner).toHaveAttribute("data-size", "large");
  });

  it("should have proper flex layout classes", () => {
    const { container } = render(<Loading />);

    const wrapper = container.querySelector(
      ".flex.flex-col.items-center.justify-center"
    );
    expect(wrapper).toBeInTheDocument();
  });

  it("should apply animate-pulse to text", () => {
    const { container } = render(<Loading text="Loading data" />);

    const textElement = container.querySelector(".animate-pulse");
    expect(textElement).toBeInTheDocument();
    expect(textElement?.textContent).toBe("Loading data...");
  });

  it("should handle both fullScreen and custom text together", () => {
    const { container } = render(<Loading text="Fetching" fullScreen={true} />);

    expect(screen.getByText("Fetching...")).toBeInTheDocument();
    expect(container.querySelector(".min-h-screen")).toBeInTheDocument();
  });
});
