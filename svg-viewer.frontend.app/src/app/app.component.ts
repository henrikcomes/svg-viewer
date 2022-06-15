import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ISVG } from './svg';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  svgs: ISVG[] = [];
  selected?: ISVG = undefined;

  constructor(private sanitizer: DomSanitizer) {}

  processFiles(data: any): void {
    this.svgs = [];

    if (!data.target.files?.length) {
      return;
    }

    for (const file of data.target.files) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt?.target?.result) {
          let svg = evt?.target?.result as string;
          // svg = svg.replace(/(height="[a-zA-Z0-9]{0,}")/g, "height=\"100%\"")
          // svg = svg.replace(/(width="[a-zA-Z0-9]{0,}")/g, "width=\"100%\"")

          this.svgs.push({
            name: file.name,
            value: svg,
            sanitizedValue: this.sanitizer.bypassSecurityTrustHtml(svg),
          });
        }
      };
      reader.readAsText(file);
    }
  }

  view(svg: ISVG): void {
    this.selected = svg;
  }
}
