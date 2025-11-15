import { expect} from '@playwright/test';
import { test} from '../test-options'; 

// lesson 66

test('Drag and Drop within an iFrame', async ({page, globalsQaURL}) => {
    await page.goto(globalsQaURL)

    const frameLocator = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frameLocator.locator ('li', {hasText:"High Tatras 2"}).dragTo(frameLocator.locator('#trash'))

    // more precise control
    await frameLocator.locator ('li', {hasText:"High Tatras 4"}).hover()
    await page.mouse.down()
    await frameLocator.locator('#trash').hover()
    await page.mouse.up() // releases the mouse

    // assertions
    await expect(frameLocator.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
})