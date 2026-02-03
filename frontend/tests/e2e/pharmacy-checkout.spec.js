const { test, expect } = require('@playwright/test')

test('select pharmacy and proceed to checkout', async ({ page, baseURL }) => {
  await page.goto('/')

  // open pharmacies list
  await page.getByRole('button', { name: /Farmácias/i }).click()
  // wait for pharmacy cards
  await page.waitForSelector('.pc-pharmacy-card')

  // click Ver produtos on first pharmacy
  await page.locator('.pc-pharmacy-card').first().getByRole('button', { name: /Ver produtos/i }).click()

  // assert selected pharmacy is shown in checkout view
  await expect(page.locator('.pc-selected-pharmacy')).toContainText('Farmácia')

  // click Prosseguir and expect navigation to checkout.html
  await page.getByRole('button', { name: /Prosseguir/i }).click()
  await page.waitForURL('**/checkout.html')
  expect(page.url()).toContain('checkout.html')
})
