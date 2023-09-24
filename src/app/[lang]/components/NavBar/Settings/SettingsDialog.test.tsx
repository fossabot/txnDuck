/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider as ToastProvider, Viewport as ToastViewport } from '@radix-ui/react-toast';
import i18nextClientMock from "@/app/lib/testing/i18nextClientMock";

// Mock i18next before modules that use it are imported
jest.mock('react-i18next', () => i18nextClientMock);

import SettingsDialog from './SettingsDialog';

describe('Settings Dialog', () => {

  it('appears when trigger button is clicked', async () => {
    render(
      <ToastProvider>
        <SettingsDialog />
        <ToastViewport />
      </ToastProvider>
    );

    await userEvent.click(screen.getByRole('button'));

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toBeVisible();
  });

  it('has heading', () => {
    render(
      <ToastProvider>
        <SettingsDialog open={true} />
        <ToastViewport />
      </ToastProvider>
    );
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('settings.heading');
  });

  it('has "close" icon button', async () => {
    render(
      <ToastProvider>
        <SettingsDialog open={true} />
        <ToastViewport />
      </ToastProvider>
    );
    await userEvent.click(screen.getByTitle('close'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has "reset" button', () => {
    render(
      <ToastProvider>
        <SettingsDialog open={true} />
        <ToastViewport />
      </ToastProvider>
    );
    expect(screen.getByText('settings.reset_button')).toBeInTheDocument();
  });

  it('can reset to defaults', async () => {
    render(
      <ToastProvider>
        <SettingsDialog open={true} />
        <ToastViewport />
      </ToastProvider>
    );
    // Change settings to non-default values
    await userEvent.click(screen.getByLabelText('settings.theme_switcher.light'));

    // Click reset button
    await userEvent.click(screen.getByText('settings.reset_button'));
    // TODO: Add more settings here

    // Toast notification
    expect(screen.getByText('settings.reset_message')).toBeInTheDocument();

    // Check settings
    expect(screen.getByLabelText('settings.theme_switcher.auto')).toBeChecked();
    // TODO: Add more settings here
  });

  it('has theme mode setting', () => {
    render(
      <ToastProvider>
        <SettingsDialog open={true} />
        <ToastViewport />
      </ToastProvider>
    );
    expect(screen.getByText(/settings.theme_switcher.label/)).toBeInTheDocument();
  });

  it('notifies when theme is changed', async () => {
    render(
      <ToastProvider>
        <SettingsDialog open={true} />
        <ToastViewport />
      </ToastProvider>
    );
    // Change theme from '' (default) --> 'light'
    await userEvent.click(screen.getByLabelText('settings.theme_switcher.light'));
    expect(screen.getByText('settings.saved_message')).toBeInTheDocument();
  });

});