import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProofComponentsPage from './proof.page-object';
import ProofUpdatePage from './proof-update.page-object';
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

describe('Proof e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let proofComponentsPage: ProofComponentsPage;
  let proofUpdatePage: ProofUpdatePage;

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
    proofComponentsPage = new ProofComponentsPage();
    proofComponentsPage = await proofComponentsPage.goToPage(navBarPage);
  });

  it('should load Proofs', async () => {
    expect(await proofComponentsPage.title.getText()).to.match(/Proofs/);
    expect(await proofComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Proofs', async () => {
    const beforeRecordsCount = (await isVisible(proofComponentsPage.noRecords)) ? 0 : await getRecordsCount(proofComponentsPage.table);
    proofUpdatePage = await proofComponentsPage.goToCreateProof();
    await proofUpdatePage.enterData();

    expect(await proofComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(proofComponentsPage.table);
    await waitUntilCount(proofComponentsPage.records, beforeRecordsCount + 1);
    expect(await proofComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await proofComponentsPage.deleteProof();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(proofComponentsPage.records, beforeRecordsCount);
      expect(await proofComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(proofComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
