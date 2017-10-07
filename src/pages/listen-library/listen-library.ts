import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,ModalController,ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AudioBook } from "../../providers/audio-book";
import { Observable } from 'rxjs/Rx';
import { NativeAudio } from '@ionic-native/native-audio';
import { AppProvider} from "../../providers/app";
import { ReviewPage } from '../review/review';
import { MusicControls } from '@ionic-native/music-controls';
import { Events } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SimilarBooks } from '../similar-books/similar-books';
import { PaymentProvider } from '../../providers/payment-provider';
import { Payment } from '../payment/payment'
import { Category } from '../category/category'
/**
 * Generated class for the ListenLibrary page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var StartCheckout

@Component({
  selector: 'page-listen-library',
  templateUrl: 'listen-library.html',
  providers: [AudioBook, SocialSharing,PaymentProvider]
})
export class ListenLibrary {
  segment;
  bookdata;
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
  paymentDataSend;
  amount=200;
  letCurrentIndex=0;
  totalPartOfAudio;
  // similarbookData:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private audiobbok: AudioBook,
    private loadingCtrl: LoadingController,
    private alert: AlertController,
    private nativeAudio: NativeAudio,
    private translateService: TranslateService,
    private appProvider: AppProvider,
    private modalCtrl: ModalController,
    private musicControls: MusicControls,
    private events: Events,
    private socialSharing: SocialSharing,
    private paymentProvider:PaymentProvider,
    private viewCtrl: ViewController
  ) {
    
    // alert(JSON.stringify(StartCheckout))
    this.segment = "listen";
  }

  ngOnInit() {
    this.bookdata = this.navParams.get('bookdata')
    console.log(JSON.stringify(this.bookdata))
    if (this.appProvider.current.currentLanguage == 'en') {
      this.track = this.bookdata.book_name
      if (this.bookdata.author) {
       this.artist = this.bookdata.author.author_name
      }
      this.cover = 'http://europa.promaticstechnologies.com/audioLibrary/webroot/images/books/' + this.bookdata.image;
      this.avg_rating=this.bookdata.average_rating;
      // alert(this.avg_rating);
    }
    if (this.appProvider.current.currentLanguage == 'arb') {
      this.track = this.bookdata.book_name_arabic
      if (this.bookdata.author) {
        this.artist = this.bookdata.author.author_arabic
      }
      this.cover = 'http://europa.promaticstechnologies.com/audioLibrary/webroot/images/books/' + this.bookdata.image;
    }

    console.log(JSON.stringify(this.bookdata));
    let loading = this.loadingCtrl.create({
      content: this.translateService.instant('loading'),
      spinner:'bubbles'
    });
    Observable.fromPromise(loading.present())
      // .flatMap(data => Observable.forkJoin(this.audiobbok.addToMyLibrary(bookdata),this.audiobbok.getSimilarBook()))
      .flatMap(data => Observable.forkJoin(this.audiobbok.getSimilarBook(this.bookdata), this.audiobbok.getRating(this.bookdata.id,this.bookdata.subscription_book)))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.similarbook = data[0];
          this.similarbook = this.similarbook.filter(f => f.id != this.bookdata.id)
          this.review = data[1];
          this.users= this.review.all;
          this.totalPartOfAudio=this.review.main_books_audios.length;
          // alert(this.users);
          //this.similarbook=data[1];
          // this.booklist=this.booklist[0]
          // console.log(this.booklist[0])
                 this.playButton = 'true';
          console.log(JSON.stringify(this.review))
           // if(this.review.subscribe==1 || this.review.subscribe=='1') {
           //      // code...
           //      if (this.review.main_books_audios.length>0) {
           //        console.log(this.review.main_books_audios.length)
           //        console.log(this.review.main_books_audios[0].main_audio)
 
           //         this.file = new Audio();
           //         this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/main_audio/" + this.review.main_books_audios[0].main_audio;
           //         this.file.load();
           //        // code...
           //      }
           //    }   
           //    if(this.review.subscribe==0  ||this.review.subscribe=='0') {
           //      // code...
                   
           //          this.file = new Audio();
           //          this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + this.bookdata.audio_sample;
           //          this.file.load();
           //    }
          // this.Category=data[1]; 
          if((this.bookdata.price=='0' || this.bookdata.price==0) && this.bookdata.subscription_book!='yes'){
            if (this.review.main_books_audios.length>0  ) {
                  console.log(this.review.main_books_audios.length)
                  console.log(this.review.main_books_audios[0].main_audio)
 
                   this.file = new Audio();
                   this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/main_audio/" + this.review.main_books_audios[0].main_audio;
                   this.file.load();
                  // code...
                }
          }
          else if (this.bookdata.price>0 && this.bookdata.subscription_book!='yes') {
            // code...
             if(this.review.subscribe==0  ||this.review.subscribe=='0') {
                // code...
                   
                    this.file = new Audio();
                    this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + this.bookdata.audio_sample;
                    this.file.load();
              }
             if(this.review.subscribe==1 || this.review.subscribe=='1') {
                // code...
                if (this.review.main_books_audios.length>0) {
                  console.log(this.review.main_books_audios.length)
                  console.log(this.review.main_books_audios[0].main_audio)
 
                   this.file = new Audio();
                   this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/main_audio/" + this.review.main_books_audios[0].main_audio;
                   this.file.load();
                  // code...
                }
              }
          }
          else if (this.review.plan_info==null &&  this.bookdata.subscription_book=='yes') {

                   this.file = new Audio();
                   this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + this.bookdata.audio_sample;
                   this.file.load();
    
          }
          else if (this.review.plan_info!=null &&  this.bookdata.subscription_book=='yes') {
              if (this.review.main_books_audios.length>0) {
                console.log(this.review.main_books_audios.length)
                console.log(this.review.main_books_audios[0].main_audio)

                 this.file = new Audio();
                 this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/main_audio/" + this.review.main_books_audios[0].main_audio;
                 this.file.load();
                // code...
              }
            
        }

        }),
        error =>
        loading.dismiss().then(() => {}))
  }
  // onSubscribed() {

  // }
  onAddLibrary() {
    let bookdata = {
      "book_id": this.bookdata.id,
      "user_id": localStorage['user_id']
    }
    //alert(JSON.stringify(bookdata))
    let loading = this.loadingCtrl.create({
      content: this.translateService.instant('loading'),
      spinner:'bubbles'
    });
    Observable.fromPromise(loading.present())
      // .flatMap(data => Observable.forkJoin(this.audiobbok.addToMyLibrary(bookdata),this.audiobbok.getSimilarBook()))
      .flatMap(data => Observable.forkJoin(this.audiobbok.addToMyLibrary(bookdata)))
      .subscribe(data =>
        loading.dismiss().then(() => {
          this.bookStatus = data[0];
          if (this.bookStatus.message == "Book added in your wishlist.") {
           this.alert.create({
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
          if (this.bookStatus.message == "Your have already Wished it.") {
            this.alert.create({
              title: this.translateService.instant('listen-library.alertUnsuccess'),
              subTitle: this.translateService.instant('listen-library.alertUnsuccessMessage'),
              buttons: [{
                text: this.translateService.instant('message.ok'),
                handler: () => {
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
        }),
        error =>
        loading.dismiss().then(() => {}))
  }

  onCreateMediaInsatnce() {
    // if (this.review.plan_info==null &&  this.bookdata.subscription_book=='yes') {
    //     let alert=this.alert.create({
    //         title:this.translateService.instant('message.alert'),
    //         subTitle:this.translateService.instant('message.subscriptionalert'),
    //         buttons: [
    //           {
    //             text: this.translateService.instant('message.ok'),
    //             role: 'cancel',
    //             handler: () => {
    //               console.log('Cancel clicked');
    //             }
    //           }
    //         ]
    //       });
    //       alert.present();
    //       return;
    // }
    // else if(this.review.plan_info !=null &&  this.bookdata.subscription_book=='yes'){
    //     let alert=this.alert.create({
    //         title:this.translateService.instant('message.payment'),
    //         subTitle:this.translateService.instant('message.messagepaymentfailed'),
    //         buttons: [
    //           {
    //             text: this.translateService.instant('message.ok'),
    //             role: 'cancel',
    //             handler: () => {
    //               console.log('Cancel clicked');
    //             }
    //           }
    //         ]
    //       });
    //       alert.present();
    // }
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
      if (this.aa == this.fullDuration){
        this.aa=0.0;
        // alert('hi');
        this.onStop()
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
    clearInterval(this.secondInterval);
    this.playButton = 'true';
    this.file.pause();
    this.musicControls.updateIsPlaying(false);
    // alert(this.playButton)
  }

  onForword() {
    let c = this.file.currentTime + 30;
    this.file.currentTime = c;
  }
  onPrevious() {
    let c = this.file.currentTime - 30;
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
    // alert('hi stop');
    this.file.pause();
    this.file.currentTime = 0.0;
    clearInterval(this.secondInterval);
    this.playButton = 'true';
    this.file = new Audio();

    if(this.review.subscribe==1 || this.review.subscribe=='1') {
     
        this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/main_audio/" + this.review.main_books_audios[this.letCurrentIndex].main_audio;
        this.file.load();
        this.musicControls.destroy();
       

    }   
    if(this.review.subscribe==0  ||this.review.subscribe=='0') {
      this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + this.bookdata.audio_sample;
      this.file.load();
      this.musicControls.destroy();
     
    }
   
  }


  onNextSong(){
    if (this.bookdata.subscription_book=='no' && this.review.subscribe=='1' || this.bookdata.price=='0' ||  this.bookdata.subscription_book=='yes') {
      // code...
        if(this.letCurrentIndex<this.review.main_books_audios.length-1) {
          this.file.pause();
           this.file.currentTime = 0.0;
           clearInterval(this.secondInterval);
          this.letCurrentIndex=this.letCurrentIndex+1;
          //alert(this.letCurrentIndex)
          
           this.file = new Audio();
           this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/main_audio/" + this.review.main_books_audios[this.letCurrentIndex].main_audio;
           this.file.load();
            this.onPlayMusic();
          // code...
        }
    }

  }
  onPreviousSong(){
    if (this.bookdata.subscription_book=='no' && this.review.subscribe=='1' || this.bookdata.price=='0' ||  this.bookdata.subscription_book=='yes') {
      // code...
        if(this.letCurrentIndex>0) {
           this.file.pause();
        this.file.currentTime = 0.0;
        clearInterval(this.secondInterval);
          this.letCurrentIndex=this.letCurrentIndex-1;
          //alert(this.letCurrentIndex)
           this.file = new Audio();
           this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/main_audio/" + this.review.main_books_audios[this.letCurrentIndex].main_audio;
           this.file.load();
           this.onPlayMusic();
          // code...
        }
    }
  }
  onReview() {
    let modal = this.modalCtrl.create(ReviewPage, {
      bookId: this.bookdata.id
    });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        this.userReview = data.data;
        this.my = this.review.data.filter(f => f.customer_id == localStorage['user_id'])
        this.review['data'] = this.review.data.filter(f => f.customer_id != localStorage['user_id'])
        
          if (this.my) {
            // code...
            this.user_name = this.my[0].user.first_name + ' ' + this.my[0].user.last_name;
            this.usersPreviousRating=this.my[0].rating;
           this.bookdata.average_rating=((((parseInt(this.avg_rating)*parseInt(this.users))-parseInt(this.usersPreviousRating))+parseInt(this.userReview.rating))/parseInt(this.users))
          
          }
          else{
            this.bookdata.average_rating=((((parseInt(this.avg_rating)*parseInt(this.users)))+parseInt(this.userReview.rating))/(parseInt(this.users))+1) 
          }
          // code...
        
        
      }
      // alert(JSON.stringify(data))
    })
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
    this.socialSharing.shareViaTwitter(message, null, 'http://maktbti.com/about-us/'+this.bookdata.id).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
  onShareWithFacebook() {
    var message=this.translateService.instant('listen-library.socialSharingMessage')
    this.socialSharing.shareViaFacebook(message, null, 'http://maktbti.com/about-us/'+this.bookdata.id).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  onShareViaAll() {
    var message=this.translateService.instant('listen-library.socialSharingMessage')
    // alert(message)
    this.socialSharing.share(message, null, null, 'http://maktbti.com/about-us/'+this.bookdata.id).then(() => {
      // alert("success")
    }).catch(() => {
      // Error!
    });
  }
  onSimilar(a) {
    this.navCtrl.push(SimilarBooks, {
      bookdata: a
    });
    // this.segment="listen";
    // this.showdiv='false';
    // this.similarbookData=a;
  }
   onBuyBook(price,expdate){
   let profileModal =  this.modalCtrl.create(Payment,{a:price,b:expdate,book_id:this.bookdata.id,page:"BuyBook"})
    profileModal.present();
    profileModal.onDidDismiss(data=>{
     // alert(JSON.stringify(data))
      if (data) {
        if (data.response=="true") {
          this.review.subscribe=1;
          this.afterPaymentaudio()
        }
      }

    })

   //   var d1 = new Date();
   //   var d2 = new Date(b)
   //   let price
   // if(d1.getTime()<d2.getTime()){
   //   this.amount =a-((a*20)/100);
   // }
   // else{
   //   this.amount=a;
   // }
   //  StartCheckout.open({
   //    amount:this.amount*100,
   //      // = AED 100.00
   //    currency: "SAR"
   //  });
    }

    //  payment(params){
    //   this.paymentDataSend=params;
    //   this.paymentDataSend.amount_paid=this.amount;
    //   this.paymentDataSend.user_id=localStorage['user_id']
    //   this.paymentDataSend.name=localStorage['first_name']+' '+localStorage['last_name'];
    //   this.paymentDataSend.book_id=this.bookdata.id;
    //   let loading = this.loadingCtrl.create({content: this.translateService.instant('loading'),spinner:'bubbles'});
    //   Observable.fromPromise(loading.present())
    //  .flatMap(data => this.paymentProvider.oneTimePayment(this.paymentDataSend))
    //  .subscribe(data =>
    //   loading.dismiss().then(() =>{ 
    //  if (data.response=='true') {
    //       let alert=this.alert.create({
    //         title:this.translateService.instant('message.payment'),
    //         subTitle:this.translateService.instant('message.ok'),
    //         buttons: [
    //           {
    //             text: this.translateService.instant('message.ok'),
    //             role: 'cancel',
    //             handler: () => {
    //               this.review.subscribe=1;
    //               this.afterPaymentaudio()
    //               console.log('Cancel clicked');
    //             }
    //           }
    //         ]
    //       });
    //       alert.present();
    //     }else{
    //       let alert=this.alert.create({
    //         title:this.translateService.instant('message.payment'),
    //         subTitle:this.translateService.instant('message.messagepaymentfailed'),
    //         buttons: [
    //           {
    //             text: this.translateService.instant('message.ok'),
    //             role: 'cancel',
    //             handler: () => {
    //               console.log('Cancel clicked');
    //             }
    //           }
    //         ]
    //       });
    //       alert.present();
    //     }
      
    //   }),
    // error =>
    //         loading.dismiss().then(() => {
    //     })
    //     )

    // }
    afterPaymentaudio(){
       if(this.review.subscribe==1 || this.review.subscribe=='1') {
                // code...
                if (this.review.main_books_audios.length>0) {
                  console.log(this.review.main_books_audios.length)
                  console.log(this.review.main_books_audios[0].main_audio)
             
                   this.file = new Audio();
                   this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/main_audio/" + this.review.main_books_audios[0].main_audio;
                   this.file.load();
                  // code...
                }
              }   
    }

    onSubscribed( ){
       if (this.review.plan_info==null) {
          let profileModal =  this.modalCtrl.create(Payment,{page:"ApplicationSubscription"})
              profileModal.present();
              profileModal.onDidDismiss(data=>{
                // alert(JSON.stringify(data))
                if (data) {
                if (data.response=="true") {
                this.review.subscribe=1;
                this.afterPaymentaudio()
              }
              }

    }) 
       }
    //   if (this.review.plan_info==null) {
    //     let alert=this.alert.create({
    //         title:this.translateService.instant('message.payment'),
    //         subTitle:this.translateService.instant('message.messagepaymentfailed'),
    //         buttons: [
    //           {
    //             text: this.translateService.instant('message.ok'),
    //             role: 'cancel',
    //             handler: () => {
    //               console.log('Cancel clicked');
    //             }
    //           }
    //         ]
    //       });
    //       alert.present();
    //   }else{
    //     let bookdata = {
    //   "book_id": this.bookdata.id,
    //   "user_id": localStorage['user_id']
    // }
    // //alert(JSON.stringify(bookdata))
    // let loading = this.loadingCtrl.create({
    //   content: this.translateService.instant('loading'),
    //   spinner:'bubbles'
    // });
    // Observable.fromPromise(loading.present())
    //   // .flatMap(data => Observable.forkJoin(this.audiobbok.addToMyLibrary(bookdata),this.audiobbok.getSimilarBook()))
    //   .flatMap(data => Observable.forkJoin(this.audiobbok.addToMyBookSubScription(bookdata)))
    //   .subscribe(data =>
    //     loading.dismiss().then(() => {
    //       this.bookStatus = data[0];
    //       if (this.bookStatus.message == "Book added in your wishlist.") {
    //        this.alert.create({
    //           title: this.translateService.instant('listen-library.alertSuccess'),
    //           subTitle: this.translateService.instant('listen-library.alertmessage'),
    //           buttons: [{
    //             text: this.translateService.instant('message.ok'),
    //             handler: () => {
    //               this.addLibraryButton = 'disable';
    //             }
    //           }]
    //         }).present();
    //       }
    //       if (this.bookStatus.message == "Your have already Wished it.") {
    //         this.alert.create({
    //           title: this.translateService.instant('listen-library.alertUnsuccess'),
    //           subTitle: this.translateService.instant('alertUnsuccessMessage'),
    //           buttons: [{
    //             text: this.translateService.instant('message.ok'),
    //             handler: () => {
    //               // this.navCtrl.setRoot(Category)
    //             }
    //           }]
    //         }).present();
    //       }
    //       //this.similarbook=data[1];
    //       // this.booklist=this.booklist[0]
    //       // console.log(this.booklist[0])
    //       // console.log(JSON.stringify(this.booklist[0]))
    //       // this.Category=data[1]; 
    //     }),
    //     error =>
    //     loading.dismiss().then(() => {}))
    //   }
    }


 onBack(){
  this.navCtrl.setRoot(Category)
 }
}


