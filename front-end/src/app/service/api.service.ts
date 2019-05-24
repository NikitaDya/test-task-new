import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {MzToastService} from 'ngx-materialize';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,
              private toast: MzToastService) { }

  handleError = error => {
    console.log(error)
    return Observable.create(o => {
      if (error) {
        this.toast.show(error.error.error, 3000 );
        o.error(error);
        return;
      }
    });
  };

  mapError() {
    return map((data: any) => {
      if (!data) {
        throw new Error('API endpoint not responsive');
      }
      if (data.error) {
        throw new Error(data.error || 'Error');
      }
      return data.data;
    });
  }

  getUsers() {
    return this.http.get(environment.api + 'users').pipe(
      this.mapError(), catchError(this.handleError)
    );
  }

  createUser(name) {
    return this.http.post(environment.api+ 'users', name).pipe(
      this.mapError(), catchError(this.handleError)
    );
  }

  createHobby(data) {
    return this.http.post(environment.api +'hobbies', data).pipe(
      this.mapError(), catchError(this.handleError)
    );
  }
  deleteHobby(id) {
    return this.http.delete(environment.api+ 'hobbies/' + id).pipe(
      this.mapError(), catchError(this.handleError)
    );
  }
}
