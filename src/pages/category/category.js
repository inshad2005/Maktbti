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
import { CategoryBookList } from "../categoryBookList/categoryBookList";
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from "../../providers/app";
/**
 * Generated class for the Category page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var Category = (function () {
    function Category(navCtrl, navParams, loadingCtrl, audiobbok, translateService, appProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.audiobbok = audiobbok;
        this.translateService = translateService;
        this.appProvider = appProvider;
        this.searchbar = 'false';
        this.segment = "featured";
        this.searchIcon = 'true';
    }
    Category.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Category');
    };
    Category.prototype.ngOnInit = function () {
        var _this = this;
        this.language = 'arb';
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return Observable.forkJoin(_this.audiobbok.catOfBookGet(), _this.audiobbok.categoryGet()); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.allBooklist = data[0];
                _this.bookData = data[0];
                console.log(JSON.stringify(_this.bookData));
                _this.bookDatasale = _this.bookData['sale'];
                _this.bookDatafree = _this.bookData['free'];
                _this.bookDatarecent = _this.bookData['recent'];
                // alert(JSON.stringify(this.bookData));
                // this.booklist=this.booklist[0]
                // console.log(this.booklist[0])
                // console.log(JSON.stringify(this.booklist[0]))
                _this.Category = data[1];
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    Category.prototype.onBook = function (bookdata) {
        var _this = this;
        this.searchbar = 'false';
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading'), duration: 500, });
        Observable.of(loading).delay(200).flatMap(function (loading) { return loading.present(); }).subscribe(function (data) { return loading.dismiss().then(function () {
            _this.navCtrl.push(ListenLibrary, { bookdata: bookdata });
        }); });
    };
    Category.prototype.onViewMore = function (data, titleEng, titleArb) {
        this.navCtrl.push(ViewMore, { bookdata: data, titleEng: titleEng, titleArb: titleArb });
    };
    Category.prototype.onCategory = function (data) {
        console.log(JSON.stringify(data));
        this.navCtrl.push(CategoryBookList, { categoryWiseBook: data });
    };
    Category.prototype.onSearch = function () {
        if (this.appProvider.current.currentLanguage == 'en') {
            this.searchbar = 'true';
            if (this.myInput == '') {
                this.allBooklist['sale'] = this.bookDatasale;
                this.allBooklist['recent'] = this.bookDatarecent;
                this.allBooklist['free'] = this.bookDatafree;
                console.log('data' + JSON.stringify(this.bookData));
                console.log('iffff' + JSON.stringify(this.allBooklist));
                return;
            }
            var ev_1 = this.myInput;
            if (ev_1 && ev_1.trim() != '') {
                if (this.bookDatasale.length > 0) {
                    this.allBooklist['sale'] = this.bookDatasale.filter(function (value) {
                        console.log('serch ' + JSON.stringify(value));
                        return (value.book_name.toUpperCase().indexOf(ev_1.toUpperCase()) > -1 || value.author.author_name.toUpperCase().indexOf(ev_1.toUpperCase()) > -1);
                    });
                }
                if (this.bookDatarecent.length > 0) {
                    this.allBooklist['recent'] = this.bookDatarecent.filter(function (value) {
                        console.log('serch ' + JSON.stringify(value));
                        return (value.book_name.toUpperCase().indexOf(ev_1.toUpperCase()) > -1 || value.author.author_name.toUpperCase().indexOf(ev_1.toUpperCase()) > -1);
                    });
                }
                if (this.bookDatafree.length > 0) {
                    this.allBooklist['free'] = this.bookDatafree.filter(function (value) {
                        console.log('serch ' + JSON.stringify(value));
                        return (value.book_name.toUpperCase().indexOf(ev_1.toUpperCase()) > -1 || value.author.author_name.toUpperCase().indexOf(ev_1.toUpperCase()) > -1);
                    });
                }
            }
            else {
                this.allBooklist = this.allBooklist;
                console.log('else' + this.allBooklist);
            }
        }
        else if (this.appProvider.current.currentLanguage == 'arb') {
            this.searchbar = 'true';
            if (this.myInput == '') {
                this.allBooklist['sale'] = this.bookDatasale;
                this.allBooklist['recent'] = this.bookDatarecent;
                this.allBooklist['free'] = this.bookDatafree;
                console.log('data' + JSON.stringify(this.bookData));
                console.log('iffff' + JSON.stringify(this.allBooklist));
                return;
            }
            var ev_2 = this.myInput;
            if (ev_2 && ev_2.trim() != '') {
                if (this.bookDatasale.length > 0) {
                    this.allBooklist['sale'] = this.bookDatasale.filter(function (value) {
                        console.log('serch ' + JSON.stringify(value));
                        return (value.book_name_arabic.toUpperCase().indexOf(ev_2.toUpperCase()) > -1 || value.author.author_name_arabic.toUpperCase().indexOf(ev_2.toUpperCase()) > -1);
                    });
                }
                if (this.bookDatarecent.length > 0) {
                    this.allBooklist['recent'] = this.bookDatarecent.filter(function (value) {
                        console.log('serch ' + JSON.stringify(value));
                        return (value.book_name_arabic.toUpperCase().indexOf(ev_2.toUpperCase()) > -1 || value.author.author_name_arabic.toUpperCase().indexOf(ev_2.toUpperCase()) > -1);
                    });
                }
                if (this.bookDatafree.length > 0) {
                    this.allBooklist['free'] = this.bookDatafree.filter(function (value) {
                        console.log('serch ' + JSON.stringify(value));
                        return (value.book_name_arabic.toUpperCase().indexOf(ev_2.toUpperCase()) > -1 || value.author.author_name_arabic.toUpperCase().indexOf(ev_2.toUpperCase()) > -1);
                    });
                }
            }
            else {
                this.allBooklist = this.allBooklist;
                console.log('else' + this.allBooklist);
            }
        }
    };
    Category.prototype.onContent = function () {
        this.searchbar = 'false';
    };
    Category.prototype.hideSearchIcon = function () {
        this.searchIcon = 'false';
    };
    Category.prototype.showSearchIcon = function () {
        this.searchIcon = 'true';
    };
    return Category;
}());
Category = __decorate([
    IonicPage(),
    Component({
        selector: 'page-category',
        templateUrl: 'category.html',
        providers: [AudioBook]
    }),
    __metadata("design:paramtypes", [NavController, NavParams,
        LoadingController,
        AudioBook,
        TranslateService,
        AppProvider])
], Category);
export { Category };
//# sourceMappingURL=category.js.map