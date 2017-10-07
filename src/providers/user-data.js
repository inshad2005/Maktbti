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
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { ENV } from '../app/env';
/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var UserData = (function () {
    function UserData(http) {
        this.http = http;
        console.log('Hello UserData Provider');
    }
    UserData.prototype.listOfMyLibraryBook = function () {
        var body = {
            user_id: localStorage['user_id']
        };
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.post(ENV.endPoint + 'getLibraryBooks.json', JSON.stringify(body), options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    UserData.prototype.deleteOfMyLibraryBook = function (bookdata) {
        var body = {
            book_id: bookdata.id,
            user_id: localStorage['user_id']
        };
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.post(ENV.endPoint + 'removeLibraryBooks.json', JSON.stringify(body), options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    UserData.prototype.sendFeedBack = function (feedback) {
        feedback.user_id = localStorage['user_id'];
        var body = JSON.stringify(feedback);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.post(ENV.endPoint + 'feedback', body, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    UserData.prototype.listOfRecommandation = function () {
        // let body = {
        // 	user_id:localStorage['user_id']
        // };
        var params = new URLSearchParams();
        params.set('user_id', localStorage['user_id']);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            search: params
        });
        return this.http.get(ENV.endPoint + 'recommended', options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    UserData.prototype.contactUs = function (contactUsData) {
        var body = JSON.stringify(contactUsData);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.post(ENV.endPoint + 'contactUs.json', body, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    UserData.prototype.aboutUs = function () {
        // let body = JSON.stringify(Lo);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.get(ENV.endPoint + 'aboutUs.json', options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    UserData.prototype.sendListeningTime = function () {
        var body = {
            user_id: localStorage['user_id'],
            total_listening_time: localStorage['totalListeningTime']
        };
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.post(ENV.endPoint + 'totalListeningTime.json', body, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    UserData.prototype.editProfile = function (editProfileData) {
        var body = JSON.stringify(editProfileData);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.post(ENV.endPoint + 'updateInfo.json', body, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    UserData.prototype.userData = function (userData) {
        var body = JSON.stringify(userData);
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.post(ENV.endPoint + 'paymentHistory.json', body, options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    UserData.prototype.onDeleteMySubscribedBook = function (bookdata) {
        var body = {
            book_id: bookdata.id,
            user_id: localStorage['user_id']
        };
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        });
        return this.http.post(ENV.endPoint + 'removeFromLibrary.json', JSON.stringify(body), options)
            .map(function (response) {
            return response.json();
        })
            .catch(function (error) {
            return error;
        });
    };
    return UserData;
}());
UserData = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], UserData);
export { UserData };
//# sourceMappingURL=user-data.js.map