import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';

/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PaymentProvider {

  constructor(public http: Http) {
    console.log('Hello PaymentProvider Provider');
  }

  Payment(pay:any): Observable<any> {
		let body = JSON.stringify(pay);
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'paymentCard.json', body,options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
	}

 subscription(): Observable<any> {
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.get(ENV.endPoint+'subscriptionPlan.json',options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
	}
 oneTimePayment(pay:any): Observable<any> {
		let body = JSON.stringify(pay);
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'payment.json', body,options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
	}
   onPromoCodeValidate(pay:any): Observable<any> {
		let body = JSON.stringify(pay);
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'getPromoDetail.json', body,options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
	}
	onPromoCodeUpdate(pay:any): Observable<any> {
		let body = JSON.stringify(pay);
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'updatePromoDetail.json', body,options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
	}
}
