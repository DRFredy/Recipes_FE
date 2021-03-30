import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { TranslateService } from "@ngx-translate/core";

/**
 * Utility service necessary to translate the mat-paginator
 * References:
 * https://dsebastien.medium.com/translating-the-matpaginator-angular-material-component-f72b52158dfc
 */
@Injectable()
export class MatPaginationIntlService extends MatPaginatorIntl {
  constructor(private translateService: TranslateService) {
    super();

    // React whenever the language is changed
    this.translateService.onLangChange.subscribe((_event: Event) => {
      this.translateLabels();
    });

    // Initialize the translations once at construction time
    this.translateLabels();
  }

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const of = this.translateService ? this.translateService.instant("shared.grid.labels.of") : "of";

    if (length === 0 || pageSize === 0) {
      return `0 ${of} ${length}`;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize > length ? (Math.ceil(length / pageSize) - 1) * pageSize : page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);

    return `${startIndex + 1} - ${endIndex} ${of} ${length}`;
  };

  injectTranslateService(translate: TranslateService): void {
    this.translateService = translate;

    this.translateService.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels(): void {
    this.firstPageLabel = this.translateService.instant("shared.grid.labels.firstPage");
    this.itemsPerPageLabel = this.translateService.instant("shared.grid.labels.itemsPerPage");
    this.lastPageLabel = this.translateService.instant("shared.grid.labels.lastPage");
    this.nextPageLabel = this.translateService.instant("shared.grid.labels.nextPage");
    this.previousPageLabel = this.translateService.instant("shared.grid.labels.previousPage");
    this.changes.next(); // Fire a change event to make sure that the labels are refreshed
  }
}
