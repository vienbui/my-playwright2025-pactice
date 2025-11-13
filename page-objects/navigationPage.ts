import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase { // class name should be PascalCase, not camelCase ( always start with uppercase letter)
    
    // readonly page: Page;
    // readonly formLayoutMenuItem: Locator
    // readonly datePickerMenuItem: Locator
    // readonly smartTableMenuItem: Locator
    // readonly toasterMenuItem: Locator
    // readonly tooltipMenuItem: Locator

    constructor(page: Page) {
        super(page);
      
        // this.formLayoutMenuItem = page.getByText('Form Layouts')
        // this.datePickerMenuItem = page.getByText('Datepicker')
        // this.smartTableMenuItem = page.getByText('Smart Table')
        // this.toasterMenuItem = page.getByText('Toastr')
        // this.tooltipMenuItem = page.getByText('Tooltip')
    }
    

    async formLayoutsPage(){ // This is empty method. method name should be camelCase.
        // we're going to use this instance of the page that we're going to read from the constructor, and this instance "this.page " will be passed from the test. 
        await this.selectGroupMenu('Forms')
        // await this.page.getByText('Forms').click() 
        await this.page.getByText('Form Layouts').click() 
        // await this.formLayoutMenuItem.click()
        await this.waitForNumberOfSeconds(1);
    }


    async datePickerPage(){
        // await this.page.getByText('Forms').click()
        await this.selectGroupMenu('Forms')
        await this.page.waitForTimeout(1000)
        await this.page.getByText('Datepicker').click()
        await this.waitForNumberOfSeconds(1);
        // await this.datePickerMenuItem.click()
    }

    async tooltipsPage(){
         await this.selectGroupMenu('Modal & Overlays')
        // await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Tooltip').click()
        await this.waitForNumberOfSeconds(1);
        // await this.tooltipMenuItem.click()
    }

    async toasterPage(){
        await this.selectGroupMenu('Modal & Overlays')
        await this.page.getByText('Toastr').click()
        await this.waitForNumberOfSeconds(1);
        // await this.toasterMenuItem.click()
    }

    async smartTablePage(){
        await this.selectGroupMenu('Tables & Data')
        // await this.page.getByText('Tables & Data').click()
        await this.page.getByText('Smart Table').click()
        await this.waitForNumberOfSeconds(1);
        // await this.smartTableMenuItem.click()
    }

    // Nếu Form đã mở thì ko cần click Forms nữa, nó sẽ làm collapse menu lại

    private async selectGroupMenu(groupItemTitle: string){
        const groupMenuItem = await this.page.getByTitle(groupItemTitle)
        const expandState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandState == 'false'){
            await groupMenuItem.click()
        }


    }
}