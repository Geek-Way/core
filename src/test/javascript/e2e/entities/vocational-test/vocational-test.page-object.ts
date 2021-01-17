import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import VocationalTestUpdatePage from './vocational-test-update.page-object';

const expect = chai.expect;
export class VocationalTestDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('geekwaycoreApp.vocationalTest.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-vocationalTest'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class VocationalTestComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('vocational-test-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('vocational-test');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateVocationalTest() {
    await this.createButton.click();
    return new VocationalTestUpdatePage();
  }

  async deleteVocationalTest() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const vocationalTestDeleteDialog = new VocationalTestDeleteDialog();
    await waitUntilDisplayed(vocationalTestDeleteDialog.deleteModal);
    expect(await vocationalTestDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/geekwaycoreApp.vocationalTest.delete.question/);
    await vocationalTestDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(vocationalTestDeleteDialog.deleteModal);

    expect(await isVisible(vocationalTestDeleteDialog.deleteModal)).to.be.false;
  }
}
