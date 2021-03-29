import { Component, OnInit } from '@angular/core';
import { VersionInfoModel } from '../../models/version-info.model';
import { FileLoaderService } from '../../services/file-loader.service';
import { TranslationsService } from '../../services/translations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  versionInfo: VersionInfoModel;

  constructor(public transl8Service: TranslationsService,
    private fileLoader: FileLoaderService) { }

  ngOnInit(): void {
    this.fileLoader.getJsonContents<VersionInfoModel>('version-info/version-info.json').subscribe(data => {
        this.versionInfo = data;
    });
  }

}


