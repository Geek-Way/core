import { element, by, ElementFinder, protractor } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class UserCaseCompanyUpdatePage {
  pageTitle: ElementFinder = element(by.id('geekwaycoreApp.userCaseCompany.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeCloneInput: ElementFinder = element(by.css('input#user-case-company-typeClone'));
  nameInput: ElementFinder = element(by.css('input#user-case-company-name'));
  descriptionInput: ElementFinder = element(by.css('textarea#user-case-company-description'));
  scoreInput: ElementFinder = element(by.css('input#user-case-company-score'));
  contentInput: ElementFinder = element(by.css('textarea#user-case-company-content'));
  feedbackInput: ElementFinder = element(by.css('textarea#user-case-company-feedback'));
  devStatusInput: ElementFinder = element(by.css('input#user-case-company-devStatus'));
  devNotesInput: ElementFinder = element(by.css('textarea#user-case-company-devNotes'));
  feedbackStatusInput: ElementFinder = element(by.css('input#user-case-company-feedbackStatus'));
  linkProjectInput: ElementFinder = element(by.css('input#user-case-company-linkProject'));
  deadlineInput: ElementFinder = element(by.css('input#user-case-company-deadline'));
  userSelect: ElementFinder = element(by.css('select#user-case-company-user'));
  companySelect: ElementFinder = element(by.css('select#user-case-company-company'));

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

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return this.contentInput.getAttribute('value');
  }

  async setFeedbackInput(feedback) {
    await this.feedbackInput.sendKeys(feedback);
  }

  async getFeedbackInput() {
    return this.feedbackInput.getAttribute('value');
  }

  async setDevStatusInput(devStatus) {
    await this.devStatusInput.sendKeys(devStatus);
  }

  async getDevStatusInput() {
    return this.devStatusInput.getAttribute('value');
  }

  async setDevNotesInput(devNotes) {
    await this.devNotesInput.sendKeys(devNotes);
  }

  async getDevNotesInput() {
    return this.devNotesInput.getAttribute('value');
  }

  async setFeedbackStatusInput(feedbackStatus) {
    await this.feedbackStatusInput.sendKeys(feedbackStatus);
  }

  async getFeedbackStatusInput() {
    return this.feedbackStatusInput.getAttribute('value');
  }

  async setLinkProjectInput(linkProject) {
    await this.linkProjectInput.sendKeys(linkProject);
  }

  async getLinkProjectInput() {
    return this.linkProjectInput.getAttribute('value');
  }

  async setDeadlineInput(deadline) {
    await this.deadlineInput.sendKeys(deadline);
  }

  async getDeadlineInput() {
    return this.deadlineInput.getAttribute('value');
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

  async companySelectLastOption() {
    await this.companySelect.all(by.tagName('option')).last().click();
  }

  async companySelectOption(option) {
    await this.companySelect.sendKeys(option);
  }

  getCompanySelect() {
    return this.companySelect;
  }

  async getCompanySelectedOption() {
    return this.companySelect.element(by.css('option:checked')).getText();
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
    await this.setContentInput('content');
    expect(await this.getContentInput()).to.match(/content/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFeedbackInput('feedback');
    expect(await this.getFeedbackInput()).to.match(/feedback/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDevStatusInput('devStatus');
    expect(await this.getDevStatusInput()).to.match(/devStatus/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDevNotesInput('devNotes');
    expect(await this.getDevNotesInput()).to.match(/devNotes/);
    await waitUntilDisplayed(this.saveButton);
    await this.setFeedbackStatusInput('feedbackStatus');
    expect(await this.getFeedbackStatusInput()).to.match(/feedbackStatus/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLinkProjectInput('linkProject');
    expect(await this.getLinkProjectInput()).to.match(/linkProject/);
    await waitUntilDisplayed(this.saveButton);
    await this.setDeadlineInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await this.getDeadlineInput()).to.contain('2001-01-01T02:30');
    await this.userSelectLastOption();
    await this.companySelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
