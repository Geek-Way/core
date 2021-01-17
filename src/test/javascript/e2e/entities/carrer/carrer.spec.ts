import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CarrerComponentsPage from './carrer.page-object';
import CarrerUpdatePage from './carrer-update.page-object';
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

describe('Carrer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let carrerComponentsPage: CarrerComponentsPage;
  let carrerUpdatePage: CarrerUpdatePage;

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
    carrerComponentsPage = new CarrerComponentsPage();
    carrerComponentsPage = await carrerComponentsPage.goToPage(navBarPage);
  });

  it('should load Carrers', async () => {
    expect(await carrerComponentsPage.title.getText()).to.match(/Carrers/);
    expect(await carrerComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Carrers', async () => {
    const beforeRecordsCount = (await isVisible(carrerComponentsPage.noRecords)) ? 0 : await getRecordsCount(carrerComponentsPage.table);
    carrerUpdatePage = await carrerComponentsPage.goToCreateCarrer();
    await carrerUpdatePage.enterData();

    expect(await carrerComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(carrerComponentsPage.table);
    await waitUntilCount(carrerComponentsPage.records, beforeRecordsCount + 1);
    expect(await carrerComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await carrerComponentsPage.deleteCarrer();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(carrerComponentsPage.records, beforeRecordsCount);
      expect(await carrerComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(carrerComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
