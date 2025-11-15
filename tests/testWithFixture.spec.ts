import {test} from '../test-options';
import {NavigationPage} from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';

// lesson 62 Test Data Generation with Faker.js

let faker: any;
test.beforeAll(async () => {
  faker = (await import('@faker-js/faker')).faker;
});


test('parametized methods', async ({page, formLayoutsPage}) => { // import fixture cua lesson 68
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(" ","" )}${faker.number.int(1000)}@test.com`;

    // await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSeletOption('email@example.com', 'password', 'Option 2')
     await onFormLayoutsPage.submitInlineFormWithCredentials(randomFullName, randomEmail, false)


})

