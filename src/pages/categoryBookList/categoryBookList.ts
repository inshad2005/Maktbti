import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import {ListenLibrary} from '../listen-library/listen-library';
import { AudioBook } from "../../providers/audio-book";
import{ViewMore} from "../view-more/view-more";
import { TranslateService } from '@ngx-translate/core';
import {AppProvider} from "../../providers/app";
import {ImagePath} from "../../providers/imagePath";
/**
 * Generated class for the Category page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-categoryBookList',
  templateUrl: 'categoryBookList.html',
  providers:[AudioBook,ImagePath]
})
export class CategoryBookList {
segment;
Category:any;
language:any;
booklist:any;
allBooklist:any
categoryWiseBookList:any;
searchbar='false';
// myInput;
// bookData;
// subcategoryData
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl:LoadingController,private audiobbok:AudioBook,
    private translateService:TranslateService,
    private appProvider:AppProvider,
    private imagePath:ImagePath) {
  	this.segment="featured";
    this.categoryWiseBookList=this.navParams.get('categoryWiseBook')
    // console.log(JSON.stringify(this.categoryWiseBookList));
    // this.bookData=this.categoryWiseBookList['sub_categories'];
    // this.subcategoryData=this.bookData[0].books
    // alert(JSON.stringify(this.subcategoryData))
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Category');
  }

ngOnInit(){
 if(!this.categoryWiseBookList)
    {
       let loading = this.loadingCtrl.create({content:this.translateService.instant('loading'),spinner:'bubbles'});
                Observable.fromPromise(loading.present())
                .flatMap(data => Observable.forkJoin(this.audiobbok.categoryWiseBookGet()))
                .subscribe(data =>
                  loading.dismiss().then(() =>{
                  this.booklist=data[0];
                  console.log(JSON.stringify(this.booklist))
                  // this.bookData=data[0];
                  // this.subcategoryData=this.bookData.sub_categories;
                  // alert('hi')
                  // alert(JSON.stringify(this.subcategoryData));

                  
                  // this.allBooklist=data[1];
                  // this.booklist=this.booklist[0]
                  // console.log(this.booklist[0])
                  // console.log(JSON.stringify(this.booklist[0]))
                  // this.Category=data[2]; 
                  }),
                   error =>
                        loading.dismiss().then(() => {}))
   }

}
onBook(bookdata){
  this.searchbar='false';
     let loading = this.loadingCtrl.create({ content: this.translateService.instant('loading'),duration: 500,spinner:'bubbles'});
     Observable.of(loading).delay(200).flatMap(loading => loading.present()).subscribe(data=>loading.dismiss().then(() =>
       {
       this.navCtrl.push(ListenLibrary,{bookdata:bookdata})
      }))
}
onViewMore(data,titleEng,titleArb){

 this.navCtrl.push(ViewMore,{bookdata:data,titleEng:titleEng,titleArb:titleArb})
}
 onPathGet(path){
    return this.imagePath.findPath(path)
  }
 // onSearch(){
 //      this.searchbar='true';

 //      if (this.myInput == '') {
 //            this.categoryWiseBookList = this.categoryWiseBookList;
 //            return;
 //       }
 //       let ev= this.myInput
 //       if (ev && ev.trim() != '') {
 //        let a= this.categoryWiseBookList['sub_categories'].filter((value) => {
 //          console.log(JSON.stringify(value))
 //         // return (value.books.book_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 );
 //      })
 //      }
 //      else
 //      {
 //        this.categoryWiseBookList = this.categoryWiseBookList;
 //      }
 //      console.log(this.bookData)
     
 //    }

 //    onContent(){
 //      this.searchbar='false';
 //    }
}
