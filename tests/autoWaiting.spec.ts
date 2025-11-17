import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    
})

test('auto waiting', async ({page}) => {
    const successButton = page.locator('.bg-success')
    // await successButton.click() // PW wait for 15s for the button to be clickable

    // const text = await successButton.textContent()

    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')

    // run this only will failed immediately because the button is not visible within 5 seconds` => fix by increasing the default timeout
    // await expect(successButton).toHaveText('Data loaded with AJAX get request.') 

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000}) 


})

test('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success')

    //wait for element
    // await page.waitForSelector('.bg-success')

    //wait for particular response 
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata') //waiting for this end point is called completely

    //wait for network calls to be completedly (NOT RECOMMENTEDED)
    await page.waitForLoadState('networkidle') // wait for all network calls to be done

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test ('timeouts', async({page}) => {
    const successButton = page.locator('.bg-success')
    await successButton.click({timeout: 16000})
    // global setting timout in playwright.config.ts
    //can override timeout for a particular locator, this value will override the action timeout in playwright.config.ts
    // neu remove action timeout in playwright.config.ts thi se dung den test timeout
})