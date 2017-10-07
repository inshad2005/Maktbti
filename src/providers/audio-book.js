var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { ENV } from '../app/env';
/*
  Generated class for the AudioBook provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var AudioBook = (function () {
    function AudioBook(http) {
        this.http = http;
        console.log('Hello AudioBook Provider');
    }
    AudioBook.prototype.categoryGet = function () {
        // let body = JSON.stringify(Lo);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.get(ENV.endPoint + 'getCategories', options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    AudioBook.prototype.catOfBookGet = function (parameter) {
        var params = new URLSearchParams();
        if (parameter) {
            params.set('limit', '15');
            // code...
        }
        else {
            params.set('limit', "null");
        }
        params.set('user_id', localStorage['user_id']);
        // let body = JSON.stringify(Lo);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            search: params
        });
        return this.http.get(ENV.endPoint + 'getBooks.json', options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    AudioBook.prototype.addToMyLibrary = function (bookdata) {
        //alert(JSON.stringify(bookdata))
        var body = JSON.stringify(bookdata);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.post(ENV.endPoint + 'myLibrary.json', body, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            console.log(JSON.stringify(error));
            return error;
        });
    };
    AudioBook.prototype.getSimilarBook = function (bookdata) {
        var body = {
            category_id: bookdata.category_id,
            sub_category_id: bookdata.sub_category_id
        };
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.post(ENV.endPoint + 'similarBooks.json', JSON.stringify(body), options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    AudioBook.prototype.categoryWiseBookGet = function () {
        // let body = JSON.stringify(Lo);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.get(ENV.endPoint + 'categoryWise', options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    AudioBook.prototype.allBookGet = function () {
        // let body = JSON.stringify(Lo);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.get(ENV.endPoint + 'allBooks', options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    // bookUnSubscribed(): Observable<any> {
    // 		// let body = JSON.stringify(Lo);
    // 		let options = new RequestOptions({
    // 		headers: new Headers({
    // 		'Content-Type': 'application/json',
    // 		})
    // 	});
    // 	return this.http.get(ENV.endPoint+'getCategories.json', options)
    // 	.map(response => {
    // 	return response.json();
    // 	})
    // 	.catch(error =>{
    // 	return error;
    // 	});
    // 	}
    AudioBook.prototype.postReview = function (reviewData) {
        //alert(JSON.stringify(bookdata))
        var body = JSON.stringify(reviewData);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.post(ENV.endPoint + 'submitReview', body, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            console.log(JSON.stringify(error));
            return error;
        });
    };
    AudioBook.prototype.getRating = function (id) {
        var params = new URLSearchParams();
        if (id) {
            params.set('book_id', id);
            params.set('user_id', localStorage['user_id']);
            // code...
        }
        // let body = JSON.stringify(Lo);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            search: params
        });
        return this.http.get(ENV.endPoint + 'reviewRating', options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    AudioBook.prototype.getdeeplinkBook = function (id) {
        var params = new URLSearchParams();
        if (id) {
            params.set('book_id', id);
            // code...
        }
        // let body = JSON.stringify(Lo);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            search: params
        });
        return this.http.get(ENV.endPoint + 'sharedBook', options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    return AudioBook;
}());
AudioBook = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AudioBook);
export { AudioBook };
//# sourceMappingURL=audio-book.js.map