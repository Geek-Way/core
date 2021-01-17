import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import UserCaseCompanyUpdatePage from './user-case-company-update.page-object';

const expect = chai.expect;
export class UserCaseCompanyDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('geekwaycoreApp.userCaseCompany.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-userCaseCompany'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class UserCaseCompanyComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('user-case-company-heading'));
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
    await navBarPage.getEntityPage('user-case-company');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateUserCaseCompany() {
    await this.createButton.click();
    return new UserCaseCompanyUpdatePage();
  }

  async deleteUserCaseCompany() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const userCaseCompanyDeleteDialog = new UserCaseCompanyDeleteDialog();
    await waitUntilDisplayed(userCaseCompanyDeleteDialog.deleteModal);
    expect(await userCaseCompanyDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /geekwaycoreApp.userCaseCompany.delete.question/
    );
    await userCaseCompanyDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(userCaseCompanyDeleteDialog.deleteModal);

    expect(await isVisible(userCaseCompanyDeleteDialog.deleteModal)).to.be.false;
  }
}
