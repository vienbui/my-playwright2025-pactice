import { Page, expect } from "@playwright/test";
import {NavigationPage} from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatePickerPage } from '../page-objects/datePickerPage';
import { on } from 'events';

export class PageManager {
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formLayoutsPage: FormLayoutsPage;
    private readonly datePickerPage: DatePickerPage;    

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page); // phai co this truoc page de truy cap den page cua class nay
        this.formLayoutsPage = new FormLayoutsPage(this.page);
        this.datePickerPage = new DatePickerPage(this.page);    

    }
    navigate (){
        return this.navigationPage;
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage;
    }

    onDatePickerPage(){
        return this.datePickerPage;
    }           
  
}