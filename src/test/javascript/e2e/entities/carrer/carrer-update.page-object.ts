import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CarrerUpdatePage {
  pageTitle: ElementFinder = element(by.id('geekwaycoreApp.carrer.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeCloneInput: ElementFinder = element(by.css('input#carrer-typeClone'));
  nameInput: ElementFinder = element(by.css('input#carrer-name'));
  descriptionInput: ElementFinder = element(by.css('textarea#carrer-description'));
  scoreInput: ElementFinder = element(by.css('input#carrer-score'));
  scoreLevelInput: ElementFinder = element(by.css('input#carrer-scoreLevel'));
  vocationalTestSelect: ElementFinder = element(by.css('select#carrer-vocationalTest'));
  userSelect: ElementFinder = element(by.css('select#carrer-user'));

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

  async setScoreInput(score) {
    await this.scoreInput.sendKeys(score);
  }

  async getScoreInput() {
    return this.scoreInput.getAttribute('value');
  }

  async setScoreLevelInput(scoreLevel) {
    await this.scoreLevelInput.sendKeys(scoreLevel);
  }

  async getScoreLevelInput() {
    return this.scoreLevelInput.getAttribute('value');
  }

  async vocationalTestSelectLastOption() {
    await this.vocationalTestSelect.all(by.tagName('option')).last().click();
  }

  async vocationalTestSelectOption(option) {
    await this.vocationalTestSelect.sendKeys(option);
  }

  getVocationalTestSelect() {
    return this.vocationalTestSelect;
  }

  async getVocationalTestSelectedOption() {
    return this.vocationalTestSelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
    await this.setScoreInput('5');
    expect(await this.getScoreInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setScoreLevelInput('scoreLevel');
    expect(await this.getScoreLevelInput()).to.match(/scoreLevel/);
    await this.vocationalTestSelectLastOption();
    await this.userSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
