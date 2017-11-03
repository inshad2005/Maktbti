import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { UserData } from "../../providers/user-data";
import { ListenLibrary } from '../listen-library/listen-library';
import { AppProvider } from "../../providers/app";
import {ImagePath} from "../../providers/imagePath";

/**
 * Generated class for the AllBooks page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-recommanded',
  templateUrl: 'recommanded.html',
   providers:[UserData,ImagePath]
})
export class Recommanded {
  booklist:any;
  searchbar='false';
  myInput:any;
  bookData:any;
  recommendedData:any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
    private userDataProvider:UserData,
   private loadingCtrl:LoadingController,
   private translateService:TranslateService,
   private appProvider:AppProvider,
   private imagePath:ImagePath
   ) {

  }

  ngOnInit() {
    console.log('ionViewDidLoad AllBooks');
    let loading = this.loadingCtrl.create({content:this.translateService.instant('loading'),spinner:'bubbles'});
            Observable.fromPromise(loading.present())
            .flatMap(data => Observable.forkJoin(this.userDataProvider.listOfRecommandation()))
            .subscribe(data =>
              loading.dismiss().then(() =>{
              this.recommendedData=data[0];
              this.booklist=this.recommendedData.books;
              this.bookData=this.booklist;
              // this.booklist=this.booklist[0]
              // console.log(this.booklist[0])
              // console.log(JSON.stringify(this.booklist[0]))
              // this.Category=data[1]; 

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
            this.booklist = this.bookData;
            return;
       }
       let ev= this.myInput
       if (ev && ev.trim() != '') {
        this.booklist = this.bookData.filter((value) => {
          if (this.appProvider.current.currentLanguage=='en') {
            return (value.book_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name.toUpperCase().indexOf(ev.toUpperCase()) > -1);
          }
          else if (this.appProvider.current.currentLanguage=='arb') {
            return (value.book_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1);
          }
          // alert(JSON.stringify(value))
        
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
    onPathGet(path){
    return this.imagePath.findPath(path)
   }
}
