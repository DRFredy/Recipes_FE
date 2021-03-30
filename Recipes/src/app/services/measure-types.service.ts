import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { EndpointNames, TypeNames } from '../constants/constants';
import { HttpResponseModel } from '../models/http-response.model';
import { EndpointBase, APIs } from './endpoint-base';

@Injectable({
  providedIn: 'root'
})
export class MeasureTypesService extends EndpointBase {

  getMeasureTypes(): Observable<HttpResponseModel> {
    const url: string = `${environment.baseUrl}/${APIs.getUrlFor(TypeNames.MeasureType, EndpointNames.MeasureType_GetAll)}`;

    return this.executeGet<HttpResponseModel>(url);
  }
}