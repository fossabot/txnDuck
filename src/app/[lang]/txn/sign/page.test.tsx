import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import i18nextClientMock from "@/app/lib/testing/i18nextClientMock";

// Mock react `use` function before modules that use it are imported
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: () => ({ t: (key: string) => key }),
}));
// Mock i18next before modules that use it are imported. This needs to be mocked because it is a
// dependency of a child client component.
jest.mock('react-i18next', () => i18nextClientMock);

import SignTxnPage from "./page";

describe("Sign Transaction Page", () => {

  it('has builder steps', () => {
    render(<SignTxnPage params={{lang: ''}} />);
    expect(screen.getByText(/builder_steps\.sign/)).toBeInTheDocument();
  });

  it('has page title heading', () => {
    render(<SignTxnPage params={{lang: ''}} />);
    expect(screen.getByRole('heading', { level: 1 })).not.toBeEmptyDOMElement();
  });

  it('has transaction information', () => {
    render(<SignTxnPage params={{lang: ''}} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

});
