import { render, screen } from "@testing-library/react";
import MetricBox from ".";

describe("MetricBox Component", () => {
  const metricProps = {
    count: 42,
    title: "Test Metric",
  };

  test("renders count and title correctly", () => {
    render(<MetricBox {...metricProps} />);

    expect(screen.getByText(metricProps.count)).toBeInTheDocument();
    expect(screen.getByText(metricProps.title)).toBeInTheDocument();
  });

  test("renders without count", () => {
    render(<MetricBox title="Test Metric" count={undefined} />);

    expect(screen.getByText(0)).toBeInTheDocument();
    expect(screen.getByText("Test Metric")).toBeInTheDocument();
  });

  test("applies correct classes to count and title", () => {
    render(<MetricBox {...metricProps} />);
    
    const countElement = screen.getByText(metricProps.count);
    const titleElement = screen.getByText(metricProps.title);

    expect(countElement).toHaveClass("text-4xl text-teal-green font-medium leading-11");
    expect(titleElement).toHaveClass("text-xxs tracking-[.14px] leading-[10px] text-center");
  });

  test("applies correct classes to container", () => {
    render(<MetricBox {...metricProps} />);
    
    const containerElement = screen.getByText(metricProps.count).closest('div');
    
    expect(containerElement).toHaveClass("flex items-center flex-col px-1.5 pb-5 pt-4 bg-white rounded-lg shadow-small-box w-[90px] h-[90px]");
  });
});
