import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';
import {interval} from 'rxjs/internal/observable/interval';
import {startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(private apiService: ApiService) {
  }

  testData: any;

  ngOnInit() {
    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.apiService.getTestData())
      )
      .subscribe(res => {
        console.log('Keep on polling bff for new values...');
        console.log(res);
        this.testData = res;
      },
      err => console.log(err));
  }
}
