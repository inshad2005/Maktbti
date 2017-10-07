var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { Signup } from '../signup/signup';
import { Forgetpasword } from '../forgetpasword/forgetpasword';
import { Category } from '../category/category';
import { Observable } from 'rxjs/Rx';
import { LoginProvider } from '../../providers/login-provider';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app';
import { ENV } from '../../app/env';
var Newlogin = (function () {
    function Newlogin(translateService, navCtrl, navParams, loadingCtrl, loginProvider, alertCtrl, appProvider, events) {
        this.translateService = translateService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.loginProvider = loginProvider;
        this.alertCtrl = alertCtrl;
        this.appProvider = appProvider;
        this.events = events;
        this.logindata = {};
    }
    Newlogin.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Newlogin');
    };
    Newlogin.prototype.onSignIn = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.loginProvider.Login(_this.logindata); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                //this.logindata.res = data
                if (data.status == 1) {
                    _this.navCtrl.setRoot(Category);
                    localStorage['user_id'] = data.data.id;
                    localStorage['aut'] = "login";
                    localStorage['first_name'] = data.data.first_name;
                    localStorage['last_name'] = data.data.last_name;
                    localStorage['email'] = data.data.email;
                    localStorage['image'] = ENV.profile + data.data.image;
                    _this.events.publish('user:created');
                }
                else if (data.status == 0) {
                    _this.alertCtrl.create({
                        title: _this.translateService.instant('forgot.error'),
                        subTitle: _this.translateService.instant('login.errorMsg'),
                        buttons: [{
                                text: "ok"
                            }]
                    }).present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
            });
        });
    };
    Newlogin.prototype.signup = function () {
        this.navCtrl.push(Signup);
    };
    Newlogin.prototype.forgtpaswd = function () {
        this.navCtrl.push(Forgetpasword);
    };
    return Newlogin;
}());
Newlogin = __decorate([
    IonicPage(),
    Component({
        selector: 'page-newlogin',
        templateUrl: 'newlogin.html',
        providers: [LoginProvider]
    }),
    __metadata("design:paramtypes", [TranslateService,
        NavController,
        NavParams,
        LoadingController,
        LoginProvider,
        AlertController,
        AppProvider,
        Events])
], Newlogin);
export { Newlogin };
//# sourceMappingURL=newlogin.js.map