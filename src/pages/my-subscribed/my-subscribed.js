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
import { AudioBook } from "../../providers/audio-book";
import { AppProvider } from "../../providers/app";
/**
 * Generated class for the MyLibrary page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MySubscribed = (function () {
    function MySubscribed(navCtrl, navParams, userDataProvider, audiobbok, loadingCtrl, alertCtrl, translateService, appProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userDataProvider = userDataProvider;
        this.audiobbok = audiobbok;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.translateService = translateService;
        this.appProvider = appProvider;
        this.language = 'eng';
        this.searchbar = 'false';
    }
    MySubscribed.prototype.ngOnInit = function () {
        var _this = this;
        console.log('ionViewDidLoad MyLibrary');
        var loading = this.loadingCtrl.create({
            content: this.translateService.instant('loading')
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return Observable.forkJoin(_this.audiobbok.catOfBookGet()); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.booklist = data[0].mysubs;
                _this.bookData = data[0].mysubs;
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
    MySubscribed.prototype.onBookClick = function (bookdata) {
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
    MySubscribed.prototype.onRemove = function (bookdata) {
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
                            .flatMap(function (data) { return Observable.forkJoin(_this.userDataProvider.onDeleteMySubscribedBook(bookdata)); })
                            .subscribe(function (data) {
                            return loading.dismiss().then(function () {
                                _this.booklist = _this.booklist.filter(function (f) { return f.id !== bookdata.id; });
                                _this.bookData = _this.bookData.filter(function (f) { return f.id !== bookdata.id; });
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
    MySubscribed.prototype.onPlay = function (a, b) {
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
    MySubscribed.prototype.onPause = function (i) {
        // alert(i);
        this.iconIndex = i;
        this.playbuttonIndex = "true";
        this.file.pause();
    };
    MySubscribed.prototype.onSearch = function () {
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
    MySubscribed.prototype.onContent = function () {
        this.searchbar = 'false';
    };
    MySubscribed.prototype.ionViewDidLeave = function () {
        this.playButton = 'true';
        if (this.file) {
            this.file.pause();
            this.file.currentTime = 0.0;
        }
        this.file = new Audio();
    };
    return MySubscribed;
}());
MySubscribed = __decorate([
    IonicPage(),
    Component({
        selector: 'page-my-subscribed',
        templateUrl: 'my-subscribed.html',
        providers: [UserData, AudioBook]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        UserData,
        AudioBook,
        LoadingController,
        AlertController,
        TranslateService,
        AppProvider])
], MySubscribed);
export { MySubscribed };
//# sourceMappingURL=my-subscribed.js.map