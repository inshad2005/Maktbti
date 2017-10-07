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
import { SimilarBooks } from '../similar-books/similar-books';
import { PaymentProvider } from '../../providers/payment-provider';
var ListenLibrary = (function () {
    // similarbookData:any;
    function ListenLibrary(navCtrl, navParams, audiobbok, loadingCtrl, alert, nativeAudio, translateService, appProvider, modalCtrl, musicControls, events, socialSharing, paymentProvider) {
        var _this = this;
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
        this.paymentProvider = paymentProvider;
        this.language = 'eng';
        this.aa = 0;
        this.fullDuration = 0;
        this.showdiv = 'true';
        this.playButton1 = 'true';
        this.amount = 200;
        StartCheckout.config({
            key: "test_open_k_0bbf6eeeaa38883b515b",
            complete: function (params) {
                //  alert(JSON.stringify(StartCheckout))
                // alert(JSON.stringify(params));
                _this.payment(params);
            }
        });
        // alert(JSON.stringify(StartCheckout))
        this.segment = "listen";
        console.log(JSON.stringify(this.bookdata));
    }
    ListenLibrary.prototype.ngOnInit = function () {
        var _this = this;
        this.bookdata = this.navParams.get('bookdata');
        if (this.appProvider.current.currentLanguage == 'en') {
            this.track = this.bookdata.book_name;
            this.artist = this.bookdata.author.author_name;
            this.cover = 'http://europa.promaticstechnologies.com/audioLibrary/webroot/images/books/' + this.bookdata.image;
            this.avg_rating = this.bookdata.average_rating;
            // alert(this.avg_rating);
        }
        if (this.appProvider.current.currentLanguage == 'arb') {
            this.track = this.bookdata.book_name_arabic;
            this.artist = this.bookdata.author.author_arabic;
            this.cover = 'http://europa.promaticstechnologies.com/audioLibrary/webroot/images/books/' + this.bookdata.image;
        }
        console.log(JSON.stringify(this.bookdata));
        var loading = this.loadingCtrl.create({
            content: this.translateService.instant('loading')
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return Observable.forkJoin(_this.audiobbok.getSimilarBook(_this.bookdata), _this.audiobbok.getRating(_this.bookdata.id)); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.similarbook = data[0];
                _this.similarbook = _this.similarbook.filter(function (f) { return f.id != _this.bookdata.id; });
                _this.review = data[1];
                _this.users = _this.review.all;
                // alert(this.users);
                //this.similarbook=data[1];
                // this.booklist=this.booklist[0]
                // console.log(this.booklist[0])
                console.log(JSON.stringify(_this.review));
                // this.Category=data[1]; 
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
        this.playButton = 'true';
        this.file = new Audio();
        this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + this.bookdata.audio_sample;
        this.file.load();
    };
    // onSubscribed() {
    // }
    ListenLibrary.prototype.onAddLibrary = function () {
        var _this = this;
        var bookdata = {
            "book_id": this.bookdata.id,
            "user_id": localStorage['user_id']
        };
        //alert(JSON.stringify(bookdata))
        var loading = this.loadingCtrl.create({
            content: this.translateService.instant('loading')
        });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return Observable.forkJoin(_this.audiobbok.addToMyLibrary(bookdata)); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.bookStatus = data[0];
                if (_this.bookStatus.message == "Book added in your wishlist.") {
                    _this.alert.create({
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
                if (_this.bookStatus.message == "Your have already Wished it.") {
                    _this.alert.create({
                        title: _this.translateService.instant('listen-library.alertUnsuccess'),
                        subTitle: _this.translateService.instant('alertUnsuccessMessage'),
                        buttons: [{
                                text: _this.translateService.instant('message.ok'),
                                handler: function () {
                                    // this.navCtrl.setRoot(Category)
                                }
                            }]
                    }).present();
                }
                //this.similarbook=data[1];
                // this.booklist=this.booklist[0]
                // console.log(this.booklist[0])
                // console.log(JSON.stringify(this.booklist[0]))
                // this.Category=data[1]; 
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    ListenLibrary.prototype.onCreateMediaInsatnce = function () {
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
    ListenLibrary.prototype.onGetDuration = function () {
        var _this = this;
        // alert(a);
        // this.file.currentTime=parseInt(a);
        setInterval(function () {
            _this.fullDuration = _this.file.duration;
            _this.aa = _this.file.currentTime;
            if (_this.aa == _this.fullDuration) {
                _this.aa = 0.0;
                // alert('hi');
                _this.onStop();
            }
        }, 1000);
        // alert(this.aa)
    };
    ListenLibrary.prototype.onPositionChange = function (a) {
        var c = this.file.currentTime - a;
        var d = Math.abs(c);
        if (d > 5) {
            this.file.currentTime = parseInt(a);
        }
    };
    ListenLibrary.prototype.onPause = function () {
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
    ListenLibrary.prototype.onForword = function () {
        var c = this.file.currentTime + 5;
        this.file.currentTime = c;
    };
    ListenLibrary.prototype.onPrevious = function () {
        var c = this.file.currentTime - 5;
        this.file.currentTime = c;
    };
    ListenLibrary.prototype.onPlay = function () {
        this.playButton = 'false';
        this.playButton1 = 'false';
        this.file.play();
        this.musicControls.updateIsPlaying(true);
        this.onGetDuration();
        this.playTime();
        // setInterval(()=>
        // {
        //   this.sec=this.sec+1;
        //   alert(this.sec)
        //   if (this.sec==60) {
        //     this.sec=0;
        //     this.min=this.min+1;
        //     alert(this.min);
        //     if (this.min==60) {
        //      this.min=0;
        //      this.hour=this.hour+1;
        //     }
        //   }
        // },1000)
    };
    ListenLibrary.prototype.onPlayMusic = function () {
        this.playButton = 'false';
        this.file.play();
        this.musicControls.updateIsPlaying(true);
        this.onGetDuration();
        this.playTime();
    };
    ListenLibrary.prototype.playTime = function () {
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
    ListenLibrary.prototype.onStop = function () {
        // alert('gt');
        // this.file.stop();
        // alert('hi stop');
        this.file.pause();
        this.file.currentTime = 0.0;
        clearInterval(this.secondInterval);
        this.playButton = 'true';
        this.file = new Audio();
        this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + this.bookdata.audio_sample;
        this.file.load();
        this.musicControls.destroy();
    };
    ListenLibrary.prototype.onReview = function () {
        var _this = this;
        var modal = this.modalCtrl.create(ReviewPage, {
            bookId: this.bookdata.id
        });
        modal.present();
        modal.onDidDismiss(function (data) {
            if (data) {
                _this.userReview = data.data;
                _this.my = _this.review.data.filter(function (f) { return f.customer_id == localStorage['user_id']; });
                _this.review['data'] = _this.review.data.filter(function (f) { return f.customer_id != localStorage['user_id']; });
                if (_this.my) {
                    // code...
                    _this.user_name = _this.my[0].user.first_name + ' ' + _this.my[0].user.last_name;
                    _this.usersPreviousRating = _this.my[0].rating;
                    _this.bookdata.average_rating = ((((parseInt(_this.avg_rating) * parseInt(_this.users)) - parseInt(_this.usersPreviousRating)) + parseInt(_this.userReview.rating)) / parseInt(_this.users));
                }
                else {
                    _this.bookdata.average_rating = ((((parseInt(_this.avg_rating) * parseInt(_this.users))) + parseInt(_this.userReview.rating)) / (parseInt(_this.users)) + 1);
                }
                // code...
            }
            // alert(JSON.stringify(data))
        });
    };
    ListenLibrary.prototype.ionViewDidLeave = function () {
        this.playButton = 'true';
        if (this.file) {
            // code...
            this.file.pause();
            this.file.currentTime = 0.0;
        }
        this.file = new Audio();
        this.musicControls.destroy();
    };
    ListenLibrary.prototype.onShareWithTwitter = function () {
        var message = this.translateService.instant('listen-library.socialSharingMessage');
        this.socialSharing.shareViaTwitter(message, null, 'http://maktbti.com/about-us/' + this.bookdata.id).then(function () {
            // Success!
        }).catch(function () {
            // Error!
        });
    };
    ListenLibrary.prototype.onShareWithFacebook = function () {
        var message = this.translateService.instant('listen-library.socialSharingMessage');
        this.socialSharing.shareViaFacebook(message, null, 'http://maktbti.com/about-us/' + this.bookdata.id).then(function () {
            // Success!
        }).catch(function () {
            // Error!
        });
    };
    ListenLibrary.prototype.onShareViaAll = function () {
        var message = this.translateService.instant('listen-library.socialSharingMessage');
        // alert(message)
        this.socialSharing.share(message, null, null, 'http://maktbti.com/about-us/' + this.bookdata.id).then(function () {
            // alert("success")
        }).catch(function () {
            // Error!
        });
    };
    ListenLibrary.prototype.onSimilar = function (a) {
        this.navCtrl.push(SimilarBooks, {
            bookdata: a
        });
        // this.segment="listen";
        // this.showdiv='false';
        // this.similarbookData=a;
    };
    ListenLibrary.prototype.onSubscribed = function (a, b) {
        var d1 = new Date();
        var d2 = new Date(b);
        var price;
        if (d1.getTime() < d2.getTime()) {
            this.amount = a - ((a * 20) / 100);
        }
        else {
            this.amount = a;
        }
        StartCheckout.open({
            amount: this.amount * 100,
            // = AED 100.00
            currency: "SAR"
        });
    };
    ListenLibrary.prototype.payment = function (params) {
        var _this = this;
        this.paymentDataSend = params;
        this.paymentDataSend.amount_paid = this.amount;
        this.paymentDataSend.user_id = localStorage['user_id'];
        this.paymentDataSend.name = localStorage['first_name'] + ' ' + localStorage['last_name'];
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.paymentProvider.oneTimePayment(_this.paymentDataSend); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                if (data.response == 'true') {
                    var alert_1 = _this.alert.create({
                        title: _this.translateService.instant('message.payment'),
                        subTitle: _this.translateService.instant('message.ok'),
                        buttons: [
                            {
                                text: _this.translateService.instant('message.ok'),
                                role: 'cancel',
                                handler: function () {
                                    console.log('Cancel clicked');
                                }
                            }
                        ]
                    });
                    alert_1.present();
                }
                else {
                    var alert_2 = _this.alert.create({
                        title: _this.translateService.instant('message.payment'),
                        subTitle: _this.translateService.instant('message.messagepaymentfailed'),
                        buttons: [
                            {
                                text: _this.translateService.instant('message.ok'),
                                role: 'cancel',
                                handler: function () {
                                    console.log('Cancel clicked');
                                }
                            }
                        ]
                    });
                    alert_2.present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () {
            });
        });
    };
    return ListenLibrary;
}());
ListenLibrary = __decorate([
    IonicPage(),
    Component({
        selector: 'page-listen-library',
        templateUrl: 'listen-library.html',
        providers: [AudioBook, SocialSharing, PaymentProvider]
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
        SocialSharing,
        PaymentProvider])
], ListenLibrary);
export { ListenLibrary };
//# sourceMappingURL=listen-library.js.map