import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ProofUpdatePage {
  pageTitle: ElementFinder = element(by.id('geekwaycoreApp.proof.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeCloneInput: ElementFinder = element(by.css('input#proof-typeClone'));
  nameInput: ElementFinder = element(by.css('input#proof-name'));
  descriptionInput: ElementFinder = element(by.css('textarea#proof-description'));
  scoreInput: ElementFinder = element(by.css('input#proof-score'));
  scoreLevelInput: ElementFinder = element(by.css('input#proof-scoreLevel'));
  contentInput: ElementFinder = element(by.css('textarea#proof-content'));
  statusInput: ElementFinder = element(by.css('input#proof-status'));
  qoneQuestInput: ElementFinder = element(by.css('input#proof-qoneQuest'));
  qoneAsrInput: ElementFinder = element(by.css('input#proof-qoneAsr'));
  qoneOptInput: ElementFinder = element(by.css('input#proof-qoneOpt'));
  qoneUsrInput: ElementFinder = element(by.css('input#proof-qoneUsr'));
  qtwoQuestInput: ElementFinder = element(by.css('input#proof-qtwoQuest'));
  qtwoAsrInput: ElementFinder = element(by.css('input#proof-qtwoAsr'));
  qtwoOptInput: ElementFinder = element(by.css('input#proof-qtwoOpt'));
  qtwoUsrInput: ElementFinder = element(by.css('input#proof-qtwoUsr'));
  qtreQuestInput: ElementFinder = element(by.css('input#proof-qtreQuest'));
  qtreAsrInput: ElementFinder = element(by.css('input#proof-qtreAsr'));
  qtreOptInput: ElementFinder = element(by.css('input#proof-qtreOpt'));
  qtreUsrInput: ElementFinder = element(by.css('input#proof-qtreUsr'));
  carrerSelect: ElementFinder = element(by.css('select#proof-carrer'));

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

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return this.contentInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return this.statusInput.getAttribute('value');
  }

  async setQoneQuestInput(qoneQuest) {
    await this.qoneQuestInput.sendKeys(qoneQuest);
  }

  async getQoneQuestInput() {
    return this.qoneQuestInput.getAttribute('value');
  }

  async setQoneAsrInput(qoneAsr) {
    await this.qoneAsrInput.sendKeys(qoneAsr);
  }

  async getQoneAsrInput() {
    return this.qoneAsrInput.getAttribute('value');
  }

  async setQoneOptInput(qoneOpt) {
    await this.qoneOptInput.sendKeys(qoneOpt);
  }

  async getQoneOptInput() {
    return this.qoneOptInput.getAttribute('value');
  }

  async setQoneUsrInput(qoneUsr) {
    await this.qoneUsrInput.sendKeys(qoneUsr);
  }

  async getQoneUsrInput() {
    return this.qoneUsrInput.getAttribute('value');
  }

  async setQtwoQuestInput(qtwoQuest) {
    await this.qtwoQuestInput.sendKeys(qtwoQuest);
  }

  async getQtwoQuestInput() {
    return this.qtwoQuestInput.getAttribute('value');
  }

  async setQtwoAsrInput(qtwoAsr) {
    await this.qtwoAsrInput.sendKeys(qtwoAsr);
  }

  async getQtwoAsrInput() {
    return this.qtwoAsrInput.getAttribute('value');
  }

  async setQtwoOptInput(qtwoOpt) {
    await this.qtwoOptInput.sendKeys(qtwoOpt);
  }

  async getQtwoOptInput() {
    return this.qtwoOptInput.getAttribute('value');
  }

  async setQtwoUsrInput(qtwoUsr) {
    await this.qtwoUsrInput.sendKeys(qtwoUsr);
  }

  async getQtwoUsrInput() {
    return this.qtwoUsrInput.getAttribute('value');
  }

  async setQtreQuestInput(qtreQuest) {
    await this.qtreQuestInput.sendKeys(qtreQuest);
  }

  async getQtreQuestInput() {
    return this.qtreQuestInput.getAttribute('value');
  }

  async setQtreAsrInput(qtreAsr) {
    await this.qtreAsrInput.sendKeys(qtreAsr);
  }

  async getQtreAsrInput() {
    return this.qtreAsrInput.getAttribute('value');
  }

  async setQtreOptInput(qtreOpt) {
    await this.qtreOptInput.sendKeys(qtreOpt);
  }

  async getQtreOptInput() {
    return this.qtreOptInput.getAttribute('value');
  }

  async setQtreUsrInput(qtreUsr) {
    await this.qtreUsrInput.sendKeys(qtreUsr);
  }

  async getQtreUsrInput() {
    return this.qtreUsrInput.getAttribute('value');
  }

  async carrerSelectLastOption() {
    await this.carrerSelect.all(by.tagName('option')).last().click();
  }

  async carrerSelectOption(option) {
    await this.carrerSelect.sendKeys(option);
  }

  getCarrerSelect() {
    return this.carrerSelect;
  }

  async getCarrerSelectedOption() {
    return this.carrerSelect.element(by.css('option:checked')).getText();
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
    await waitUntilDisplayed(this.saveButton);
    await this.setContentInput('content');
    expect(await this.getContentInput()).to.match(/content/);
    await waitUntilDisplayed(this.saveButton);
    await this.setStatusInput('status');
    expect(await this.getStatusInput()).to.match(/status/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQoneQuestInput('qoneQuest');
    expect(await this.getQoneQuestInput()).to.match(/qoneQuest/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQoneAsrInput('qoneAsr');
    expect(await this.getQoneAsrInput()).to.match(/qoneAsr/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQoneOptInput('qoneOpt');
    expect(await this.getQoneOptInput()).to.match(/qoneOpt/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQoneUsrInput('qoneUsr');
    expect(await this.getQoneUsrInput()).to.match(/qoneUsr/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQtwoQuestInput('qtwoQuest');
    expect(await this.getQtwoQuestInput()).to.match(/qtwoQuest/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQtwoAsrInput('qtwoAsr');
    expect(await this.getQtwoAsrInput()).to.match(/qtwoAsr/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQtwoOptInput('qtwoOpt');
    expect(await this.getQtwoOptInput()).to.match(/qtwoOpt/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQtwoUsrInput('qtwoUsr');
    expect(await this.getQtwoUsrInput()).to.match(/qtwoUsr/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQtreQuestInput('qtreQuest');
    expect(await this.getQtreQuestInput()).to.match(/qtreQuest/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQtreAsrInput('qtreAsr');
    expect(await this.getQtreAsrInput()).to.match(/qtreAsr/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQtreOptInput('qtreOpt');
    expect(await this.getQtreOptInput()).to.match(/qtreOpt/);
    await waitUntilDisplayed(this.saveButton);
    await this.setQtreUsrInput('qtreUsr');
    expect(await this.getQtreUsrInput()).to.match(/qtreUsr/);
    await this.carrerSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
