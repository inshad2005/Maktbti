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
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Rx';
import { PaymentProvider } from '../../providers/payment-provider';
import { AppProvider } from '../../providers/app';
var PaymentHistory = (function () {
    function PaymentHistory(navCtrl, appProvider, navParams, translateService, loadingCtrl, paymentProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.appProvider = appProvider;
        this.navParams = navParams;
        this.translateService = translateService;
        this.loadingCtrl = loadingCtrl;
        this.paymentProvider = paymentProvider;
        this.amount = 200;
        this.paymentData = {};
        this.paymentHistory = this.navParams.get('paymentHistory');
        StartCheckout.config({
            key: "test_open_k_0bbf6eeeaa38883b515b",
            complete: function (params) {
                _this.payment(params);
            }
        });
    }
    PaymentHistory.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PaymentHistory');
    };
    PaymentHistory.prototype.makePayment = function () {
        StartCheckout.open({
            amount: this.amount,
            // = AED 100.00
            currency: "SAR"
        });
    };
    PaymentHistory.prototype.payment = function (params) {
        var _this = this;
        this.paymentData = params;
        // this.paymentData.amount_paid=this.amount;
        this.paymentData.user_id = localStorage['user_id'];
        this.paymentData.name = localStorage['first_name'] + ' ' + localStorage['last_name'];
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.paymentProvider.Payment(_this.paymentData); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                //this.logindata.res = data
            });
        }, function (error) {
            return loading.dismiss().then(function () {
            });
        });
    };
    return PaymentHistory;
}());
PaymentHistory = __decorate([
    IonicPage(),
    Component({
        selector: 'page-payment-history',
        templateUrl: 'payment-history.html',
        providers: [PaymentProvider]
    }),
    __metadata("design:paramtypes", [NavController, AppProvider, NavParams, TranslateService, LoadingController, PaymentProvider])
], PaymentHistory);
export { PaymentHistory };
//# sourceMappingURL=payment-history.js.map