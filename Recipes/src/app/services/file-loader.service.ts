import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()

export class FileLoaderService {

  public getJsonContents<T>(pathFileName: string): Observable<T> {
    return of(require('../../assets/' + pathFileName));
  }
  constructor() { }
}