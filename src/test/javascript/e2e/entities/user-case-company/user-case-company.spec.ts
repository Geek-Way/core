import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UserCaseCompanyComponentsPage from './user-case-company.page-object';
import UserCaseCompanyUpdatePage from './user-case-company-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('UserCaseCompany e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userCaseCompanyComponentsPage: UserCaseCompanyComponentsPage;
  let userCaseCompanyUpdatePage: UserCaseCompanyUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    userCaseCompanyComponentsPage = new UserCaseCompanyComponentsPage();
    userCaseCompanyComponentsPage = await userCaseCompanyComponentsPage.goToPage(navBarPage);
  });

  it('should load UserCaseCompanies', async () => {
    expect(await userCaseCompanyComponentsPage.title.getText()).to.match(/User Case Companies/);
    expect(await userCaseCompanyComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete UserCaseCompanies', async () => {
    const beforeRecordsCount = (await isVisible(userCaseCompanyComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(userCaseCompanyComponentsPage.table);
    userCaseCompanyUpdatePage = await userCaseCompanyComponentsPage.goToCreateUserCaseCompany();
    await userCaseCompanyUpdatePage.enterData();

    expect(await userCaseCompanyComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(userCaseCompanyComponentsPage.table);
    await waitUntilCount(userCaseCompanyComponentsPage.records, beforeRecordsCount + 1);
    expect(await userCaseCompanyComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await userCaseCompanyComponentsPage.deleteUserCaseCompany();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(userCaseCompanyComponentsPage.records, beforeRecordsCount);
      expect(await userCaseCompanyComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(userCaseCompanyComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
