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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app';
/**
 * Generated class for the ListeningTime page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ListeningTime = (function () {
    function ListeningTime(navCtrl, navParams, translateService, appProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translateService = translateService;
        this.appProvider = appProvider;
        this.listeningTime = 0;
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.listeningTime = this.navParams.get('listeningTime');
        // alert(this.listeningTime);
        this.days = Math.floor(this.listeningTime / 86400);
        this.hours = Math.floor((this.listeningTime % 86400) / 3600);
        this.minutes = Math.floor(((this.listeningTime % 86400) % 3600) / 60);
        this.seconds = Math.floor(((this.listeningTime % 86400) % 3600) % 60);
    }
    ListeningTime.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListeningTime');
    };
    return ListeningTime;
}());
ListeningTime = __decorate([
    IonicPage(),
    Component({
        selector: 'page-listening-time',
        templateUrl: 'listening-time.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        TranslateService,
        AppProvider])
], ListeningTime);
export { ListeningTime };
//# sourceMappingURL=listening-time.js.map