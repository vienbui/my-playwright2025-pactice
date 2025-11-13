import {test, expect} from '@playwright/test';
import { Location } from '@angular/common';
// lesson 63 Retries

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page',() => {
    test.beforeEach(async ({page}) => {  
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()

    })
    test ('input fields', async ({page}) => {
        const usingtheGridEmailInput = page.locator('nb-card',{hasText: 'Using the Grid'}).getByRole('textbox',{name: 'Email'}) 
        //nb card has decendent text Using the Grid

        // Type into the input field
        await usingtheGridEmailInput.fill('test@example.com')

        // Clear the input field
        await usingtheGridEmailInput.clear()

        //if we want to type again with delaying 
        await usingtheGridEmailInput.pressSequentially('test2@test.com', {delay:100})


        // generic assertion for input field
        const inputValue = await usingtheGridEmailInput.inputValue()
        expect (inputValue).toBe('test2@test.com')

        //locator assertion
        await expect (usingtheGridEmailInput).toHaveValue('test2@test.com') // dont use toHaveText for input fields

    })
    test('radio button', async ({page}) => {
        const usingtheGridForm = page.locator('nb-card',{hasText: 'Using the Grid'})
        // await usingtheGridForm.getByLabel('Option 2').check ({force:true}) 
        // vi element dang co value native-input visually-hidden nen phai dung force:true de bat buoc check
   
        // get by role of the radio button
        await usingtheGridForm.getByRole('radio', {name: 'Option 1'}).check({force:true})

        // assertion if radio button is checked
        const radioBtn1 = await usingtheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()
        expect (radioBtn1).toBeTruthy()

        //second way to validation
        await expect (usingtheGridForm.getByRole('radio', {name: 'Option 1'})).toBeChecked()
        
        // check option 1 is not checked if checked on option 2
        await usingtheGridForm.getByRole('radio', {name: 'Option 2'}).check({force:true})
        expect (await usingtheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy

        expect (await usingtheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy
        
    })

})


    test('Checkboxes',async({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
        // await page.getByRole('checkbox', {name: 'Hide on click'}).click({force:true}) 
        // await page.getByRole('checkbox', {name: 'Hide on click'}).check({force:true}) 
        await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force:true}) 
        await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force:true}) 
       
       //check or uncheck all checkboxes at once
       const allBoxes = page.getByRole('checkbox')
       for (const box of await allBoxes.all()) {
        await box.check({force:true})
        expect (await box.isChecked()).toBeTruthy()

       }
    })

    test('List and dropdowns', async ({page}) => {
        const dropDownMenu = page.locator ('ngx-header nb-select') // lay parent ngx header roi moi lay child nb-select
    
        await dropDownMenu.click()

        page.getByRole('list') //when the list has a UL tag
        page.getByRole ('listitem') // when the list has LI tags inside the UL tag

        // const optionList = page.getByRole('list').locator('nb-option') // lay tat ca cac option trong list`

        const optionList = page.locator ('nb-option-list nb-option') // lay tat ca cac option trong list`
        await expect (optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]) // assertion for all options in the dropdown

        await optionList.filter({hasText: 'Cosmic'}).click() // filter de loc ra option can chon
    
        //validate the theme applied
        const header = page.locator ('nb-layout-header')
        await expect (header).toHaveCSS('background-color','rgb(50, 50, 89)') // cosmic theme bg color

        //select all themes one by one then validate the color

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)"
        }
        
         await dropDownMenu.click()  
        for (const color in colors) { // instead of hardcoding the color names, we loop through the colors object, 
            // color will loop through the keys of the colors object, and take the value from colors[color]
            await optionList.filter({hasText: color}).click()

            //make assertion to validate header color
            await expect (header).toHaveCSS('background-color', colors[color] )

            // Exit loop if needed
            if (color != 'Corporate')

            // continue the loop for all colors
            await dropDownMenu.click()  
        }
    })

