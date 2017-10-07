import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';
/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }
	Login(Login:any): Observable<any> {
		let body = JSON.stringify(Login);
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'login.json', body,options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
	}
	getOtp(forgot:any): Observable<any> {
		let body =forgot;
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'forgotPassword.json', body,options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
	}
	updatepassword(Login:any): Observable<any> {
		let body = {
			'id':Login.id,
		     'password':Login.password}
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'resetPassword.json', JSON.stringify(body),options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
	}
}
