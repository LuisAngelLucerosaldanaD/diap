import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {
  }

  transform(url: any) {
    if (!url) return '';
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
