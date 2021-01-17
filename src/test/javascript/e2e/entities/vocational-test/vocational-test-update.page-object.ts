import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class VocationalTestUpdatePage {
  pageTitle: ElementFinder = element(by.id('geekwaycoreApp.vocationalTest.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeCloneInput: ElementFinder = element(by.css('input#vocational-test-typeClone'));
  nameInput: ElementFinder = element(by.css('input#vocational-test-name'));
  descriptionInput: ElementFinder = element(by.css('textarea#vocational-test-description'));
  statusInput: ElementFinder = element(by.css('input#vocational-test-status'));
  carrerInput: ElementFinder = element(by.css('input#vocational-test-carrer'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTypeCloneInput(typeClone) {
    await this.typeCloneInput.sendKeys(typeClone);
  }

  async getTypeCloneInput() {
    return this.typeCloneInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
  }

  async setCarrerInput(carrer) {
    await this.carrerInput.sendKeys(carrer);
  }

  async getCarrerInput() {
    return this.carrerInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setTypeCloneInput('typeClone');
    expect(await this.getTypeCloneInput()).to.match(/typeClone/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNameInput('name');
    expect(await this.getNameInput()).to.match(/name/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDescriptionInput('description');
    expect(await this.getDescriptionInput()).to.match(/description/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStatusInput('status');
    expect(await this.getStatusInput()).to.match(/status/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCarrerInput('carrer');
    expect(await this.getCarrerInput()).to.match(/carrer/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
