import { test, expect } from '@playwright/test'

test.describe('DreamQuest Flow', () => {
  test('should navigate to dreamquest page', async ({ page }) => {
    await page.goto('/')

    await page.click('text=Start Dreaming')
    await expect(page).toHaveURL('/dreamquest')
    await expect(page.locator('h1')).toContainText('DreamQuest')
  })

  test('should show validation error for short dream text', async ({ page }) => {
    await page.goto('/dreamquest')

    // Fill form with short text
    await page.fill('textarea[id="dreamText"]', 'Short')
    await page.selectOption('select[id="style"]', 'lowpoly')
    await page.selectOption('select[id="mood"]', 'mystic')
    await page.selectOption('select[id="length"]', 'short')

    await page.click('button[type="submit"]')

    // Should show validation error
    await expect(page.locator('text=/at least 30 characters/i')).toBeVisible()
  })

  test('should submit valid dream and show progress', async ({ page }) => {
    await page.goto('/dreamquest')

    // Fill form with valid data
    await page.fill(
      'textarea[id="dreamText"]',
      'I was flying over a magical forest at night. A glowing bird appeared and guided me to a floating house.'
    )
    await page.selectOption('select[id="style"]', 'lowpoly')
    await page.selectOption('select[id="mood"]', 'mystic')
    await page.selectOption('select[id="length"]', 'short')

    // Mock API response
    await page.route('**/v1/jobs', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          job_id: 'test-job-123',
          status: 'queued',
        }),
      })
    })

    await page.click('button[type="submit"]')

    // Should show progress indicator
    await expect(page.locator('text=/generating/i')).toBeVisible({
      timeout: 5000,
    })
  })
})
