import { Page } from "@playwright/test";

export class HelperBase {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }   

    //create a function just for demotration that will wait for some seconds, then use this wait across different page objects
    async waitForNumberOfSeconds(seconds: number){
        await this.page.waitForTimeout(seconds * 1000);
    }
}