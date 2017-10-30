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
export class ImagePath {

  constructor(public http: Http) {
    console.log('Hello UserData Provider');
  }
findPath(path){
	
	if (path) {
		console.log('pathfind'+path)
		return path
	}else{
		console.log('path not find'+path)
		return 'no_image.jpg'
	}

}
  
}

