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
;
import { ListenLibrary } from '../listen-library/listen-library';
import { AudioBook } from "../../providers/audio-book";
import { AppProvider } from "../../providers/app";
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the AllBooks page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ViewMore = (function () {
    function ViewMore(navCtrl, navParams, loadingCtrl, audiobbok, translateService, appProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.audiobbok = audiobbok;
        this.translateService = translateService;
        this.appProvider = appProvider;
        this.booklist = this.navParams.get('bookdata');
        this.titleEng = this.navParams.get('titleEng');
        this.titleArb = this.navParams.get('titleArb');
        console.log(JSON.stringify(this.booklist));
    }
    //   ngOnInit(){
    //   this.language='eng';
    //     let loading = this.loadingCtrl.create({content: 'Loading'});
    //             Observable.fromPromise(loading.present())
    //             .flatMap(data => Observable.forkJoin(this.audiobbok.allBookGet()))
    //             .subscribe(data =>
    //               loading.dismiss().then(() =>{
    //               this.booklist=data[0];
    //               }),
    //                error =>
    //                     loading.dismiss().then(() => {}))
    // }
    ViewMore.prototype.onBook = function (bookdata) {
        this.navCtrl.push(ListenLibrary, { bookdata: bookdata });
    };
    return ViewMore;
}());
ViewMore = __decorate([
    IonicPage(),
    Component({
        selector: 'page-view-more',
        templateUrl: 'view-more.html',
        providers: [AudioBook]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        LoadingController,
        AudioBook,
        TranslateService,
        AppProvider])
], ViewMore);
export { ViewMore };
//# sourceMappingURL=view-more.js.map