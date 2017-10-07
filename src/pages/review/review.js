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
import { NavController, ViewController, LoadingController, NavParams } from 'ionic-angular';
import { AudioBook } from '../../providers/audio-book';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app';
var ReviewPage = (function () {
    function ReviewPage(navCtrl, viewCtrl, audioBook, loadingCtrl, translateService, navParams, appProvider) {
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.audioBook = audioBook;
        this.loadingCtrl = loadingCtrl;
        this.translateService = translateService;
        this.navParams = navParams;
        this.appProvider = appProvider;
        this.count = 0;
        this.review = {};
        this.bookId = this.navParams.get('bookId');
    }
    ReviewPage.prototype.oncancel = function () {
        this.viewCtrl.dismiss();
    };
    ReviewPage.prototype.onStarClick = function (a) {
        if (a == 1) {
            var starFirst = document.getElementById('starFirst');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starSecond');
            starFirst.style.color = '#fff';
            var starFirst = document.getElementById('starThird');
            starFirst.style.color = '#fff';
            var starFirst = document.getElementById('starFourth');
            starFirst.style.color = '#fff';
            var starFirst = document.getElementById('starFifth');
            starFirst.style.color = '#fff';
            this.count = 1;
        }
        else if (a == 2) {
            var starFirst = document.getElementById('starFirst');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starSecond');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starThird');
            starFirst.style.color = '#fff';
            var starFirst = document.getElementById('starFourth');
            starFirst.style.color = '#fff';
            var starFirst = document.getElementById('starFifth');
            starFirst.style.color = '#fff';
            this.count = 2;
        }
        else if (a == 3) {
            var starFirst = document.getElementById('starFirst');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starSecond');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starThird');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starFourth');
            starFirst.style.color = '#fff';
            var starFirst = document.getElementById('starFifth');
            starFirst.style.color = '#fff';
            this.count = 3;
        }
        else if (a == 4) {
            var starFirst = document.getElementById('starFirst');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starSecond');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starThird');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starFourth');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starFifth');
            starFirst.style.color = '#fff';
            this.count = 4;
        }
        else if (a == 5) {
            var starFirst = document.getElementById('starFirst');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starSecond');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starThird');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starFourth');
            starFirst.style.color = '#2ABFDB';
            var starFirst = document.getElementById('starFifth');
            starFirst.style.color = '#2ABFDB';
            this.count = 5;
        }
    };
    ReviewPage.prototype.onSubmitReview = function () {
        var _this = this;
        this.review.customer_id = localStorage['user_id'];
        this.review.book_id = this.bookId;
        this.review.rating = this.count;
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return Observable.forkJoin(_this.audioBook.postReview(_this.review)); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                if (data[0].response == "true") {
                    _this.review = data[0].data;
                    _this.viewCtrl.dismiss({ data: _this.review });
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
                alert(error);
            });
        });
        //this.viewCtrl.dismiss({data:'hy'});
    };
    return ReviewPage;
}());
ReviewPage = __decorate([
    Component({
        selector: 'page-review',
        templateUrl: 'review.html',
        providers: [AudioBook]
    }),
    __metadata("design:paramtypes", [NavController,
        ViewController,
        AudioBook,
        LoadingController,
        TranslateService,
        NavParams,
        AppProvider])
], ReviewPage);
export { ReviewPage };
//# sourceMappingURL=review.js.map