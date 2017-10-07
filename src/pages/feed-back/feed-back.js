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
import { TranslateService } from '@ngx-translate/core';
import { UserData } from "../../providers/user-data";
import { AppProvider } from '../../providers/app';
/**
 * Generated class for the FeedBack page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FeedBack = (function () {
    function FeedBack(navCtrl, navParams, userDataProvider, loadingCtrl, alert, translateService, appProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userDataProvider = userDataProvider;
        this.loadingCtrl = loadingCtrl;
        this.alert = alert;
        this.translateService = translateService;
        this.appProvider = appProvider;
        this.feedback = {};
    }
    FeedBack.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedBack');
    };
    FeedBack.prototype.onSubmit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return Observable.forkJoin(_this.userDataProvider.sendFeedBack(_this.feedback)); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.data = data;
                _this.alert.create({
                    title: _this.translateService.instant('feedback.alerttitle'),
                    subTitle: _this.translateService.instant('feedback.alertsubtitle'),
                    buttons: [{
                            text: _this.translateService.instant('feedback.alertok'),
                            handler: function () {
                                _this.navCtrl.pop();
                            }
                        }]
                }).present();
                //this.booklist=data[0];
                // this.booklist=this.booklist[0]
                // console.log(this.booklist[0])
                // console.log(JSON.stringify(this.booklist[0]))
                // this.Category=data[1]; 
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    return FeedBack;
}());
FeedBack = __decorate([
    IonicPage(),
    Component({
        selector: 'page-feed-back',
        templateUrl: 'feed-back.html',
        providers: [UserData]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        UserData,
        LoadingController,
        AlertController,
        TranslateService,
        AppProvider])
], FeedBack);
export { FeedBack };
//# sourceMappingURL=feed-back.js.map