# SauceDemo Playwright Test Suite

Automated end-to-end tests for [Sauce Demo](https://www.saucedemo.com) built with Playwright and TypeScript.

## Prerequisites

- Node.js 18 or newer
- npm

## Install

Clone the repository and install dependencies:

```bash
npm install
```

Install the Playwright browsers if they are not already available on your machine:

```bash
npx playwright install
```

## Run Tests Locally

Run the full test suite:

```bash
npm test
```

Run the suite in headed mode to watch the browser:

```bash
npm run test-headed
```

Run Playwright directly if you want to bypass npm scripts:

```bash
npx playwright test
```

## Run Separate Test Files

Run the login tests only:

```bash
npm run test:login
```

Run the inventory tests only:

```bash
npm run test:inventory
```

Run any specific file directly:

```bash
npx playwright test tests/login.spec.ts
```

Run multiple specific files:

```bash
npx playwright test tests/login.spec.ts tests/inventory.spec.ts
```

## Run Tests With 1 Worker

Run the entire suite with one worker using npm script:

```bash
npm run test:one-worker
```

Run a specific file with one worker:

```bash
npx playwright test tests/login.spec.ts --workers=1
```

## Parallelism Default

By default, this project uses full parallel mode in Playwright configuration:

```ts
fullyParallel: true
```

This is configured in [playwright.config.ts](playwright.config.ts).

## Other Useful Commands

Type-check the project:

```bash
npm run type-check
```

Run linting:

```bash
npm run lint
```

Fix lint issues automatically:

```bash
npm run lint:fix
```

## Test Output

Playwright generates an HTML report after a run. Open it with:

```bash
npx playwright show-report
```

The report is also written to playwright-report/.

## Configuration

- Test files live in tests/
- The base URL is set to https://www.saucedemo.com
- The suite currently runs in Chromium

## Framework Structure

```text
saucedemo/
  data/
    datasets/
      inventorySortingSet.data.ts
      negativeLoginSet.data.ts
      positiveLoginSet.data.ts
  pageObjects/
    basePage.ts
    pageFixtures.ts
    pages/
      inventoryPage.ts
      loginPage.ts
  tests/
    inventory.spec.ts
    login.spec.ts
  utils/
    commonMethods.ts
  playwright.config.ts
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  tsconfig.test.json
  package.json
  README.md
```

## Notes

- npm test runs playwright test
- The repository uses the Playwright HTML reporter for test results