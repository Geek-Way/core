import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ProofUpdatePage from './proof-update.page-object';

const expect = chai.expect;
export class ProofDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('geekwaycoreApp.proof.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-proof'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ProofComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('proof-heading'));
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
    await navBarPage.getEntityPage('proof');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateProof() {
    await this.createButton.click();
    return new ProofUpdatePage();
  }

  async deleteProof() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const proofDeleteDialog = new ProofDeleteDialog();
    await waitUntilDisplayed(proofDeleteDialog.deleteModal);
    expect(await proofDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/geekwaycoreApp.proof.delete.question/);
    await proofDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(proofDeleteDialog.deleteModal);

    expect(await isVisible(proofDeleteDialog.deleteModal)).to.be.false;
  }
}
