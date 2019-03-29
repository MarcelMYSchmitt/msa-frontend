import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }
  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getTestData(): Observable<any> {
    const radnomnumber = 100;
    // const radnomnumber = Math.floor((Math.random() * 10) + 1);

    return this.http.get('http://localhost:8080/api/bff/' + radnomnumber)
      .pipe(
        map(this.extractData)
      );
  }
}
