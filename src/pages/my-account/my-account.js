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
import { FeedBack } from '../feed-back/feed-back';
import { SubscriptionPlans } from '../subscription-plans/subscription-plans';
import { ListeningTime } from '../listening-time/listening-time';
import { PaymentHistory } from '../payment-history/payment-history';
import { MySubscribed } from '../my-subscribed/my-subscribed';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app';
import { AcountSetting } from '../acount-setting/acount-setting';
import { UserData } from '../../providers/user-data';
import { Observable } from 'rxjs/Rx';
/**
 * Generated class for the MyAccount page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MyAccount = (function () {
    function MyAccount(navCtrl, navParams, translateService, appProvider, userDataProvider, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translateService = translateService;
        this.appProvider = appProvider;
        this.userDataProvider = userDataProvider;
        this.loadingCtrl = loadingCtrl;
        this.userdata = {};
    }
    MyAccount.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyAccount');
    };
    MyAccount.prototype.ngOnInit = function () {
        var _this = this;
        this.userdata.id = localStorage['user_id'];
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.userDataProvider.userData(_this.userdata); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.myAccountData = data;
                _this.userDetails = _this.myAccountData.user_details[0];
                _this.listeningTime = _this.userDetails.total_listening_time;
                _this.subscriptionPlansData = _this.myAccountData.Subscription_plan;
                _this.userImage = localStorage['image'];
                _this.paymentHistory = _this.myAccountData.payment_history;
                // alert(JSON.stringify(this.userDetails) )
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    MyAccount.prototype.onFeedback = function () {
        this.navCtrl.push(FeedBack);
    };
    MyAccount.prototype.onSubscriptionPlans = function () {
        this.navCtrl.push(SubscriptionPlans, { subscriptionPlanData: this.subscriptionPlansData, userdetails: this.userDetails });
    };
    MyAccount.prototype.onListentiming = function () {
        this.navCtrl.push(ListeningTime, { listeningTime: this.listeningTime });
    };
    MyAccount.prototype.onPaymentHistory = function () {
        this.navCtrl.push(PaymentHistory, { paymentHistory: this.paymentHistory });
    };
    MyAccount.prototype.onAccountSetting = function () {
        this.navCtrl.push(AcountSetting);
    };
    MyAccount.prototype.onSubscribedBook = function () {
        this.navCtrl.push(MySubscribed);
    };
    return MyAccount;
}());
MyAccount = __decorate([
    IonicPage(),
    Component({
        selector: 'page-my-account',
        templateUrl: 'my-account.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        TranslateService,
        AppProvider,
        UserData,
        LoadingController])
], MyAccount);
export { MyAccount };
//# sourceMappingURL=my-account.js.map