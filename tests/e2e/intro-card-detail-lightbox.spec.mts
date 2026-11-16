import { expect, test } from "@playwright/test";
import { gotoArtwork, gotoFeed, ITEMS } from "./harness.mts";

test("the whole Mission, Connect and Support cards activate their controls", async ({
  page,
}) => {
  await gotoFeed(page);
  const cards = page.locator("#feed .slide.intro .action-card");
  await expect(cards).toHaveCount(3);

  await cards.nth(0).locator(".icon-chip").click();
  await expect(page).toHaveURL(/\/pages\/get-involved\.html$/);

  await gotoFeed(page);
  const refreshedCards = page.locator("#feed .slide.intro .action-card");
  await refreshedCards.nth(1).locator(".action-card-body p").click();
  await expect(page.locator("#newsletterDialog")).toHaveClass(/open/);

  await page.keyboard.press("Escape");
  await gotoFeed(page);
  await page.locator("#feed .slide.intro .action-card").nth(2)
    .locator(".icon-chip").click();
  await expect(page).toHaveURL(/\/pages\/support\.html$/);
});

test("detail artwork opens the lightbox and Back returns to the detail panel", async ({
  page,
}) => {
  const item = ITEMS.find((candidate: any) => candidate.img && candidate.title);
  expect(item, "fixture needs a titled artwork with an image").toBeTruthy();

  await gotoArtwork(page, item.source, item.id);
  const detail = page.locator("#detailModal");
  await expect(detail).toHaveClass(/open/);
  await detail.locator(".d-frame img").click();
  await expect(page.locator("#lightbox")).toHaveClass(/open/);
  await page.goBack();
  await expect(page.locator("#lightbox")).not.toHaveClass(/open/);
  await expect(detail).toHaveClass(/open/);
});