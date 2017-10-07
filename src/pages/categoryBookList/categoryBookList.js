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
import { Observable } from 'rxjs/Rx';
import { ListenLibrary } from '../listen-library/listen-library';
import { AudioBook } from "../../providers/audio-book";
import { ViewMore } from "../view-more/view-more";
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from "../../providers/app";
/**
 * Generated class for the Category page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CategoryBookList = (function () {
    // myInput;
    // bookData;
    // subcategoryData
    function CategoryBookList(navCtrl, navParams, loadingCtrl, audiobbok, translateService, appProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.audiobbok = audiobbok;
        this.translateService = translateService;
        this.appProvider = appProvider;
        this.searchbar = 'false';
        this.segment = "featured";
        this.categoryWiseBookList = this.navParams.get('categoryWiseBook');
        // console.log(JSON.stringify(this.categoryWiseBookList));
        // this.bookData=this.categoryWiseBookList['sub_categories'];
        // this.subcategoryData=this.bookData[0].books
        // alert(JSON.stringify(this.subcategoryData))
    }
    CategoryBookList.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Category');
    };
    CategoryBookList.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.categoryWiseBookList) {
            var loading_1 = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return Observable.forkJoin(_this.audiobbok.categoryWiseBookGet()); })
                .subscribe(function (data) {
                return loading_1.dismiss().then(function () {
                    _this.booklist = data[0];
                    console.log(JSON.stringify(_this.booklist));
                    // this.bookData=data[0];
                    // this.subcategoryData=this.bookData.sub_categories;
                    // alert('hi')
                    // alert(JSON.stringify(this.subcategoryData));
                    // this.allBooklist=data[1];
                    // this.booklist=this.booklist[0]
                    // console.log(this.booklist[0])
                    // console.log(JSON.stringify(this.booklist[0]))
                    // this.Category=data[2]; 
                });
            }, function (error) {
                return loading_1.dismiss().then(function () { });
            });
        }
    };
    CategoryBookList.prototype.onBook = function (bookdata) {
        var _this = this;
        this.searchbar = 'false';
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading'), duration: 500, });
        Observable.of(loading).delay(200).flatMap(function (loading) { return loading.present(); }).subscribe(function (data) { return loading.dismiss().then(function () {
            _this.navCtrl.push(ListenLibrary, { bookdata: bookdata });
        }); });
    };
    CategoryBookList.prototype.onViewMore = function (data, titleEng, titleArb) {
        this.navCtrl.push(ViewMore, { bookdata: data, titleEng: titleEng, titleArb: titleArb });
    };
    return CategoryBookList;
}());
CategoryBookList = __decorate([
    IonicPage(),
    Component({
        selector: 'page-categoryBookList',
        templateUrl: 'categoryBookList.html',
        providers: [AudioBook]
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        LoadingController, AudioBook,
        TranslateService,
        AppProvider])
], CategoryBookList);
export { CategoryBookList };
//# sourceMappingURL=categoryBookList.js.map