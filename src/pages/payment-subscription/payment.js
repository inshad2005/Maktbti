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
import { IonicPage, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { UserData } from '../../providers/user-data';
import { AppProvider } from "../../providers/app";
/**
 * Generated class for the AboutUs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Payment = (function () {
    function Payment(appProvider, userDataProvider, loadingCtrl) {
        this.appProvider = appProvider;
        this.userDataProvider = userDataProvider;
        this.loadingCtrl = loadingCtrl;
    }
    Payment.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutUs');
    };
    Payment.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Loading' });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.userDataProvider.aboutUs(); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.about = data;
                // this.about_data=data.about_us.content;
                //alert(JSON.stringify(this.about));
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    return Payment;
}());
Payment = __decorate([
    IonicPage(),
    Component({
        selector: 'page-payment',
        templateUrl: 'payment.html',
        providers: [UserData]
    }),
    __metadata("design:paramtypes", [AppProvider,
        UserData,
        LoadingController])
], Payment);
export { Payment };
//# sourceMappingURL=payment.js.map