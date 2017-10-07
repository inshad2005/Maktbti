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
import { TranslateService } from '@ngx-translate/core';
import { AudioBook } from "../../providers/audio-book";
import { Observable } from 'rxjs/Rx';
import { NativeAudio } from '@ionic-native/native-audio';
import { AppProvider } from "../../providers/app";
import { MusicControls } from '@ionic-native/music-controls';
import { Events } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
var DeeplinkLibraryPage = (function () {
    function DeeplinkLibraryPage(navCtrl, navParams, audiobbok, loadingCtrl, alertCtrl, nativeAudio, translateService, appProvider, musicControls, events, socialSharing) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.audiobbok = audiobbok;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.nativeAudio = nativeAudio;
        this.translateService = translateService;
        this.appProvider = appProvider;
        this.musicControls = musicControls;
        this.events = events;
        this.socialSharing = socialSharing;
        this.language = 'eng';
        this.aa = 0;
        this.fullDuration = 0;
        this.showdiv = 'true';
        this.playButton1 = 'true';
        this.book_id = this.navParams.get('book_id');
        // alert(this.book_id);
    }
    DeeplinkLibraryPage.prototype.ionViewDidLoad = function () {
        this.segment = "listen";
        console.log('ionViewDidLoad DeeplinkLibraryPage');
    };
    DeeplinkLibraryPage.prototype.ngOnInit = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: this.translateService.instant('loading')
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return Observable.forkJoin(_this.audiobbok.getdeeplinkBook(_this.book_id)); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.bookdata = data[0].Books;
                _this.bookdata = _this.bookdata[0];
                // alert(JSON.stringify(this.bookdata))
                _this.review = _this.bookdata.customer_reviews;
                // this.Category=data[1]; 
                _this.file = new Audio();
                _this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + _this.bookdata.audio_sample;
                _this.file.load();
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
        this.playButton = 'true';
    };
    DeeplinkLibraryPage.prototype.onSubscribed = function () {
    };
    DeeplinkLibraryPage.prototype.onAddLibrary = function () {
        var _this = this;
        if (localStorage['user_id']) {
            var bookdata_1 = {
                "book_id": this.book_id,
                "user_id": localStorage['user_id']
            };
            var loading_1 = this.loadingCtrl.create({
                content: this.translateService.instant('loading')
            });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return Observable.forkJoin(_this.audiobbok.addToMyLibrary(bookdata_1)); })
                .subscribe(function (data) {
                return loading_1.dismiss().then(function () {
                    _this.bookStatus = data[0];
                    if (_this.bookStatus.message == "You have been subscribed.") {
                        _this.alertCtrl.create({
                            title: _this.translateService.instant('listen-library.alertSuccess'),
                            subTitle: _this.translateService.instant('listen-library.alertmessage'),
                            buttons: [{
                                    text: _this.translateService.instant('message.ok'),
                                    handler: function () {
                                        _this.addLibraryButton = 'disable';
                                    }
                                }]
                        }).present();
                    }
                    if (_this.bookStatus.message == "Your have already subscribed.") {
                        _this.alertCtrl.create({
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
                return loading_1.dismiss().then(function () { });
            });
            // code...
        }
        else if (!localStorage['user_id']) {
            this.alertCtrl.create({
                title: this.translateService.instant('listen-library.alertUnsuccess'),
                subTitle: this.translateService.instant('listen-library.alertLogin'),
                buttons: [{
                        text: this.translateService.instant('message.ok'),
                        handler: function () {
                            // this.navCtrl.setRoot(Category)
                        }
                    }]
            }).present();
        }
    };
    DeeplinkLibraryPage.prototype.onCreateMediaInsatnce = function () {
        var _this = this;
        this.musicControls.create({
            track: this.track,
            artist: this.artist,
            cover: this.cover,
            // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
            //           or a remote url ('http://...', 'https://...', 'ftp://...')
            isPlaying: true,
            dismissable: true,
            // hide previous/next/close buttons:
            hasPrev: true,
            hasNext: true,
            hasClose: true,
            // iOS only, optional
            album: 'Absolution',
            duration: 60,
            elapsed: 10,
            // Android only, optional
            // text displayed in the status bar when the notification (and the ticker) are updated
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
                    // this.playButton='true';
                    // alert('pause'+this.playButton);
                    // this.events.publish('playbutton','true');
                    _this.onPause();
                    break;
                case 'music-controls-play':
                    // this.playButton='false';
                    // alert('play'+this.playButton);
                    _this.onPlay();
                    break;
                case 'music-controls-destroy':
                    _this.onStop();
                    break;
                // Headset events (Android only)
                case 'music-controls-media-button':
                    // Do something
                    break;
                case 'music-controls-headset-unplugged':
                    // Do something
                    break;
                case 'music-controls-headset-plugged':
                    // Do something
                    break;
                default:
                    break;
            }
        });
        this.musicControls.listen();
        if (this.playButton1 == 'true') {
            this.onPlay();
        }
        else if (this.playButton1 == 'false') {
            this.onPlayMusic();
        }
    };
    DeeplinkLibraryPage.prototype.onGetDuration = function () {
        var _this = this;
        // alert(a);
        // this.file.currentTime=parseInt(a);
        setInterval(function () {
            _this.fullDuration = _this.file.duration;
            _this.aa = _this.file.currentTime;
            if (_this.aa == _this.fullDuration) {
                _this.playButton = 'true';
                _this.file = new Audio();
                _this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + _this.bookdata.audio_sample;
            }
        }, 1000);
        // alert(this.aa)
    };
    DeeplinkLibraryPage.prototype.onPositionChange = function (a) {
        var c = this.file.currentTime - a;
        var d = Math.abs(c);
        if (d > 5) {
            this.file.currentTime = parseInt(a);
        }
    };
    DeeplinkLibraryPage.prototype.onPause = function () {
        // this.events.subscribe('playbutton', data => {
        //   // alert(data);
        //   this.playButton=data
        // });
        clearInterval(this.secondInterval);
        this.playButton = 'true';
        this.file.pause();
        this.musicControls.updateIsPlaying(false);
        // alert(this.playButton)
    };
    DeeplinkLibraryPage.prototype.onForword = function () {
        var c = this.file.currentTime + 5;
        this.file.currentTime = c;
    };
    DeeplinkLibraryPage.prototype.onPrevious = function () {
        var c = this.file.currentTime - 5;
        this.file.currentTime = c;
    };
    DeeplinkLibraryPage.prototype.onPlay = function () {
        this.playButton = 'false';
        this.playButton1 = 'false';
        this.file.play();
        this.musicControls.updateIsPlaying(true);
        this.onGetDuration();
        this.playTime();
    };
    DeeplinkLibraryPage.prototype.onPlayMusic = function () {
        this.playButton = 'false';
        this.file.play();
        this.musicControls.updateIsPlaying(true);
        this.onGetDuration();
        this.playTime();
    };
    DeeplinkLibraryPage.prototype.playTime = function () {
        var _this = this;
        this.sec = parseInt(localStorage['totalListeningTime']);
        if (this.sec > 0) {
            this.sec = this.sec + 1;
            localStorage['totalListeningTime'] = this.sec;
            this.totalListeningTime = localStorage['totalListeningTime'];
        }
        else {
            this.sec = 0 + 1;
            localStorage['totalListeningTime'] = this.sec;
            this.totalListeningTime = localStorage['totalListeningTime'];
        }
        this.secondInterval = setTimeout(function () {
            _this.playTime();
        }, 1000);
    };
    DeeplinkLibraryPage.prototype.onStop = function () {
        // alert('gt');
        // this.file.stop();
        clearInterval(this.secondInterval);
        this.playButton = 'true';
        this.file.pause();
        this.file.currentTime = 0.0;
        this.file = new Audio();
        this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + this.bookdata.audio_sample;
        this.file.load();
        this.musicControls.destroy();
    };
    DeeplinkLibraryPage.prototype.ionViewDidLeave = function () {
        this.playButton = 'true';
        if (this.file) {
            // code...
            this.file.pause();
            this.file.currentTime = 0.0;
        }
        this.file = new Audio();
        this.musicControls.destroy();
    };
    DeeplinkLibraryPage.prototype.onShareWithTwitter = function () {
        var message = this.translateService.instant('listen-library.socialSharingMessage');
        this.socialSharing.shareViaTwitter(message, null, 'http://maktbti.com/about-us/' + this.book_id).then(function () {
            // Success!
        }).catch(function () {
            // Error!
        });
    };
    DeeplinkLibraryPage.prototype.onShareWithFacebook = function () {
        var message = this.translateService.instant('listen-library.socialSharingMessage');
        this.socialSharing.shareViaFacebook(message, null, 'http://maktbti.com/about-us/' + this.book_id).then(function () {
            // Success!
        }).catch(function () {
            // Error!
        });
    };
    DeeplinkLibraryPage.prototype.onShareViaAll = function () {
        var message = this.translateService.instant('listen-library.socialSharingMessage');
        // alert(message)
        this.socialSharing.share(message, null, null, 'http://maktbti.com/about-us/' + this.book_id).then(function () {
            // alert("success")
        }).catch(function () {
            // Error!
        });
    };
    return DeeplinkLibraryPage;
}());
DeeplinkLibraryPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-deeplink-library-page',
        templateUrl: 'deeplink-library-page.html',
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
        MusicControls,
        Events,
        SocialSharing])
], DeeplinkLibraryPage);
export { DeeplinkLibraryPage };
//# sourceMappingURL=deeplink-library-page.js.map