import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { Injectable } from "@angular/core";
import { interval, Observable, throwError } from "rxjs";
import { retry, catchError, retryWhen, take, tap } from 'rxjs/operators';
import { ControllerNames, EndpointNames, ResponseContentType, TypeNames } from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class EndpointBase {

  constructor(private http: HttpClient) {

  }
  
  private getHeaders = () => {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
  }

  private getHeadersWithJsonWebToken(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    let token = localStorage.getItem("jwt");

    return {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      })
    };
  }

  private getHeadersWithXAPIKeys = (xAPIKey: string) => {
    return {
      headers: new HttpHeaders({
        "x-api-key": `${xAPIKey}`,
        "Content-Type": "application/json"
      })
    };
  }

  private getHeadersWithXAPIKeysForExcelContent = (xAPIKey: string) => {
    return {
      headers: new HttpHeaders({
        "x-api-key": `${xAPIKey}`,
        "Accept": 'text/html, application/xhtml+xml, */*',
        "Content-Type": "application/json"
      }),
      responseType: ResponseContentType.Blob
    };
  }

  protected executeGet<T>(url: string): Observable<T> {
    const headers = this.getHeaders();

    // return this.http.get<T>(url, headers)
    //   .pipe(
    //     //retry(3), // retry a failed request up to 3 times
    //     catchError(this.handleError) // then handle the error
    //     ,
    //   retryWhen(err => interval(500).pipe(
    //     take(3),
    //     tap((a) => {
    //       console.log(`Retry attempt ${a + 1}:  At ${new Date().toISOString()}.`);
    //     })
    //   )
    //   ));
    
    return this.http.get<T>(url, headers)
    .pipe(
      catchError(this.handleError)
    );
  }

  protected executePost<T>(url: string, body: any): Observable<T> {
    const headers = this.getHeaders();

    return this.http.post<T>(url, body, headers)
    .pipe(
      catchError(this.handleError)
    );
  }

  protected executeDelete(url: string): Observable<boolean> {
    const headers = this.getHeaders();

    return this.http.delete<boolean>(url)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

// ******************************************************************************

export class ApiEndpoint {
  public name: string;
  public url: string;
}

export class ApiController {
  public type: string;
  public name: string;
  public endpoints: ApiEndpoint[]
}

export class APIs {
  public static getController(type: string): ApiController {
    return controllers.filter(c => c.type == type)[0];
  }

  public static getUrlFor(type: string, endpoint: string): string {
    let apiController = controllers.find(c => c.type == type);
    let apiEndpoint = apiController.endpoints.find(e => e.name == endpoint);

    return `${apiController.name}/${apiEndpoint.url}`;
  }
}

const controllers: ApiController[] = [
  {
    type: TypeNames.MeasureType,
    name: ControllerNames.MeasureType,
    endpoints: [
      {
        name: EndpointNames.MeasureType_GetAll,
        url: "getall"
      }
    ]
  }
];