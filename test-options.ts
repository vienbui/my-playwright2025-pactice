import { test as base} from '@playwright/test';
import {NavigationPage} from '../my-playwright2025-pactice/page-objects/navigationPage';

import { PageManager } from './page-objects/pageManager';
import { FormLayoutsPage } from './page-objects/formLayoutsPage';

export type TestOptions = {
    globalsQaURL:string
    formLayoutsPage: string
    pageManager: PageManager
        formLayoutPage:
        FormLayoutsPage
}

    export const test = base.extend<TestOptions>({
        globalsQaURL: ['', {option: true}],

        formLayoutsPage:[async ({page}, use) => {
            await page.goto('/')
            await page.getByText('Forms').click()
            await page.getByText('Form Layouts').click()
            await use('')
        },{auto: true}],

        formLayoutPage: async ({page}, use) => {
                const onFormLayoutsPage = new FormLayoutsPage(page)

            await use(onFormLayoutsPage);
        },
        
    })