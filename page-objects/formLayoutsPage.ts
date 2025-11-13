import { Page } from "@playwright/test";

export class FormLayoutsPage {
    readonly page: Page;
    

    constructor(page: Page) {
        this.page = page;
    }

    async submitUsingTheGridFormWithCredentialsAndSeletOption(email:string, password:string, option:string){ 
        const usingtheGridForm = this.page.locator('nb-card',{hasText: 'Using the Grid'})
        await usingtheGridForm.getByPlaceholder('Email').fill(email)
        await usingtheGridForm.getByPlaceholder('Password').fill(password)
        await usingtheGridForm.getByRole('radio', {name: option}).check({force:true})

        await usingtheGridForm.getByRole('button', {name: 'Sign in'}).click()
    }

    /**
     * This method fills and submits the inline form
     * @param name - should be full name
     * @param email - valid email address for test user
     * @param rememberMe - true or false 
     */
    async submitInlineFormWithCredentials(name:string, email:string, rememberMe:boolean){
        const inlineForm = this.page.locator('nb-card',{hasText: 'Inline form'})
        await inlineForm.getByPlaceholder('Jane Doe').fill(name)
        await inlineForm.getByPlaceholder('Email').fill(email)
        if(rememberMe){
            await inlineForm.getByRole('checkbox').check({force:true})
        }
        await inlineForm.getByRole('button').click()

    }}
