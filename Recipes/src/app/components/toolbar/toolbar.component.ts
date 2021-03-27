import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ddlModel } from 'src/app/models/ddl-model';
import { TranslationsService } from '../../services/translations.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() currentThemeValue: string;
  @Output() themeChange:EventEmitter<string> = new EventEmitter<string>();

  constructor(public transl8Service: TranslationsService) { }

  ngOnInit(): void {
    this.transl8Service.useBrowserLanguage();
  }

  getThemes(): Array<string> {
    return [
      "original",
      "alternate-blue-theme",
      "alternate-pink-theme"
    ];
  }

  update(selectedTheme: string) {
    this.themeChange.emit(selectedTheme);
  }
}
