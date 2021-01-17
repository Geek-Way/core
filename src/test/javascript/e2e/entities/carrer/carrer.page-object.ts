import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CarrerUpdatePage from './carrer-update.page-object';

const expect = chai.expect;
export class CarrerDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('geekwaycoreApp.carrer.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-carrer'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CarrerComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('carrer-heading'));
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
    await navBarPage.getEntityPage('carrer');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateCarrer() {
    await this.createButton.click();
    return new CarrerUpdatePage();
  }

  async deleteCarrer() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const carrerDeleteDialog = new CarrerDeleteDialog();
    await waitUntilDisplayed(carrerDeleteDialog.deleteModal);
    expect(await carrerDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/geekwaycoreApp.carrer.delete.question/);
    await carrerDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(carrerDeleteDialog.deleteModal);

    expect(await isVisible(carrerDeleteDialog.deleteModal)).to.be.false;
  }
}
