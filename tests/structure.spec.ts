import { expect, test } from "@playwright/test";

test("desktop structure stays close to the measured reference", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => {
    localStorage.setItem("depth-theme", "light");
  });
  await page.goto("/");

  const header = page.locator("header");
  await expect(header).toBeVisible();
  const headerBox = await header.boundingBox();
  expect(headerBox?.height).toBeGreaterThan(60);
  expect(headerBox?.height).toBeLessThan(72);

  const h1 = page.locator("h1");
  const fontSize = await h1.evaluate(
    (element) => getComputedStyle(element).fontSize,
  );
  const lineHeight = await h1.evaluate(
    (element) => getComputedStyle(element).lineHeight,
  );
  expect(fontSize).toBe("46px");
  expect(lineHeight).toBe("46px");

  const button = page
    .locator("main section")
    .first()
    .getByRole("link", { name: "Join the Pilot" });
  const buttonBox = await button.boundingBox();
  expect(buttonBox?.height).toBeGreaterThan(38);
  expect(buttonBox?.height).toBeLessThan(46);

  const card = page.locator("article").first();
  await card.scrollIntoViewIfNeeded();
  const radius = await card.evaluate(
    (element) => getComputedStyle(element).borderRadius,
  );
  expect(radius).toBe("12px");
});

test("wide desktop keeps the 1088 column centered", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  const x = await page
    .locator("h1")
    .evaluate((element) => element.getBoundingClientRect().x);
  expect(x).toBeGreaterThan(400);
  expect(x).toBeLessThan(430);
});

test("mobile hero uses the smaller headline", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const fontSize = await page
    .locator("h1")
    .evaluate((element) => getComputedStyle(element).fontSize);
  expect(fontSize).toBe("34px");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
});

test("pilot form does not confirm until the API writes", async ({ page }) => {
  await page.goto("/pilot");
  await page.getByLabel("Name").fill("Ada Lovelace");
  await page.getByLabel("Work email").fill("ada@example.com");
  await page.getByLabel("Company").fill("Analytical Engines");
  await page.getByLabel("Role").fill("Engineer");
  await page
    .getByLabel("Current Review Process")
    .fill("Drawings circulate by email.");
  await page.getByLabel("Fully local").check();
  await page.getByRole("button", { name: "Join the Pilot" }).click();
  await expect(page.getByRole("status")).toContainText("Request received");
});
