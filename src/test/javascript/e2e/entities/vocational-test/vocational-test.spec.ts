import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import VocationalTestComponentsPage from './vocational-test.page-object';
import VocationalTestUpdatePage from './vocational-test-update.page-object';
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

describe('VocationalTest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let vocationalTestComponentsPage: VocationalTestComponentsPage;
  let vocationalTestUpdatePage: VocationalTestUpdatePage;

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
    vocationalTestComponentsPage = new VocationalTestComponentsPage();
    vocationalTestComponentsPage = await vocationalTestComponentsPage.goToPage(navBarPage);
  });

  it('should load VocationalTests', async () => {
    expect(await vocationalTestComponentsPage.title.getText()).to.match(/Vocational Tests/);
    expect(await vocationalTestComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete VocationalTests', async () => {
    const beforeRecordsCount = (await isVisible(vocationalTestComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(vocationalTestComponentsPage.table);
    vocationalTestUpdatePage = await vocationalTestComponentsPage.goToCreateVocationalTest();
    await vocationalTestUpdatePage.enterData();

    expect(await vocationalTestComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(vocationalTestComponentsPage.table);
    await waitUntilCount(vocationalTestComponentsPage.records, beforeRecordsCount + 1);
    expect(await vocationalTestComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await vocationalTestComponentsPage.deleteVocationalTest();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(vocationalTestComponentsPage.records, beforeRecordsCount);
      expect(await vocationalTestComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(vocationalTestComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
