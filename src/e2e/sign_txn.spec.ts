import { test as base, expect } from '@playwright/test';
import { NavBarComponent as NavBar } from './shared/NavBarComponent';
import { LanguageSupport } from './shared/LanguageSupport';
import { SignTxnPage } from './pageModels/SignTxnPage';

// Extend basic test by providing a "signTxnPage" fixture.
// Code adapted from https://playwright.dev/docs/pom
const test = base.extend<{ signTxnPage: SignTxnPage }>({
  signTxnPage: async ({ page }, use) => {
    // Set up the fixture.
    const signTxnPage = new SignTxnPage(page);
    await signTxnPage.goto();
    // Use the fixture value in the test.
    await use(signTxnPage);
  },
});

test.describe('Sign Transaction Page', () => {

  test('has footer', async ({ signTxnPage /* Adding this loads the page */, page }) => {
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test.describe('Language Support', () => {
    (new LanguageSupport({
      en: { body: /Sign/, title: /Sign/ },
      es: { body: /firme/, title: /firme/ },
    })).check(test, SignTxnPage.url);
  });

  test.describe('Nav Bar', () => {
    NavBar.check(test, SignTxnPage.getFullUrl());
  });

});
