import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ddlModel } from '../models/ddl-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild("outerContainer", { static: false }) outerContainer: ElementRef;

  currentThemeValue: string = "";

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void { }
  
  ngAfterViewInit(): void {
    this.currentThemeValue = this.getCurrentThemeValue();
  }
  
  setTheme(theme: string) {
    this.renderer.setAttribute(this.outerContainer.nativeElement, "class", "");
    this.renderer.addClass(this.outerContainer.nativeElement, theme);
    this.currentThemeValue = theme;
  }

  getCurrentThemeValue() {
    let className: string;

    if(this.outerContainer != undefined) {
      className = this.outerContainer?.nativeElement.getAttribute("class");
  
      if(className == undefined || className?.trim().length == 0) {
        className = "";
      }
    }
    
    return className;
  }
}
