import { Component, OnInit } from '@angular/core';
import { MeasureTypeModel } from '../../models/measure-type.model';
import { MeasureTypesService } from '../../services/measure-types.service';

@Component({
  selector: 'app-measure-types',
  templateUrl: './measure-types.component.html',
  styleUrls: ['./measure-types.component.scss']
})
export class MeasureTypesComponent implements OnInit {

  measureTypes: MeasureTypeModel[] = [];

  constructor(private measureTypesService: MeasureTypesService) { }

  ngOnInit(): void {

    this.measureTypesService.getMeasureTypes().subscribe(
      data => {
        debugger;
        this.measureTypes = data.data
      },
      err => console.log('errors already caught... will not run')
    ); 
  }

}
