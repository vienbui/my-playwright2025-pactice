import {test} from '@playwright/test';

// Nếu muốn chạy 1 cái gì đó trước hết ( như precondition) cho tất cả các test case trong file này
// test.beforeAll(async() => {
//     console.log('This is before all tests')
//     // put function here
// })

// // Nếu muốn chạy 1 cái gì đó sau cùng ( như postcondition) cho tất cả các test case trong file này
// test.afterAll(async() => {
//     console.log('This is after all tests')
// })

// // Để tránh lặp lại đoạn code giống nhau nhiều lần, ta có thể sử dụng test.beforeEach
// test.beforeEach(async ({page}) => {
//     await page.goto('http://localhost:4200/')
//         await page.getByText('Forms').click()

// })

// test('the first test', async({page}) => { // page is a feature of Playwright, we have other feature like browsernpm start
//     await page.getByText('Form Layouts').click()
   
// })

// test('navigate to datepicker page ', async({page}) => { // page is a feature of Playwright, we have other feature like browsernpm start
//     await page.getByText('Datepicker').click()
   
// })

// // If you want to run something after each test case, use test.afterEach (e.g: clean up data, close connection, logout app...)
// test.afterEach(async() => {
//     console.log('This is after each test')
// })  

// test.describe ('suite1', () => {test.beforeEach(async ({page}) => {
//     await page.goto('http://localhost:4200/')
//     await page.getByText('Charts').click()
// });
// test('the first test', async({page}) => { // page is a feature of Playwright, we have other feature like browsernpm start
//     await page.getByText('Echarts').click()
// })

// // test('navigate to datepicker page ', async({page}) => { // page is a feature of Playwright, we have other feature like browsernpm start
// //     await page.getByText('Datepicker').click() 
// // })

// })

// test.describe ('suite2', () => {test.beforeEach(async ({page}) => {
//     await page.goto('http://localhost:4200/')
//     await page.getByText('Forms').click()
// });
// test('the 2nd test', async({page}) => { // page is a feature of Playwright, we have other feature like browsernpm start
//     await page.getByText('Form Layouts').click()
// })

// test('navigate to datepicker page1 ', async({page}) => { // page is a feature of Playwright, we have other feature like browsernpm start
//     await page.getByText('Datepicker').click() 
// })

// })

test('Locator syntax rules', async({page}) => {

// by Tag name  
    page.locator(('input'))

    // by ID
    await page.locator(('input#Email1')).click ()// # la input co id la Email1

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
