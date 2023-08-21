import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ComposeTxnPage from "./page";

// This mock makes sure any components using the translate hook can use it without a warning being
// shown
// From https://react.i18next.com/misc/testing
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  Trans: ({ lng }: { lng: string }) => lng,
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  }
}));

describe("Compose Transaction Page", () => {
  it("should render without crashing", () => {
    render(<ComposeTxnPage params={{lang: ''}} />);
    expect(screen.getByText(/coming_soon/)).toBeInTheDocument();
  });
});
