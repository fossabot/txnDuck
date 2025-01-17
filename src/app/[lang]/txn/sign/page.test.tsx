import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import i18nextClientMock from '@/app/lib/testing/i18nextClientMock';

// Mock react `use` function before modules that use it are imported
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: () => ({ t: (key: string) => key }),
}));
// Mock i18next before modules that use it are imported because it is used by a child component
jest.mock('react-i18next', () => i18nextClientMock);
// Mock navigation hooks because they are used by a child components
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({get: () => 'foo'})
}));
// Mock the wallet provider
jest.mock('../../components/WalletProvider.tsx', () => 'div');

import SignTxnPage from './page';

describe('Sign Transaction Page', () => {

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

  it('has connect wallet/sign button', () => {
    render(<SignTxnPage params={{lang: ''}} />);
    expect(screen.getByText('wallet.connect')).toBeInTheDocument();
  });

  it('has "compose transaction" (back) button', () => {
    render(<SignTxnPage params={{lang: ''}} />);
    expect(screen.getByText('sign_txn:compose_txn_btn')).toBeEnabled();
  });

  it('has disabled "send transaction" (next step) button if transaction is NOT signed', () => {
    sessionStorage.removeItem('signedTxn');
    render(<SignTxnPage params={{lang: ''}} />);
    expect(screen.getByText('send_txn_btn')).toHaveClass('btn-disabled');
  });

  it('has enabled "send transaction" (next step) button if transaction is signed', () => {
    sessionStorage.setItem('signedTxn', JSON.stringify('a signed transaction'));
    render(<SignTxnPage params={{lang: ''}} />);
    expect(screen.getByText('send_txn_btn')).not.toHaveClass('btn-disabled');
  });

});
