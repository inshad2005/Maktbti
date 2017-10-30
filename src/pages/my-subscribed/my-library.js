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
import { ListenLibrary } from '../listen-library/listen-library';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { UserData } from "../../providers/user-data";
import { AppProvider } from "../../providers/app";
/**
 * Generated class for the MyLibrary page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MyLibrary = (function () {
    function MyLibrary(navCtrl, navParams, userDataProvider, loadingCtrl, alertCtrl, translateService, appProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userDataProvider = userDataProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.translateService = translateService;
        this.appProvider = appProvider;
        this.language = 'eng';
        this.searchbar = 'false';
    }
    MyLibrary.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ionViewDidLoad MyLibrary');
        var loading = this.loadingCtrl.create({
            content: this.translateService.instant('loading')
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return Observable.forkJoin(_this.userDataProvider.listOfMyLibraryBook()); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.booklist = data[0];
                _this.bookData = data[0];
                // alert(JSON.stringify (this.booklist))
                _this.playButton = 'true';
                // alert(JSON.stringify(this.booklist))
                // this.booklist=this.booklist[0]
                // console.log(this.booklist[0])
                // console.log(JSON.stringify(this.booklist[0]))
                // this.Category=data[1]; 
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    MyLibrary.prototype.onBookClick = function (bookdata) {
        var _this = this;
        this.searchbar = 'false';
        var loading = this.loadingCtrl.create({
            content: this.translateService.instant('loading'),
            duration: 500,
        });
        Observable.of(loading).delay(200).flatMap(function (loading) { return loading.present(); }).subscribe(function (data) { return loading.dismiss().then(function () {
            _this.navCtrl.push(ListenLibrary, {
                bookdata: bookdata
            });
        }); });
    };
    MyLibrary.prototype.onRemove = function (bookdata) {
        var _this = this;
        if (this.file) {
            // code...
            this.file.pause();
            this.file.currentTime = 0.0;
        }
        this.file = new Audio();
        this.playbuttonIndex = "true";
        var confirm = this.alertCtrl.create({
            title: this.translateService.instant('mylibrary.alerttitle'),
            message: this.translateService.instant('mylibrary.alertmessage'),
            buttons: [{
                    text: this.translateService.instant('mylibrary.alertdisagree'),
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: this.translateService.instant('mylibrary.alertagree'),
                    handler: function () {
                        console.log('Agree clicked');
                        var loading = _this.loadingCtrl.create({
                            content: _this.translateService.instant('loading')
                        });
                        Observable.fromPromise(loading.present())
                            .flatMap(function (data) { return Observable.forkJoin(_this.userDataProvider.deleteOfMyLibraryBook(bookdata)); })
                            .subscribe(function (data) {
                            return loading.dismiss().then(function () {
                                _this.booklist = _this.booklist.filter(function (f) { return f.id !== bookdata.id; });
                                //this.booklist=data[0];
                                // this.booklist=this.booklist[0]
                                // console.log(this.booklist[0])
                                // console.log(JSON.stringify(this.booklist[0]))
                                // this.Category=data[1];
                            });
                        }, function (error) {
                            return loading.dismiss().then(function () { });
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    MyLibrary.prototype.onPlay = function (a, b) {
        // alert(a);
        this.iconIndex = b;
        this.file = new Audio();
        this.file.src = "http://maktbti.com/audios/sample_audio/" + a;
        // alert(this.file.src)
        this.file.load();
        // this.playButton='false';
        this.playbuttonIndex = "false";
        this.file.play();
    };
    MyLibrary.prototype.onPause = function (i) {
        // alert(i);
        this.iconIndex = i;
        this.playbuttonIndex = "true";
        this.file.pause();
    };
    MyLibrary.prototype.onSearch = function () {
        this.searchbar = 'true';
        if (this.myInput == '') {
            this.booklist = this.bookData;
            return;
        }
        var ev = this.myInput;
        if (ev && ev.trim() != '') {
            this.booklist = this.bookData.filter(function (value) {
                // alert(JSON.stringify(value))
                return (value.book_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name.toUpperCase().indexOf(ev.toUpperCase()) > -1);
            });
        }
        else {
            this.booklist = this.bookData;
        }
        console.log(this.bookData);
    };
    MyLibrary.prototype.onContent = function () {
        this.searchbar = 'false';
    };
    MyLibrary.prototype.ionViewDidLeave = function () {
        this.playButton = 'true';
        if (this.file) {
            this.file.pause();
            this.file.currentTime = 0.0;
        }
        this.file = new Audio();
    };
    return MyLibrary;
}());
MyLibrary = __decorate([
    IonicPage(),
    Component({
        selector: 'page-my-library',
        templateUrl: 'my-library.html',
        providers: [UserData]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        UserData,
        LoadingController,
        AlertController,
        TranslateService,
        AppProvider])
], MyLibrary);
export { MyLibrary };
//# sourceMappingURL=my-library.js.map