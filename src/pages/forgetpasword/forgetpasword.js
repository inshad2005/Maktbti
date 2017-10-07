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
import { Thanks } from '../thanks/thanks';
import { Observable } from 'rxjs/Rx';
import { LoginProvider } from '../../providers/login-provider';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app';
/**
 * Generated class for the Forgetpasword page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Forgetpasword = (function () {
    function Forgetpasword(translateService, navCtrl, navParams, loadingCtrl, alert, loginProvider, appProvider) {
        this.translateService = translateService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alert = alert;
        this.loginProvider = loginProvider;
        this.appProvider = appProvider;
        this.show = true;
        this.show1 = false;
        this.forgot = {};
    }
    Forgetpasword.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Forgetpasword');
    };
    Forgetpasword.prototype.onEmailValidate = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.loginProvider.getOtp(_this.forgot); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                if (data.status == 1) {
                    //this.forgot.res = data
                    localStorage['uniquecode'] = data.unique_code;
                    _this.unique_codeStatus = "otp";
                    _this.user_id = data.id;
                    _this.alert.create({
                        title: _this.translateService.instant('message.success'),
                        subTitle: _this.translateService.instant('forgot.checkotp'),
                        buttons: [{
                                text: _this.translateService.instant('message.ok'),
                                handler: function () {
                                    _this.show1 = true;
                                    _this.show = false;
                                }
                            }]
                    }).present();
                }
                else if (data.status == 0) {
                    _this.alert.create({
                        title: _this.translateService.instant('forgot.error'),
                        subTitle: _this.translateService.instant('forgot.errorAlert'),
                        buttons: [{
                                text: _this.translateService.instant('message.ok'),
                            }]
                    }).present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
            });
        });
    };
    Forgetpasword.prototype.onOtpValidate = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present());
        if (localStorage['uniquecode'] == this.forgot.otp) {
            loading.dismiss().then(function () {
                _this.unique_codeStatus = "otpvalidated";
                _this.otpstatus = "validate";
            });
        }
        else {
            loading.dismiss().then(function () {
                _this.otpstatus = "notvalidate";
            });
        }
    };
    Forgetpasword.prototype.onChangePasss = function () {
        var _this = this;
        this.forgot.id = this.user_id;
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.loginProvider.updatepassword(_this.forgot); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.forgot.res = data;
                if (_this.forgot.res.status == 1) {
                    _this.navCtrl.push(Thanks);
                    // this.alert.create({
                    //              title:"Success",
                    //              subTitle:"Login Succesful",
                    //              buttons:[{
                    //                text:"ok",
                    //                handler:() => {
                    //                // this.navCtrl.setRoot(Category)
                    //                }
                    //              }]
                    //       				}).present();      				
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
            });
        });
    };
    Forgetpasword.prototype.confirm = function () {
        if (this.forgot.password == this.forgot.confirm) {
            this.passconStatus = false;
        }
        else {
            this.passconStatus = true;
        }
    };
    Forgetpasword.prototype.pass_confirm = function () {
        if (this.forgot.confirm) {
            // code...
            if (this.forgot.password == this.forgot.confirm) {
                this.passconStatus = false;
            }
            else {
                this.passconStatus = true;
            }
        }
    };
    return Forgetpasword;
}());
Forgetpasword = __decorate([
    IonicPage(),
    Component({
        selector: 'page-forgetpasword',
        templateUrl: 'forgetpasword.html',
        providers: [LoginProvider]
    }),
    __metadata("design:paramtypes", [TranslateService,
        NavController,
        NavParams,
        LoadingController,
        AlertController,
        LoginProvider,
        AppProvider])
], Forgetpasword);
export { Forgetpasword };
//# sourceMappingURL=forgetpasword.js.map