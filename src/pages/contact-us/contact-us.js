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
import { Observable } from "rxjs/Rx";
import { UserData } from "../../providers/user-data";
import { Category } from "../category/category";
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app';
/**
 * Generated class for the ContactUs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ContactUs = (function () {
    function ContactUs(navCtrl, navParams, translateService, userDataProvider, loadingCtrl, alertCtrl, appProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translateService = translateService;
        this.userDataProvider = userDataProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.appProvider = appProvider;
        this.contactUsData = {};
    }
    ContactUs.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactUs');
    };
    ContactUs.prototype.onSubmit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.userDataProvider.contactUs(_this.contactUsData); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.contact = data;
                if (_this.contact.response == "true") {
                    _this.alertCtrl.create({
                        title: _this.translateService.instant('message.success'),
                        subTitle: _this.translateService.instant('contactus.successMessage'),
                        buttons: [{
                                text: _this.translateService.instant('message.ok'),
                                handler: function () {
                                    _this.navCtrl.setRoot(Category);
                                }
                            }]
                    }).present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    return ContactUs;
}());
ContactUs = __decorate([
    IonicPage(),
    Component({
        selector: 'page-contact-us',
        templateUrl: 'contact-us.html',
        providers: [UserData]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        TranslateService,
        UserData,
        LoadingController,
        AlertController,
        AppProvider])
], ContactUs);
export { ContactUs };
//# sourceMappingURL=contact-us.js.map