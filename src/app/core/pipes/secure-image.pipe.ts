import {Pipe, PipeTransform} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Pipe({
  name: 'secureImage',
  standalone: true
})
export class SecureImagePipe implements PipeTransform {

  constructor(private http: HttpClient) {
  }

  transform(url: string): Observable<string> {
    return this.http.get(url, {responseType: 'blob'})
      .pipe(
        map(blob => URL.createObjectURL(blob))
      );
  }

}
