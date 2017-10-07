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
import { AudioBook } from "../../providers/audio-book";
import { Observable } from 'rxjs/Rx';
import { NativeAudio } from '@ionic-native/native-audio';
import { AppProvider } from "../../providers/app";
import { ReviewPage } from '../review/review';
import { MusicControls } from '@ionic-native/music-controls';
import { Events } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
var SimilarBooks = SimilarBooks_1 = (function () {
    function SimilarBooks(navCtrl, navParams, audiobbok, loadingCtrl, alert, nativeAudio, translateService, appProvider, modalCtrl, musicControls, events, socialSharing) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.audiobbok = audiobbok;
        this.loadingCtrl = loadingCtrl;
        this.alert = alert;
        this.nativeAudio = nativeAudio;
        this.translateService = translateService;
        this.appProvider = appProvider;
        this.modalCtrl = modalCtrl;
        this.musicControls = musicControls;
        this.events = events;
        this.socialSharing = socialSharing;
        this.language = 'eng';
        this.aa = 0;
        this.fullDuration = 0;
        this.showdiv = 'true';
        this.segment = "listen";
        console.log(JSON.stringify(this.bookdata));
    }
    SimilarBooks.prototype.ngOnInit = function () {
        var _this = this;
        this.bookdata = this.navParams.get('bookdata');
        if (this.appProvider.current.currentLanguage == 'en') {
            this.track = this.bookdata.book_name;
            this.artist = this.bookdata.author.author_name;
            this.cover = 'http://europa.promaticstechnologies.com/audioLibrary/webroot/images/books/' + this.bookdata.image;
        }
        if (this.appProvider.current.currentLanguage == 'arb') {
            this.track = this.bookdata.book_name_arabic;
            this.artist = this.bookdata.author.author_arabic;
            this.cover = 'http://europa.promaticstechnologies.com/audioLibrary/webroot/images/books/' + this.bookdata.image;
        }
        console.log(JSON.stringify(this.bookdata));
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return Observable.forkJoin(_this.audiobbok.getSimilarBook(_this.bookdata), _this.audiobbok.getRating(_this.bookdata.id)); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.similarbook = data[0];
                _this.similarbook = _this.similarbook.filter(function (f) { return f.id != _this.bookdata.id; });
                _this.review = data[1];
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
        this.playButton = 'true';
    };
    SimilarBooks.prototype.onSubscribed = function () {
    };
    SimilarBooks.prototype.onAddLibrary = function () {
        var _this = this;
        var bookdata = {
            "book_id": this.bookdata.id,
            "user_id": localStorage['user_id']
        };
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return Observable.forkJoin(_this.audiobbok.addToMyLibrary(bookdata)); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.bookStatus = data[0];
                if (_this.bookStatus.message == "Your have been subscribed.") {
                    _this.alert.create({
                        title: _this.translateService.instant('listen-library.alertSuccess'),
                        subTitle: _this.translateService.instant('listen-library.alertmessage'),
                        buttons: [{
                                text: _this.translateService.instant('message.ok'),
                                handler: function () {
                                }
                            }]
                    }).present();
                }
                if (_this.bookStatus.message == "Your have already subscribed.") {
                    _this.alert.create({
                        title: _this.translateService.instant('listen-library.alertUnsuccess'),
                        subTitle: _this.translateService.instant('alertUnsuccessMessage'),
                        buttons: [{
                                text: _this.translateService.instant('message.ok'),
                                handler: function () {
                                }
                            }]
                    }).present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    SimilarBooks.prototype.onCreateMediaInsatnce = function () {
        var _this = this;
        this.musicControls.create({
            track: this.track,
            artist: this.artist,
            cover: this.cover,
            isPlaying: true,
            dismissable: true,
            hasPrev: true,
            hasNext: true,
            hasClose: true,
            album: 'Absolution',
            duration: 60,
            elapsed: 10,
            ticker: this.track
        });
        this.musicControls.subscribe().subscribe(function (action) {
            // alert(JSON.stringify(action))
            switch (action) {
                case 'music-controls-next':
                    _this.onForword();
                    break;
                case 'music-controls-previous':
                    _this.onPrevious();
                    break;
                case 'music-controls-pause':
                    _this.onPause();
                    break;
                case 'music-controls-play':
                    _this.onPlay();
                    break;
                case 'music-controls-destroy':
                    _this.onStop();
                    break;
                case 'music-controls-media-button':
                    break;
                case 'music-controls-headset-unplugged':
                    break;
                case 'music-controls-headset-plugged':
                    break;
                default:
                    break;
            }
        });
        this.musicControls.listen();
        this.onPlay();
    };
    SimilarBooks.prototype.onGetDuration = function () {
        var _this = this;
        setInterval(function () {
            _this.fullDuration = _this.file.duration;
            _this.aa = _this.file.currentTime;
            if (_this.aa == _this.fullDuration) {
                _this.playButton = 'true';
                _this.file = new Audio();
                _this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + _this.bookdata.audio_sample;
            }
        }, 1000);
    };
    SimilarBooks.prototype.onPositionChange = function (a) {
        var c = this.file.currentTime - a;
        var d = Math.abs(c);
        if (d > 5) {
            this.file.currentTime = parseInt(a);
        }
    };
    SimilarBooks.prototype.onPause = function () {
        this.playButton = 'true';
        this.file.pause();
        this.musicControls.updateIsPlaying(false);
    };
    SimilarBooks.prototype.onForword = function () {
        var c = this.file.currentTime + 5;
        this.file.currentTime = c;
    };
    SimilarBooks.prototype.onPrevious = function () {
        var c = this.file.currentTime - 5;
        this.file.currentTime = c;
    };
    SimilarBooks.prototype.onPlay = function () {
        this.playButton = 'false';
        this.file = new Audio();
        this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + this.bookdata.audio_sample;
        this.file.load();
        this.file.play();
        this.musicControls.updateIsPlaying(true);
        this.onGetDuration();
    };
    SimilarBooks.prototype.onStop = function () {
        this.playButton = 'true';
        this.file.pause();
        this.file.currentTime = 0.0;
        this.file = new Audio();
        this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + this.bookdata.audio_sample;
        this.file.load();
        this.musicControls.destroy();
    };
    SimilarBooks.prototype.onReview = function () {
        var _this = this;
        var modal = this.modalCtrl.create(ReviewPage, { bookId: this.bookdata.id });
        modal.present();
        modal.onDidDismiss(function (data) {
            _this.userReview = data.data;
        });
    };
    SimilarBooks.prototype.ionViewDidLeave = function () {
        this.playButton = 'true';
        if (this.file) {
            this.file.pause();
            this.file.currentTime = 0.0;
        }
        this.file = new Audio();
        this.musicControls.destroy();
    };
    SimilarBooks.prototype.onShareWithTwitter = function () {
        var message = this.translateService.instant('listen-library.socialSharingMessage');
        this.socialSharing.shareViaTwitter(message, null, 'http://maktbti.com/about-us/' + this.bookdata.id).then(function () {
        }).catch(function () {
        });
    };
    SimilarBooks.prototype.onShareWithFacebook = function () {
        var message = this.translateService.instant('listen-library.socialSharingMessage');
        var url = 'http://maktbti.com/about-us/' + this.bookdata.id;
        this.socialSharing.shareViaFacebook(message, null, url).then(function () {
        }).catch(function () {
        });
    };
    SimilarBooks.prototype.onShareViaAll = function () {
        var message = this.translateService.instant('listen-library.socialSharingMessage');
        this.socialSharing.share(message, null, null, 'http://maktbti.com/about-us/' + this.bookdata.id).then(function () {
        }).catch(function () {
        });
    };
    SimilarBooks.prototype.onSimilar = function (a) {
        this.navCtrl.push(SimilarBooks_1, { bookdata: a });
    };
    return SimilarBooks;
}());
SimilarBooks = SimilarBooks_1 = __decorate([
    IonicPage(),
    Component({
        selector: 'page-similar-books',
        templateUrl: 'similar-books.html',
        providers: [AudioBook, SocialSharing]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AudioBook,
        LoadingController,
        AlertController,
        NativeAudio,
        TranslateService,
        AppProvider,
        ModalController,
        MusicControls,
        Events,
        SocialSharing])
], SimilarBooks);
export { SimilarBooks };
var SimilarBooks_1;
//# sourceMappingURL=similar-books.js.map