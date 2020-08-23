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

  url = 'https://raw.githubusercontent.com/gesab001/assets/master/homeschool/math/math_questions.json';
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('QuizService');
  }

  clearCache() {
    this._data = null;
  }


  getData() {
    this.clearCache();
    if (!this._data) {
      this._data = this.http
        .get(this.url)
        .pipe(publishReplay(1), refCount());
    }
    return this._data;
  }

  getCachedData(){
          return this._data;
  }
}
