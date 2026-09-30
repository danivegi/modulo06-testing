import { test, expect } from '@playwright/test';

test.describe('Login scene', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show the login form', async ({ page }) => {
    // Assert
    await expect(page.locator('input[name="user"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toHaveAttribute(
      'type',
      'password'
    );
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('should show required errors when submitting an empty form', async ({
    page,
  }) => {
    // Act
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert
    await expect(page.getByText('Debe informar el campo')).toHaveCount(2);
  });

  test('should show an error message and stay on login with invalid credentials', async ({
    page,
  }) => {
    // Act
    await page.locator('input[name="user"]').fill('admin');
    await page.locator('input[name="password"]').fill('wrong password');
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert
    await expect(page.getByText('Usuario y/o password no válidos')).toBeVisible();
    await expect(page).not.toHaveURL(/submodule-list/);
  });

  test('should navigate to submodule list with valid credentials', async ({
    page,
  }) => {
    // Act
    await page.locator('input[name="user"]').fill('admin');
    await page.locator('input[name="password"]').fill('test');
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert
    await expect(page).toHaveURL(/#\/submodule-list/);
    // 'Proyectos' también existe en el menú lateral: nos quedamos con el visible
    await expect(
      page.getByText('Proyectos', { exact: true }).filter({ visible: true })
    ).toBeVisible();
    await expect(
      page.getByText('Empleados', { exact: true }).filter({ visible: true })
    ).toBeVisible();
  });

  test('should redirect to login when visiting submodule list without session', async ({
    page,
  }) => {
    // Act
    await page.goto('/#/submodule-list');

    // Assert
    await expect(page).toHaveURL(/#\/login/);
    await expect(page.locator('input[name="user"]')).toBeVisible();
  });
});