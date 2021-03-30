import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService, TranslateLoader, LangChangeEvent } from '@ngx-translate/core';
import { Observable, Subject, of } from 'rxjs';
import { LanguageModel } from '../models/language-model';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
  readonly defaultLanguage = Constants.ES_LANG_CODE;
  
  private onLanguageChanged = new Subject<string>();
  private languages: LanguageModel[] = [
    new LanguageModel(Constants.EN_LANG_CODE, Constants.EN_LANG_NAME), 
      new LanguageModel(Constants.ES_LANG_CODE, Constants.ES_LANG_NAME)
  ];

  languageChanged$ = this.onLanguageChanged.asObservable();

  constructor(private translateService: TranslateService) {
    this.addLanguages(this.languages);
    this.setDefaultLanguage(this.defaultLanguage);
    //this.setCurrentLang(this.defaultLanguage);
    this.translateService.use(this.defaultLanguage);
  }

  getDefinedLanguageCodes() : Array<string> {
    const langCodes: Array<string> = [];
    this.languages.forEach(elem => {
      langCodes.push(elem.code);
    });

    return langCodes;
  }

  getLanguages() {
    return this.languages;
  }

  setCurrentLang(lang: string) {
    this.translateService.currentLang = lang;
  }

  getCurrentLang() {
    return this.translateService.currentLang;
  }

  addLanguages(langs: LanguageModel[]) {
    const langCodes: Array<string> = this.getDefinedLanguageCodes();
    this.translateService.addLangs(langCodes);
  }

  setDefaultLanguage(lang: string) {
    this.translateService.setDefaultLang(lang);
  }

  getDefaultLanguage() {
    return this.translateService.defaultLang;
  }

  getBrowserLanguage() {
    return this.translateService.getBrowserLang();
  }

  useBrowserLanguage(): string | void {
    let browserLang = this.getBrowserLanguage();
    // Note: By now only english and spanish languages are supported
    const langsForRegEx = this.getDefinedLanguageCodes().join("|");
    //const langRegEx = new RegExp(`${ Constants.EN_LANG_CODE }|${ Constants.ES_LANG_CODE}`);
    const langRegEx = new RegExp(langsForRegEx);
    if (browserLang.match(langRegEx)) {
      this.changeLanguage(browserLang);
      return browserLang;
    }
  }

  switchLang(lang: string) {
    this.translateService.use(lang);
  }

  // Defualt language: english
  changeLanguage(language: string = this.defaultLanguage) {
    if (!language) {
      language = this.translateService.defaultLang;
    }

    if (language != this.translateService.currentLang) {
      setTimeout(() => {
        this.translateService.use(language);
        this.onLanguageChanged.next(language);
      });
    }

    return language;
  }

  get onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }

  getTranslation(key: string | Array<string>, interpolateParams?: Object): string | any {
    return this.translateService.instant(key, interpolateParams);
  }

  getTranslationAsync(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return this.translateService.get(key, interpolateParams);
  }

}

export class TranslateLanguageLoader implements TranslateLoader {

  public getTranslation(lang: string): any {
    // Note Dynamic require(variable) will not work. Require is always at compile time
    switch (lang) {
      case "en":
        return of(require("../../assets/i18n/en.json"));
      case "es":
        return of(require("../../assets/i18n/es.json"));
      default:
    }
  }
}