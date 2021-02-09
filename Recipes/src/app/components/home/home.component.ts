import { Component, OnInit } from '@angular/core';
import { TranslationsService } from '../../services/translations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private transl8Service: TranslationsService) { }

  ngOnInit(): void {
  }

}
