import {expect, test} from '@playwright/test';
import { filter } from 'rxjs-compat/operator/filter';

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async({page}) => {

// by Tag name  
    await page.locator(('input')).first().click()

    // by ID
    page.locator(('input#Email1')) // # la input co id la Email1

    // by Class name
    page.locator('.shape-rectangle') 

    // by Attribute
    page.locator('[placeholder="Email"]')

    // by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine diffrent selections
    page.locator('input[placeholder="Email"][type="email"][nbinput]')

    // by XPath ( NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    // by partial text match 
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text("Using the Grid")')

})

test('User facing Locator', async({page}) => {
    await page.getByRole ('textbox',{name:"Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel("Email").first().click()


    await page.getByPlaceholder("Jane Doe").click()

    await page.getByText("Using the Grid").click()

    await page.getByTestId("SignIn").click()
})

test("Child Element Locator", async({page}) => {
    await page.locator ('nb-radio-group :text-is("Option 1")').click()
    await page.locator ('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name:"Sign in"}).first().click()

    //using index of elements, try to avoid this approach because sometimes the index can change
    await page.locator('nb-card').nth(3).getByRole('button').click() // click button in the 4th card
}) 

test("Parents Element Locator", async({page}) => {

    await page.locator ('nb-card',{hasText: ("Using the Grid")}).getByRole('textbox',{name:"Password"}).click()

    await page.locator ('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox',{name:"Email"}).click()

    await page.locator ('nb-card').filter({hasText: "Basic Form"}).getByRole('textbox',{name:"Email"}).click() 
    await page.locator ('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox',{name:"Password"}).click() 

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox',{name:"Password"}).click() 


    //Not recommended way
    await page.locator (':text-is("Using the Grid")').locator('..').getByRole('textbox',{name:"Password"}).click() 
})

test("Reuse the locators", async({page}) => {
    const basicFormCard = page.locator ('nb-card').filter({hasText: "Basic Form"})
    const emailInput = basicFormCard.getByRole('textbox',{name:"Email"})

    await emailInput.fill("test@example.com") 
    await basicFormCard.getByRole('textbox',{name:"Password"}).fill("mypassword  ") 
    await basicFormCard.getByRole('button').click() 

    await expect(emailInput).toHaveValue("test@example.com")

})

test ('extracting values', async({page}) => {
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic Form"})
    const button = basicForm.getByRole('button')
    const buttonText = await button.textContent() 
    expect(buttonText).toEqual('Submit')

    // all test values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    // input values
    const emailField = basicForm.getByRole('textbox',{name:"Email"})
    await emailField.fill ("test@test.com")
    const emailValue = await emailField.inputValue()
    expect (emailValue).toEqual("test@test.com")

    const placeHolderValue = await emailField.getAttribute('placeholder')
    expect (placeHolderValue).toEqual("Email")
})

test ('assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic Form"}).locator('button') // tim button trong the nb-card co text Basic Form

    const text =  await basicFormButton.textContent()
    expect (text).toEqual('Submit')

    //General assertions
    // const value = 5
    // expect(value).toEqual(5)

    // Locator assertions
    expect (basicFormButton).toHaveText('Submit')

    //Soft assertions - continue the test even the assertion fails
    await expect.soft(basicFormButton).toHaveText('Submit') // this will fail but the test will continue
    await basicFormButton.click()
})
