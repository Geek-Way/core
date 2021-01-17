import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class CourseUpdatePage {
  pageTitle: ElementFinder = element(by.id('geekwaycoreApp.course.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  typeCloneInput: ElementFinder = element(by.css('input#course-typeClone'));
  nameInput: ElementFinder = element(by.css('input#course-name'));
  descriptionInput: ElementFinder = element(by.css('textarea#course-description'));
  scoreInput: ElementFinder = element(by.css('input#course-score'));
  scoreLevelInput: ElementFinder = element(by.css('input#course-scoreLevel'));
  contentInput: ElementFinder = element(by.css('textarea#course-content'));
  videoUrlInput: ElementFinder = element(by.css('input#course-videoUrl'));
  viewedInput: ElementFinder = element(by.css('input#course-viewed'));
  carrerSelect: ElementFinder = element(by.css('select#course-carrer'));

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

  async setVideoUrlInput(videoUrl) {
    await this.videoUrlInput.sendKeys(videoUrl);
  }

  async getVideoUrlInput() {
    return this.videoUrlInput.getAttribute('value');
  }

  getViewedInput() {
    return this.viewedInput;
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
    await this.setVideoUrlInput('videoUrl');
    expect(await this.getVideoUrlInput()).to.match(/videoUrl/);
    await waitUntilDisplayed(this.saveButton);
    const selectedViewed = await this.getViewedInput().isSelected();
    if (selectedViewed) {
      await this.getViewedInput().click();
      expect(await this.getViewedInput().isSelected()).to.be.false;
    } else {
      await this.getViewedInput().click();
      expect(await this.getViewedInput().isSelected()).to.be.true;
    }
    await this.carrerSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