test ('tooltips', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' });
    await toolTipCard.getByRole('button', { name: 'Top' }).hover();


    page.getByRole('tooltip') // khi hover se hien thi tooltip voi role = tooltip, if you have a role tooltip created
    const toolTip = await page.locator('nb-tooltip').textContent() // nb-tooltip is the actual tooltip element in the DOM
    expect (toolTip).toEqual('This is a tooltip') // assertion for tooltip text
})

test ('dialog box', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // Create a listener for the dialog event, chi dung khi co dialog cua browser, con neu dialog tu angular thi phai thao tac tren element do
    page.on('dialog', async (dialog) => {
        expect (dialog.message()).toEqual('Are you sure you want to delete?')
        await dialog.accept() // click OK
        // await dialog.dismiss() // click Cancel
    })

    // tim table, 
    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()

    //kiem tra dong da bi xoa
    await expect (page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test ('web table', async ({page}) => {
     await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1 get the row by any test in that row
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"}) 
    // name is the text in HTML text, 
    // if we click on the Edit icon then this field becomes the property of the nb-edit element, so we cannot use name to locate the row after clicking edit
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('36')
    await page.locator('.nb-checkmark').click()


    // 2 Go to the 2nd page and select a row
    // Get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()

    // get the row that has Id = 11
    const targetRowbyId = page.getByRole('row', {name:"11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    // this will return row in the table page.getByRole('row', {name:"11"}), 
    // then filter({has: page.locator('td').nth(1).getByText('11')}) will filter the row that has td at index 1 (column 1) with text 11
    // filter({has: page.locator('td') - this filter return all columns for each of thoes rows, then nth(1) will get first column of those rows
    // then finally getByText('11') will get the row that has text 11 in that column
    await targetRowbyId.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    
    // assert the email has been updated
    await expect (targetRowbyId.locator('td').nth(5)).toHaveText('test@test.com')


    //3. test filter of the table
    const ages = ['20', '30', '40', '200']

    for (const age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
       

        //wait for the page change
        await page.waitForTimeout(500)

         const  ageRows = page.locator('tbody tr') // get all rows in the table body

        for (let row of await ageRows.all()) {
            const ageCell = await row.locator('td').last().textContent()

            if (age == '200') {
                expect(await page.getByRole('table').textContent()).toContain('No data found') // assert no data found message
            } else {
                await expect(ageCell).toEqual(age) // assert the age cell has the correct text
            }
        }       
    }
})

test ('Datepicker', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    let date = new Date() // Date() is a javascript object can perform different date operations , 
    // new is the keywork to create a new object instance of the Date object
    // we assign the instance to a variable date
    date.setDate(date.getDate() + 365) // getDate() method returns the day of the month (from 1 to 31) for the specified date
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'}) // get the short month name, e.g: Oct
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'}) // get the long month name, e.g: October
    const expectedYear = date.getFullYear().toString()
    const expectedDateFormatted = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    let expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) { 
        //check if current month and year does not same as expected month and year, we have to click on next month button
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent() // neu khong check 
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()

    await expect(calendarInputField).toHaveValue(expectedDateFormatted)
})

test ('sliders', async ({page}) => {
    // Update attribute
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle ')

    await tempGauge.evaluate(node => { //node is a function parameter that represents the DOM element being evaluated
        node.setAttribute('cx', '232.6309')
        node.setAttribute('cy', '232.6309')
    })

    await tempGauge.click()

    //Mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded() // this method to ensure our browser viewport is scrolled to the element tempBox before performing actions on it

    const box = await tempBox.boundingBox()
    // Define the center of bounding box and start from there
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2

    // moving the mouse from center to top right corner
    await page.mouse.move(x, y) // put the mouse to the center of the box
    await page.mouse.down() // simulate mouse down action
    await page.mouse.move(x + 100, y) // move to top right corner 
    await page.mouse.move(x + 100, y+100) // move the mouse down
    await page.mouse.up() // release mouse button

    await expect (tempBox).toContainText ('30')
})