import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions,URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import {ENV} from '../app/env';


/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserData {

  constructor(public http: Http) {
    console.log('Hello UserData Provider');
  }

  listOfMyLibraryBook(): Observable<any> {
		 let body = {
		 	user_id:localStorage['user_id']
		 };
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'getLibraryBooks.json',JSON.stringify(body), options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
	}

 deleteOfMyLibraryBook(bookdata): Observable<any> {
		 let body = {
		 	book_id:bookdata.id,
		 	user_id:localStorage['user_id']
		 }
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'removeLibraryBooks.json',JSON.stringify(body), options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
	}

sendFeedBack(feedback): Observable<any> {
	     feedback.user_id=localStorage['user_id'];
		let body = JSON.stringify(feedback);
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'feedback', body,options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
 }
 listOfRecommandation(): Observable<any> {
		 // let body = {
		 // 	user_id:localStorage['user_id']
		 // };
		let params: URLSearchParams = new URLSearchParams();
			
			 params.set('user_id',localStorage['user_id']);	
	
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		}),
		search:params
	});
	return this.http.get(ENV.endPoint+'recommended', options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
	}
	
	contactUs(contactUsData): Observable<any> {	     
		let body = JSON.stringify(contactUsData);
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'contactUs.json', body,options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
 }

 	aboutUs(): Observable<any> {
		// let body = JSON.stringify(Lo);
		let options = new RequestOptions({
			headers: new Headers({
				'Content-Type': 'application/json',
			})
		});
		return this.http.get(ENV.endPoint+'aboutUs.json', options)
		.map(response => {
		return response.json();
		})
		.catch(error =>{
		return error;
		});
	}

	sendListeningTime(): Observable<any>{
		let body ={
			user_id:localStorage['user_id'],
			total_listening_time:localStorage['totalListeningTime']
		} ;
		let options=new RequestOptions({
			headers:new Headers({
				'Content-Type':'application/json',
			})
		});
		return this.http.post(ENV.endPoint+'totalListeningTime.json', body,options)
		.map(response => {
		return response.json();
		})
		.catch(error =>{
		return error;
		});
	}	

	editProfile(editProfileData): Observable<any> {	     
		let body = JSON.stringify(editProfileData);
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'updateInfo.json', body,options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
 }	

 userData(userData): Observable<any> {	     
		let body = JSON.stringify(userData);
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'paymentHistory.json', body,options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
 }
onDeleteMySubscribedBook(bookdata): Observable<any> {	     
		 let body = {
		 	book_id:bookdata.id,
		 	user_id:localStorage['user_id']
		 }
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'removeFromLibrary.json',JSON.stringify(body), options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
 }
 combineSubscribe(userData): Observable<any> {	     
		let body = {
			user_id:userData.id
		}
		let options = new RequestOptions({
		headers: new Headers({
		'Content-Type': 'application/json',
		})
	});
	return this.http.post(ENV.endPoint+'combineSubscribe.json', JSON.stringify(body),options)
	.map(response => {
	return response.json();
	})
	.catch(error =>{
	return error;
	});
 }
}

