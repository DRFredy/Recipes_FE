export class LanguageModel {
  constructor(langCode: string, langName: string) {
    this.code = langCode;
    this.name = langName;
  }

  public code: string;
  public name: string;
}