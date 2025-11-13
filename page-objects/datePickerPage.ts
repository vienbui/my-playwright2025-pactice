import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatePickerPage extends HelperBase {

    // private readonly page: Page

    constructor(page: Page) {
        super(page);
    }

    async selectCommonDatePickerFromToday(numberOfDaysFromToday: number) {
       const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()
        const expectedDateFormatted = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(expectedDateFormatted)
    }

    async selectDatepickerWithRangeFromToday(startDateFromToday: number, endDateFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const expectedStartDateFormatted = await this.selectDateInTheCalendar(startDateFromToday) // reu
        const expectedEndDateFormatted = await this.selectDateInTheCalendar(endDateFromToday)
        const expectedDateRangeFormatted = `${expectedStartDateFormatted} - ${expectedEndDateFormatted}`
        await expect(calendarInputField).toHaveValue(expectedDateRangeFormatted)

    }

    private async selectDateInTheCalendar(numberOfDaysFromToday){
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday) // getDate() method returns the day of the month (from 1 to 31) for the specified date
            const expectedDate = date.getDate().toString()
            const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'}) // get the short month name, e.g: Oct
            const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'}) // get the long month name, e.g: October
            const expectedYear = date.getFullYear().toString()
            const expectedDateFormatted = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
        
            let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
            let expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
            while (!calendarMonthAndYear.includes(expectedMonthAndYear)) { 
                //check if current month and year does not same as expected month and year, we have to click on next month button
                await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
                calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent() // neu khong check 
            }

            await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
            return expectedDateFormatted
    }
}