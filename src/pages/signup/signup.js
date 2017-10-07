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
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SignUp } from "../../providers/sign-up";
import { Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app';
/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Signup = (function () {
    function Signup(translateService, http, navCtrl, navParams, signupprovider, loadingCtrl, alert, appProvider) {
        this.translateService = translateService;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.signupprovider = signupprovider;
        this.loadingCtrl = loadingCtrl;
        this.alert = alert;
        this.appProvider = appProvider;
        this.signupdata = {};
    }
    Signup.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Signup');
    };
    Signup.prototype.onSignup = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.signupprovider.signup(_this.signupdata); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.signupdata.response = data;
                if (_this.signupdata.response.status == 1) {
                    _this.alert.create({
                        title: _this.translateService.instant('message.success'),
                        subTitle: _this.translateService.instant('message.messageSignup'),
                        buttons: [{
                                text: _this.translateService.instant('message.ok'),
                                handler: function () {
                                    _this.navCtrl.pop();
                                }
                            }]
                    }).present();
                }
                else if (_this.signupdata.response.status == 0) {
                    _this.alert.create({
                        title: _this.translateService.instant('message.alreadyRegistered'),
                        subTitle: _this.translateService.instant('message.messageAlreadyRegistered'),
                        buttons: [{
                                text: _this.translateService.instant('message.ok'),
                                handler: function () {
                                    _this.navCtrl.pop();
                                }
                            }]
                    }).present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                _this.alert.create({
                    title: _this.translateService.instant('message.error'),
                    subTitle: _this.translateService.instant('message.somethingWentWrong'),
                    buttons: [{
                            text: _this.translateService.instant('message.ok'),
                            handler: function () {
                            }
                        }]
                }).present();
            });
        });
    };
    Signup.prototype.confirm = function () {
        if (this.confirm_password == this.signupdata.password) {
            this.message = false;
        }
        else {
            this.message = true;
        }
    };
    Signup.prototype.pass_confirm = function () {
        if (this.confirm_password) {
            // code...
            if (this.confirm_password == this.signupdata.password) {
                this.message = false;
            }
            else {
                this.message = true;
            }
        }
    };
    Signup.prototype.term = function (a) {
        this.termcondition = a;
        // alert(a)
    };
    Signup.prototype.onAlreadyRegistered = function () {
        this.navCtrl.pop();
    };
    return Signup;
}());
Signup = __decorate([
    IonicPage(),
    Component({
        selector: 'page-signup',
        templateUrl: 'signup.html',
        providers: [SignUp]
    }),
    __metadata("design:paramtypes", [TranslateService,
        Http, NavController,
        NavParams,
        SignUp,
        LoadingController,
        AlertController,
        AppProvider])
], Signup);
export { Signup };
//# sourceMappingURL=signup.js.map