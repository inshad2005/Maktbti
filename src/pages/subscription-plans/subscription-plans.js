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
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Rx';
import { PaymentProvider } from '../../providers/payment-provider';
import { AppProvider } from "../../providers/app";
var SubscriptionPlans = (function () {
    function SubscriptionPlans(navCtrl, navParams, translateService, loadingCtrl, paymentProvider, appProvider, altCtrl, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translateService = translateService;
        this.loadingCtrl = loadingCtrl;
        this.paymentProvider = paymentProvider;
        this.appProvider = appProvider;
        this.altCtrl = altCtrl;
        this.modalCtrl = modalCtrl;
        this.amount = 200;
        this.showdiv1 = true;
        this.showdiv2 = false;
        this.PaymentDetails = {};
        this.paymentData = this.navParams.get('subscriptionPlanData');
        this.userdetails = this.navParams.get('userdetails');
        this.paymentDataSend = {};
        StartCheckout.config({
            key: "test_open_k_0bbf6eeeaa38883b515b",
            complete: function (params) {
                _this.payment(params);
            }
        });
    }
    SubscriptionPlans.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SubscriptionPlans');
    };
    // ngOnInit(){
    // 	let loading = this.loadingCtrl.create({content: 'Loading'});
    // 		Observable.fromPromise(loading.present())
    // 		.flatMap(data => this.paymentProvider.subscription())
    // 		.subscribe(data =>
    // 		loading.dismiss().then(() =>{ 
    // 		this.paymentData = data.subscriptionPlan;
    // 		//alert(JSON.stringify(this.paymentData));
    // 		// this.about_data=data.about_us.content;
    // 		//alert(JSON.stringify(this.about));
    // 		}),
    // 		error =>
    // 		loading.dismiss().then(() => {})
    // 		);	
    // }
    SubscriptionPlans.prototype.makePayment = function (a) {
        this.showdiv1 = false;
        this.showdiv2 = true;
        // let profileModal= this.modalCtrl.create(Payment)
        //  profileModal.present();
        // StartCheckout.open({
        //   amount:a.amount*100,
        //     // = AED 100.00
        //   currency: "SAR"
        // });
    };
    SubscriptionPlans.prototype.payment = function (params) {
        var _this = this;
        this.paymentDataSend = params;
        // this.paymentData.amount_paid=this.amount;
        var splitdata = this.PaymentDetails.expireDate.split('/');
        this.PaymentDetails.exp_month = splitdata[0];
        this.PaymentDetails.exp_year = splitdata[1];
        this.PaymentDetails.user_id = localStorage['user_id'];
        this.PaymentDetails.name = localStorage['first_name'] + ' ' + localStorage['last_name'];
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.paymentProvider.Payment(_this.PaymentDetails); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                if (data.response == 'true') {
                    var alert_1 = _this.altCtrl.create({
                        title: _this.translateService.instant('message.payment'),
                        subTitle: _this.translateService.instant('message.ok'),
                        buttons: [
                            {
                                text: _this.translateService.instant('message.ok'),
                                role: 'cancel',
                                handler: function () {
                                    console.log('Cancel clicked');
                                }
                            }
                        ]
                    });
                    alert_1.present();
                }
                else {
                    var alert_2 = _this.altCtrl.create({
                        title: _this.translateService.instant('message.payment'),
                        subTitle: _this.translateService.instant('message.messagepaymentfailed'),
                        buttons: [
                            {
                                text: _this.translateService.instant('message.ok'),
                                role: 'cancel',
                                handler: function () {
                                    console.log('Cancel clicked');
                                }
                            }
                        ]
                    });
                    alert_2.present();
                }
                //this.logindata.res = data
            });
        }, function (error) {
            return loading.dismiss().then(function () {
            });
        });
    };
    SubscriptionPlans.prototype.cardCheck = function (a) {
        this.cardImage = this.card(a);
    };
    SubscriptionPlans.prototype.card = function (number) {
        // visa
        var re = new RegExp("^4");
        if (number.match(re) != null)
            return "Visa.png";
        // Mastercard
        re = new RegExp("^5[1-5]");
        if (number.match(re) != null)
            return "Mastercard.png";
        // AMEX
        re = new RegExp("^3[47]");
        if (number.match(re) != null)
            return "AMEX.png";
        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (number.match(re) != null)
            return "Discover.png";
        // Diners
        re = new RegExp("^36");
        if (number.match(re) != null)
            return "Diners.png";
        // Diners - Carte Blanche
        re = new RegExp("^30[0-5]");
        if (number.match(re) != null)
            return "Diners.png";
        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (number.match(re) != null)
            return "JCB.png";
        // Visa Electron
        re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
        if (number.match(re) != null)
            return "Visa Electron.png";
        re = new RegExp("^12");
        if (number.match(re) != null)
            return "Airplus.png";
        re = new RegExp("^67");
        if (number.match(re) != null)
            return "Maestro.png";
        return "";
    };
    SubscriptionPlans.prototype.dateCheck = function (a) {
        this.dateError = false;
        if (a.length < 2) {
            this.slas = 'flase';
            this.PaymentDetails.expireDate = a;
        }
        else if (a.length == 2) {
            if (this.slas != 'true') {
                this.PaymentDetails.expireDate = a + '/';
            }
        }
        if (a.length == 5) {
            var mydate = parseInt('20' + a.split('/')[1]);
            var mymonth = parseInt(a.split('/')[0]);
            var date = new Date();
            var currentdate = date.getFullYear();
            var currentMonth = date.getMonth() + 1;
            if (mydate < currentdate) {
                this.dateError = true;
            }
            else if (mydate == currentdate) {
                if (mymonth < currentMonth) {
                    this.dateError = true;
                }
            }
            // code...
        }
        if (this.PaymentDetails.expireDate.length == 3) {
            this.slas = 'true';
        }
    };
    SubscriptionPlans.prototype.onCancel = function () {
        this.showdiv1 = true;
        this.showdiv2 = false;
    };
    return SubscriptionPlans;
}());
SubscriptionPlans = __decorate([
    IonicPage(),
    Component({
        selector: 'page-subscription-plans',
        templateUrl: 'subscription-plans.html',
        providers: [PaymentProvider]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        TranslateService,
        LoadingController,
        PaymentProvider,
        AppProvider,
        AlertController,
        ModalController])
], SubscriptionPlans);
export { SubscriptionPlans };
//# sourceMappingURL=subscription-plans.js.map