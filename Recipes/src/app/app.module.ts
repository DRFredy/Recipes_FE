// Modules
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';

// Services
import { FileLoaderService } from './services/file-loader.service';
import { MeasureTypesService } from './services/measure-types.service';

// Components
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { MeasureTypesComponent } from './components/measure-types/measure-types.component';
import { HttpRequestInterceptor } from './services/http-interceptors';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginationIntlService } from './services/mat-pagination-intl.service';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    LoginComponent,
    MeasureTypesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [
    FileLoaderService,
    MeasureTypesService,
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'primary' } },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: MatPaginationIntlService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
