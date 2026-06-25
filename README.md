# SauceDemo Playwright Test Suite

Automated end-to-end tests for SauceDemo using Playwright and TypeScript.

## Prerequisites

- Node.js 18+
- npm

## Install

1. Install dependencies:
   npm install
2. Install Playwright browsers (if needed):
   npx playwright install

## Run Tests

1. Run all projects:
   npm test
2. Run headed mode:
   npm run test-headed
3. Run with one worker:
   npm run test:one-worker

## Project Model in Playwright Config

The suite is split into three Playwright projects in playwright.config.ts:

1. setup-session-cookie

   - Runs only setup tests (*.setup.ts)
   - Creates authenticated storage state for non-login tests

2. chromium-login

   - Runs only login specs (login.spec.ts)
   - Does not depend on setup-auth state

3. chromium-authenticated

   - Runs all tests except login and setup specs
   - Depends on setup-session-cookie
   - Uses storageState from playwright/.auth/session-cookie.json

This enables login tests to validate real authentication flows while other specs reuse authenticated state.

## Setup Auth Flow

1. Setup test file:
   tests/setup/session-cookie.setup.ts
2. Cookie helper method:
   utils/commonMethods.ts (createSaucedemoSessionCookie)
3. Storage state output file:
   playwright/.auth/session-cookie.json

## Useful Commands

1. Login tests only:
   npm run test:login
2. Inventory tests only:
   npm run test:inventory
3. Direct Playwright run:
   npx playwright test
4. Open HTML report:
   npx playwright show-report
5. Type-check:
   npm run type-check
6. Lint:
   npm run lint
7. Fix lint issues:
   npm run lint:fix

## Test Structure

- tests/login.spec.ts
- tests/inventory.spec.ts
- tests/setup/session-cookie.setup.ts

## Framework Structure

```text
saucedemo/
  data/
    datasets/
      inventorySortingSet.data.ts
      negativeLoginSet.data.ts
      positiveLoginSet.data.ts
   types/
      sortOptionTypes.ts
  pageObjects/
    components/
      footer.ts
      header.ts
    modals/
      menuModal.ts
    pages/
      cartPage.ts
      checkoutCompletePage.ts
      checkoutOnePage.ts
      checkoutTwoPage.ts
      inventoryPage.ts
      loginPage.ts
  tests/
    setup/
      auth.setup.ts
    inventory.spec.ts
    login.spec.ts
  utils/
    commonMethods.ts
  playwright/
    .auth/
      .gitkeep
  playwright.config.ts
```

## Notes

- Base URL is https://www.saucedemo.com.
- HTML reports are generated under playwright-report/.
- Test artifacts are generated under test-results/.
