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
import { TranslateService } from '@ngx-translate/core';
import { UserData } from "../../providers/user-data";
import { ListenLibrary } from '../listen-library/listen-library';
import { AppProvider } from "../../providers/app";
/**
 * Generated class for the AllBooks page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Recommanded = (function () {
    function Recommanded(navCtrl, navParams, userDataProvider, loadingCtrl, translateService, appProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userDataProvider = userDataProvider;
        this.loadingCtrl = loadingCtrl;
        this.translateService = translateService;
        this.appProvider = appProvider;
        this.searchbar = 'false';
    }
    Recommanded.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ionViewDidLoad AllBooks');
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return Observable.forkJoin(_this.userDataProvider.listOfRecommandation()); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.recommendedData = data[0];
                _this.booklist = _this.recommendedData.books;
                _this.bookData = _this.booklist;
                // this.booklist=this.booklist[0]
                // console.log(this.booklist[0])
                // console.log(JSON.stringify(this.booklist[0]))
                // this.Category=data[1]; 
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    Recommanded.prototype.onBook = function (bookdata) {
        var _this = this;
        this.searchbar = 'false';
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading'), duration: 500, });
        Observable.of(loading).delay(200).flatMap(function (loading) { return loading.present(); }).subscribe(function (data) { return loading.dismiss().then(function () {
            _this.navCtrl.push(ListenLibrary, { bookdata: bookdata });
        }); });
    };
    Recommanded.prototype.onSearch = function () {
        var _this = this;
        this.searchbar = 'true';
        if (this.myInput == '') {
            this.booklist = this.bookData;
            return;
        }
        var ev = this.myInput;
        if (ev && ev.trim() != '') {
            this.booklist = this.bookData.filter(function (value) {
                if (_this.appProvider.current.currentLanguage == 'en') {
                    return (value.book_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name.toUpperCase().indexOf(ev.toUpperCase()) > -1);
                }
                else if (_this.appProvider.current.currentLanguage == 'arb') {
                    return (value.book_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1);
                }
                // alert(JSON.stringify(value))
            });
        }
        else {
            this.booklist = this.bookData;
        }
        console.log(this.bookData);
    };
    Recommanded.prototype.onContent = function () {
        this.searchbar = 'false';
    };
    return Recommanded;
}());
Recommanded = __decorate([
    IonicPage(),
    Component({
        selector: 'page-recommanded',
        templateUrl: 'recommanded.html',
        providers: [UserData]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        UserData,
        LoadingController,
        TranslateService,
        AppProvider])
], Recommanded);
export { Recommanded };
//# sourceMappingURL=recommanded.js.map