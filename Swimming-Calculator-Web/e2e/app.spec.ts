import { test, expect } from '@playwright/test'

test.describe('Triathlon Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page loads with title and all three sports', async ({ page }) => {
    await expect(page.getByText('Triathlon Calculator')).toBeVisible()
    await expect(page.getByText('Swim (meters)')).toBeVisible()
    await expect(page.getByText('Cycling (km)')).toBeVisible()
    await expect(page.getByText('Running (km)')).toBeVisible()
  })

  test('preset buttons are visible and Olympic is active by default', async ({ page }) => {
    await expect(page.getByText('Sprint')).toBeVisible()
    await expect(page.getByText('Olympic')).toBeVisible()
    await expect(page.getByText('Half Ironman')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Ironman', exact: true })).toBeVisible()

    const olympicBtn = page.getByText('Olympic')
    await expect(olympicBtn).toHaveClass(/bg-blue-600/)

    const distInputs = page.getByRole('textbox')
    await expect(distInputs.nth(3)).toHaveValue('1500')
    await expect(distInputs.nth(4)).toHaveValue('40')
    await expect(distInputs.nth(5)).toHaveValue('10')
  })

  test('preset buttons set all three distances', async ({ page }) => {
    await page.getByText('Sprint').click()

    const distInputs = page.getByRole('textbox')
    await expect(distInputs.nth(3)).toHaveValue('750')
    await expect(distInputs.nth(4)).toHaveValue('20')
    await expect(distInputs.nth(5)).toHaveValue('5')
  })

  test('calculates all three results when Calculate is clicked', async ({ page }) => {
    const inputs = page.getByRole('textbox')
    await inputs.nth(1).fill('20')
    await inputs.nth(2).fill('30')
    await page.getByText('Calculate').click()

    await expect(page.getByText('Swim Pace')).toBeVisible()
    await expect(page.getByText('Speed')).toBeVisible()
    await expect(page.getByText('Running Pace')).toBeVisible()
  })

  test('swim pace: 1500m in 20:30 = 01:22 min/100mts', async ({ page }) => {
    const inputs = page.getByRole('textbox')
    await inputs.nth(1).fill('20')
    await inputs.nth(2).fill('30')
    await page.getByText('Calculate').click()

    await expect(page.getByText('01:22 min/100mts')).toBeVisible()
  })

  test('cycling speed: 40km in 1:00 = 40.0 km/h', async ({ page }) => {
    const inputs = page.getByRole('textbox')
    await inputs.nth(0).fill('1')
    await page.getByText('Calculate').click()

    await expect(page.getByText('40.0 km/h')).toBeVisible()
  })

  test('running pace: 10km in 50:00 = 05:00 min/km', async ({ page }) => {
    const inputs = page.getByRole('textbox')
    await inputs.nth(1).fill('50')
    await page.getByText('Calculate').click()

    await expect(page.getByText('05:00 min/km')).toBeVisible()
  })

  test('custom distance overrides preset selection', async ({ page }) => {
    const inputs = page.getByRole('textbox')
    await inputs.nth(3).fill('2000')

    await expect(page.getByText('Olympic')).not.toHaveClass(/bg-blue-600/)
  })
})
