import { Injectable } from '@angular/core';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
  readonly defaultLanguage = "en";
  private onLanguageChanged = new Subject<string>();
  languageChanged$ = this.onLanguageChanged.asObservable();

  constructor(private translateService: TranslateService) {

    this.addLanguages(['en', 'es']);
    this.setDefaultLanguage(this.defaultLanguage);
  }

  getLanguages() {
    return this.translateService.getLangs();
  }

  getCurrentLang() {
    return this.translateService.currentLang;
  }

  addLanguages(lang: string[]) {
    this.translateService.addLangs(lang);
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
    // Note: By now only english and spanish languages are supported, so the language will be changed as long as the browser language
    // is one of the supported languages.
    if (browserLang.match(/en|es/)) {
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
        return of(require("../../assets/locale/en.json"));
      case "es":
        return of(require("../../assets/locale/es.json"));
      default:
    }
  }
}