import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';

/*
  Generated class for the SignUp provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SignUp {

  constructor(public http: Http) {
    console.log('Hello SignUp Provider');
  }
	signup(data): Observable<any> {
		let body = JSON.stringify(data);
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'register.json', body,options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
	}
}
