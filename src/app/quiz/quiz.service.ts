import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { tap } from 'rxjs/operators';
import {publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  _data: any = null;

  private handleError: HandleError;

  //url = 'https://raw.githubusercontent.com/gesab001/assets/master/homeschool/';
    url = 'https://172.20.10.4/php/homeschool/select_questions.php?subject=';

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('QuizService');
  }

  clearCache() {
    this._data = null;
  }


  getData(subject, title, topic, year, letter, number) {
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .get(this.url+subject+"&title="+title+"&topic="+topic+"&year="+year+"&letter="+letter+"&number="+number)
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }

  getCachedData(){
          return this._data;
  }
}
