import {test, expect} from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
 
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async ({page}) => {
  const pm = new PageManager(page);
    await pm.navigate().formLayoutsPage()
    await pm.navigate().datePickerPage()
    await pm.navigate().tooltipsPage()
    await pm.navigate().toasterPage()
    await pm.navigate().smartTablePage()
})
    

test('parametized methods', async ({page}) => {
     const pm = new PageManager(page);

    await pm.navigate().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSeletOption('email@example.com', 'password', 'Option 2')
    await pm.onFormLayoutsPage().submitInlineFormWithCredentials('Welcome', 'wel@example.com', false)
    await pm.navigate().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerFromToday(6)
    await pm.onDatePickerPage().selectDatepickerWithRangeFromToday(6, 10)

})
