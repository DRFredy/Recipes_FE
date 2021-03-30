import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginatorI18nService } from 'src/app/services/mat-paginator-i18n.service';
import { MeasureTypeModel } from '../../models/measure-type.model';
import { MeasureTypesService } from '../../services/measure-types.service';

@Component({
  selector: 'app-measure-types',
  templateUrl: './measure-types.component.html',
  styleUrls: ['./measure-types.component.scss']
})
export class MeasureTypesComponent implements OnInit {

  gridColumns: string[] = ["MeasureTypeId", "MeasureTypeName"];

  //measureTypes = new MatTableDataSource();
  measureTypes: MatTableDataSource<MeasureTypeModel[]>;
  showGrid: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    // this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    // this.setDataSourceAttributes();
  }
  
  constructor(private measureTypesService: MeasureTypesService) { }

  ngOnInit(): void {
    // this.showGrid = false;

    this.measureTypesService.getMeasureTypes().subscribe(
      data => {
        // this.measureTypes = data.data;
        this.measureTypes = new MatTableDataSource<MeasureTypeModel[]>(data.data);
        this.showGrid = true;
        this.measureTypes.paginator = this.paginator;
        this.measureTypes.sort = this.sort;        
      },
      err => console.log('errors already caught... will not run')
    ); 
  }

  setDataSourceAttributes() {
		this.measureTypes.sort = this.sort;
	}

  getVisibilityClass(elId: string) {
    if (this.showGrid) {
      if (elId == 'gridDiv') {
        return 'shown-as-block';
      }
      else {
        return "shown-as-inline-block'";
      }
    }
    else {
      return "hidden";
    }
  }

}
