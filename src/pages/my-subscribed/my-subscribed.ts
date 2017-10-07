import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { ListenLibrary } from '../listen-library/listen-library';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { UserData } from "../../providers/user-data";
import { AudioBook } from "../../providers/audio-book"
import { AppProvider } from "../../providers/app"

/**
 * Generated class for the MyLibrary page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



@Component({
  selector: 'page-my-subscribed',
  templateUrl: 'my-subscribed.html',
  providers: [UserData,AudioBook]
})
export class MySubscribed {
  booklist
  language = 'eng';
  file: any;
  playButton;
  iconIndex;
  playbuttonIndex: any;
  searchbar = 'false'
  myInput;
  bookData;
  books;
  userdata

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userDataProvider: UserData,
    private audiobbok:AudioBook,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private translateService: TranslateService,
    private appProvider:AppProvider
  ) {
    this.userdata={};
  }

  ngOnInit() {
    this.userdata.id=localStorage['user_id']
    console.log('ionViewDidLoad MyLibrary');
    let loading = this.loadingCtrl.create({
      content: this.translateService.instant('loading'),
      spinner:'bubbles'
    });
    Observable.fromPromise(loading.present())
      .flatMap(data => Observable.forkJoin(this.userDataProvider.combineSubscribe(this.userdata)))
      .subscribe(data =>
        loading.dismiss().then(() => {
          let local=data[0]
          this.booklist =local.result.library;
          this.bookData = local.result.library;
          // alert(JSON.stringify (this.booklist))
          this.playButton = 'true';
          // alert(JSON.stringify(this.booklist))
          // this.booklist=this.booklist[0]
          // console.log(this.booklist[0])
          // console.log(JSON.stringify(this.booklist[0]))
          // this.Category=data[1]; 
        }),
        error =>
        loading.dismiss().then(() => {}))

  }
  onBookClick(bookdata) {
    this.searchbar = 'false';
     this.navCtrl.push(ListenLibrary, {
        bookdata: bookdata
      })
    // let loading = this.loadingCtrl.create({
    //   content: this.translateService.instant('loading'),
    //   duration: 500,
    //   spinner:'bubbles'
    // });
    // Observable.of(loading).delay(200).flatMap(loading => loading.present()).subscribe(data => loading.dismiss().then(() => {
    //   this.navCtrl.push(ListenLibrary, {
    //     bookdata: bookdata
    //   })
    // }))
  }
  onRemove(bookdata) {
    if (this.file) {
      // code...
      this.file.pause();
      this.file.currentTime = 0.0;
    }
    this.file = new Audio();
    this.playbuttonIndex = "true";
    let confirm = this.alertCtrl.create({
      title: this.translateService.instant('mylibrary.alerttitle'),
      message: this.translateService.instant('mylibrary.alertmessage'),
      buttons: [{
          text: this.translateService.instant('mylibrary.alertdisagree'),
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: this.translateService.instant('mylibrary.alertagree'),
          handler: () => {
            console.log('Agree clicked');
            let loading = this.loadingCtrl.create({
              content: this.translateService.instant('loading')
            });
            Observable.fromPromise(loading.present())
              .flatMap(data => Observable.forkJoin(this.userDataProvider.onDeleteMySubscribedBook(bookdata)))
              .subscribe(data =>
                loading.dismiss().then(() => {
                  this.booklist = this.booklist.filter(f => f.id !== bookdata.id);
                  this.bookData = this.bookData.filter(f => f.id !== bookdata.id);
                }),
                error =>
                loading.dismiss().then(() => {}))
          }
        }
      ]
    });
    confirm.present();
  }
  onPlay(a, b) {
    // alert(a);
    this.iconIndex = b;
    this.file = new Audio();
    this.file.src = "http://europa.promaticstechnologies.com/audioLibrary/audios/sample_audio/" + a;
    // alert(this.file.src)
    this.file.load();
    // this.playButton='false';
    this.playbuttonIndex = "false"
    this.file.play();
  }
  onPause(i) {
    // alert(i);
    this.iconIndex = i;
    this.playbuttonIndex = "true";
    this.file.pause();
  }

  onSearch() {
    this.searchbar = 'true';

    if (this.myInput == '') {
      this.booklist = this.bookData;
      return;
    }
    let ev = this.myInput
    if (ev && ev.trim() != '') {
      this.booklist = this.bookData.filter((value) => {
        // alert(JSON.stringify(value))
        return (value.Books.book_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.Books.author.author_name.toUpperCase().indexOf(ev.toUpperCase()) > -1);
      })
    } else {
      this.booklist = this.bookData;
    }
    console.log(this.bookData)
  }

  onContent() {
    this.searchbar = 'false';
  }
  ionViewDidLeave() {
    this.playButton = 'true';
    if (this.file) {
      this.file.pause();
      this.file.currentTime = 0.0;
    }
    this.file = new Audio();
  }
}


