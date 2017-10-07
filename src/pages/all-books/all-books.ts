import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';;
import { ListenLibrary } from '../listen-library/listen-library';
import { AudioBook } from "../../providers/audio-book"
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from "../../providers/app";
/**
 * Generated class for the AllBooks page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-all-books',
  templateUrl: 'all-books.html',
  providers:[AudioBook]
})
export class AllBooks {
  language:any;
  booklist:any;
  myInput:any;
  bookData:any;
  searchbar='false';
  allBookDetails:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl:LoadingController,private audiobbok:AudioBook,
    private translateService:TranslateService,
   private appProvider:AppProvider) {
  }

  ngOnInit(){
    this.language='eng';
    let loading = this.loadingCtrl.create({content:this.translateService.instant('loading'),spinner:'bubbles'});
    Observable.fromPromise(loading.present())
    .flatMap(data => Observable.forkJoin(this.audiobbok.allBookGet()))
    .subscribe(data =>
      loading.dismiss().then(() =>{
      this.booklist=data[0];
      this.bookData=data[0];
      this.allBookDetails=this.bookData['Books'];
      console.log(JSON.stringify(this.bookData))
      }),
       error =>
         loading.dismiss().then(() => {}))

}
onBook(bookdata){
  this.searchbar='false';
     let loading = this.loadingCtrl.create({ content: this.translateService.instant('loading'),duration: 500,spinner:'bubbles'});
     Observable.of(loading).delay(200).flatMap(loading => loading.present()).subscribe(data=>loading.dismiss().then(() =>
     {
       this.navCtrl.push(ListenLibrary,{bookdata:bookdata})
     }))
}

onSearch(){
      this.searchbar='true';
      if (this.myInput == '') {
            this.booklist['Books'] = this.allBookDetails;
            return;
       }
       let ev= this.myInput
       if (ev && ev.trim() != '') {
        this.booklist['Books'] = this.allBookDetails.filter((value) => {
          if (this.appProvider.current.currentLanguage=='en') {
            return (value.book_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name.toUpperCase().indexOf(ev.toUpperCase()) > -1);
          }
          else if (this.appProvider.current.currentLanguage=='arb') {
            return (value.book_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1);
          }
      })
      }
      else
      {
        this.booklist = this.bookData;
      }
      console.log(this.bookData)
    }
    onContent(){
      this.searchbar='false';
    }
}
