import {test, expect} from '@playwright/test';
import {NavigationPage} from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatePickerPage } from '../page-objects/datePickerPage';

// lesson 62 Test Data Generation with Faker.js

let faker: any;

test.beforeAll(async () => {
  faker = (await import('@faker-js/faker')).faker;
});


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async ({page}) => {
   //create new instance of this page object inside of the test
   const navigateTo = new NavigationPage (page)

    // call instance of the page object
   await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.tooltipsPage()
    await navigateTo.toasterPage()
    await navigateTo.smartTablePage()   
    

})

test('parametized methods', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const onDatePickerPage = new DatePickerPage(page) //create instance of each of those page object
    const randomFullName = faker.person.fullName(); // lesson 62 Test Data Generation with Faker.js
    const randomEmail = `${randomFullName.replace(" ","" )}${faker.number.int(1000)}@test.com`; // lesson 62 Test Data Generation with Faker.js
    // replace là để bỏ khoảng trắng trong tên full name vì email không có khoảng trắng được

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSeletOption('email@example.com', 'password', 'Option 2')
    // bài 62, screenshot
    await page.screenshot({path: `screenshots/formlayout-${Date.now()}.png`, fullPage: true})
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))    

    // await onFormLayoutsPage.submitInlineFormWithCredentials('Welcome', 'wel@example.com', false)
    await onFormLayoutsPage.submitInlineFormWithCredentials(randomFullName, randomEmail, false)
   
   
   await page.locator('nb-card', {hasText: 'Inline form'}).screenshot({path: `screenshots/inlineform-${Date.now()}.png`})
    // await navigateTo.datePickerPage()
    // await onDatePickerPage.selectCommonDatePickerFromToday(6)
    // await onDatePickerPage.selectDatepickerWithRangeFromToday(6, 10)

})

