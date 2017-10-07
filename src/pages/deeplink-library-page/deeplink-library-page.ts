import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AudioBook } from "../../providers/audio-book";
import { Observable } from 'rxjs/Rx';
import { NativeAudio } from '@ionic-native/native-audio';
import { AppProvider} from "../../providers/app";
import { MusicControls } from '@ionic-native/music-controls';
import { Events } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  selector: 'page-deeplink-library-page',
  templateUrl: 'deeplink-library-page.html',
  providers:[AudioBook,SocialSharing]
})
export class DeeplinkLibraryPage {
  bookdata;
  book_id;
  bookData;
  segment;
  bookStatus;
  similarbook
  language = 'eng';
  review;
  userReview;
  file: any;
  track: any;
  artist: any;
  cover: any;
  playButton: any;
  aa = 0;
  fullDuration = 0;
  showdiv = 'true';
  playButton1 = 'true';
  sec: number;
  secondInterval;
  totalListeningTime;
  addLibraryButton;
  user_name;
  my;
  avg_rating;
  usersPreviousRating;
  updated_avg_rating;
  users;
  reducedUser;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private audiobbok: AudioBook,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private nativeAudio: NativeAudio,
    private translateService: TranslateService,
    private appProvider: AppProvider,
    private musicControls: MusicControls,
    private events: Events,
    private socialSharing: SocialSharing) {
  	this.book_id=this.navParams.get('book_id');
  	 // alert(this.book_id);
  	 
  }

  ionViewDidLoad() {
  	this.segment = "listen";
    console.log('ionViewDidLoad DeeplinkLibraryPage');
  }
  ngOnInit(){
  	let loading = this.loadingCtrl.create({
      content: this.translateService.instant('loading'),
      spinner:'bubbles'
    });
    Observable.fromPromise(loading.present())
      // .flatMap(data => Observable.forkJoin(this.audiobbok.addToMyLibrary(bookdata),this.audiobbok.getSimilarBook()))
      .flatMap(data => Observable.forkJoin(this.audiobbok.getdeeplinkBook(this.book_id)))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.bookdata = data[0].Books;
          this.bookdata=this.bookdata[0];
         // alert(JSON.stringify(this.bookdata))
          this.review=this.bookdata.customer_reviews
          // this.Category=data[1]; 
	        this.file = new Audio();
	 	      this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + this.bookdata.audio_sample;
	        this.file.load();
        }),
        error =>
        loading.dismiss().then(() => {}))
       this.playButton = 'true';
  }
  onSubscribed() {

  }
  onAddLibrary() {
    if (localStorage['user_id']) {
      let bookdata = {
      "book_id": this.book_id,
      "user_id": localStorage['user_id']
    }
    let loading = this.loadingCtrl.create({
      content: this.translateService.instant('loading'),
      spinner:'bubbles'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => Observable.forkJoin(this.audiobbok.addToMyLibrary(bookdata)))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.bookStatus = data[0];
          if (this.bookStatus.message == "You have been subscribed.") {
            this.alertCtrl.create({
              title: this.translateService.instant('listen-library.alertSuccess'),
              subTitle: this.translateService.instant('listen-library.alertmessage'),
              buttons: [{
                text: this.translateService.instant('message.ok'),
                handler: () => {
                  this.addLibraryButton = 'disable';
                }
              }]
            }).present();
          }
          if (this.bookStatus.message == "Your have already subscribed.") {
            this.alertCtrl.create({
              title: this.translateService.instant('listen-library.alertUnsuccess'),
              subTitle: this.translateService.instant('alertUnsuccessMessage'),
              buttons: [{
                text: this.translateService.instant('message.ok'),
                handler: () => {
              
                }
              }]
            }).present();
          }
        }),
        error =>
        loading.dismiss().then(() => {}))
      // code...
    }
    else if(!localStorage['user_id']){
      this.alertCtrl.create({
              title:this.translateService.instant('listen-library.alertUnsuccess'),
              subTitle: this.translateService.instant('listen-library.alertLogin'),
              buttons: [{
                text: this.translateService.instant('message.ok'),
                handler: () => {
                  // this.navCtrl.setRoot(Category)
                }
              }]
            }).present();
    }
  }

  onCreateMediaInsatnce() {
    this.musicControls.create({
      track: this.track, // optional, default : ''
      artist: this.artist, // optional, default : ''
      cover: this.cover, // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying: true, // optional, default : true
      dismissable: true, // optional, default : false
      // hide previous/next/close buttons:
      hasPrev: true, // show previous button, optional, default: true
      hasNext: true, // show next button, optional, default: true
      hasClose: true, // show close button, optional, default: false
      // iOS only, optional
      album: 'Absolution', // optional, default: ''
      duration: 60, // optional, default: 0
      elapsed: 10, // optional, default: 0
      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated
      ticker: this.track
    });

    this.musicControls.subscribe().subscribe(action => {
      // alert(JSON.stringify(action))
      switch (action) {
        case 'music-controls-next':
          this.onForword()
          break;
        case 'music-controls-previous':
          this.onPrevious();
          break;
        case 'music-controls-pause':
          // this.playButton='true';
          // alert('pause'+this.playButton);
          // this.events.publish('playbutton','true');
          this.onPause();
          break;
        case 'music-controls-play':
          // this.playButton='false';
          // alert('play'+this.playButton);
          this.onPlay();
          break;
        case 'music-controls-destroy':
          this.onStop()
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
    this.musicControls.listen()
    if (this.playButton1 == 'true') {
      this.onPlay()
    } else if (this.playButton1 == 'false') {
      this.onPlayMusic()
    }

  }
  onGetDuration() {
    // alert(a);
    // this.file.currentTime=parseInt(a);
    setInterval(() => {
      this.fullDuration = this.file.duration;
      this.aa = this.file.currentTime;
      if (this.aa == this.fullDuration) {
        this.playButton = 'true';
        this.file = new Audio();
        this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + this.bookdata.audio_sample;
      }
    }, 1000);
    // alert(this.aa)
  }

  onPositionChange(a) {
    let c = this.file.currentTime - a;
    let d = Math.abs(c)
    if (d > 5) {
      this.file.currentTime = parseInt(a);
    }
  }


  onPause() {
    // this.events.subscribe('playbutton', data => {
    //   // alert(data);
    //   this.playButton=data
    // });
    clearInterval(this.secondInterval);
    this.playButton = 'true';
    this.file.pause();
    this.musicControls.updateIsPlaying(false);
    // alert(this.playButton)
  }

  onForword() {
    let c = this.file.currentTime + 5;
    this.file.currentTime = c;
  }
  onPrevious() {
    let c = this.file.currentTime - 5;
    this.file.currentTime = c;

  }
  onPlay() {
    this.playButton = 'false';
    this.playButton1 = 'false';
    this.file.play();
    this.musicControls.updateIsPlaying(true);
    this.onGetDuration();
    this.playTime();
   
  }
  onPlayMusic() {
    this.playButton = 'false';
    this.file.play();
    this.musicControls.updateIsPlaying(true);
    this.onGetDuration();
    this.playTime();
  }

  playTime() {
    this.sec = parseInt(localStorage['totalListeningTime'])
    if (this.sec > 0) {
      this.sec = this.sec + 1;
      localStorage['totalListeningTime'] = this.sec;
      this.totalListeningTime = localStorage['totalListeningTime']
    } else {
      this.sec = 0 + 1;
      localStorage['totalListeningTime'] = this.sec;
      this.totalListeningTime = localStorage['totalListeningTime']
    }
    this.secondInterval = setTimeout(() => {
      this.playTime();
    }, 1000);
  }

  onStop() {
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
  }
  
  ionViewDidLeave() {
    this.playButton = 'true';
    if (this.file) {
      // code...
      this.file.pause();
      this.file.currentTime = 0.0;
    }
    this.file = new Audio();
    this.musicControls.destroy();
  }

  onShareWithTwitter() {
    var message=this.translateService.instant('listen-library.socialSharingMessage')
    this.socialSharing.shareViaTwitter(message, null, 'http://maktbti.com/about-us/'+this.book_id).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  onShareWithFacebook() {
    var message=this.translateService.instant('listen-library.socialSharingMessage')
    this.socialSharing.shareViaFacebook(message, null, 'http://maktbti.com/about-us/'+this.book_id).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  onShareViaAll() {
    var message=this.translateService.instant('listen-library.socialSharingMessage')
    // alert(message)
    this.socialSharing.share(message, null, null, 'http://maktbti.com/about-us/'+this.book_id).then(() => {
      // alert("success")
    }).catch(() => {
      // Error!
    });
  }

  

}
