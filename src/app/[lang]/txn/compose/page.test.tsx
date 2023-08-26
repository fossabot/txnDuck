import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// Mock react `use` function before modules that use it are imported
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: () => ({ t: (key: string) => key }),
}));

import ComposeTxnPage from "./page";

describe("Compose Transaction Page", () => {

  it("renders without crashing", () => {
    render(<ComposeTxnPage params={{lang: ''}} />);
    expect(screen.getByText(/coming_soon/)).toBeInTheDocument();
  });

  it("has builder steps", () => {
    render(<ComposeTxnPage params={{lang: ''}} />);
    expect(screen.getByText(/builder_steps\.compose/)).toBeInTheDocument();
  });

  it("has page title heading", () => {
    render(<ComposeTxnPage params={{lang: ''}} />);
    const pageTitleHeading = screen.getByRole('heading', { level: 1 });
    expect(pageTitleHeading).not.toBeEmptyDOMElement();
  });

  it("has instructions", () => {
    render(<ComposeTxnPage params={{lang: ''}} />);
    expect(screen.getByText(/instructions/)).toBeInTheDocument();
  });

});
