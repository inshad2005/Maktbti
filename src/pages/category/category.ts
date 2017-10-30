import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { ListenLibrary } from '../listen-library/listen-library';
import { AudioBook } from "../../providers/audio-book"
import { ViewMore } from "../view-more/view-more";
import { CategoryBookList } from "../categoryBookList/categoryBookList";
import { TranslateService } from '@ngx-translate/core';
import { AppProvider  } from "../../providers/app";
import {  ImagePath} from "../../providers/imagePath";
/**
 * Generated class for the Category page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
  providers:[AudioBook,ImagePath]
})
export class Category {
  segment;
  Category:any;
  language:any;
  booklist:any;
  allBooklist:any;
  searchbar='false';
  myInput;
  bookData;
  bookDatasale;
  bookDatarecent;
  bookDatafree;
  bookDatasubscribe;
  searchIcon;
  dataforSearchAll;
  dataforSearch;
  fordummy;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl:LoadingController,
    private audiobbok:AudioBook,
    private translateService:TranslateService,
    private appProvider:AppProvider,
    private imagePath:ImagePath) {
  	this.segment="featured"
    this.searchIcon='true';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Category');
  }

  ngOnInit(){
          this.language='arb';
          let loading = this.loadingCtrl.create({content:this.translateService.instant('loading'),spinner:'bubbles'});
              Observable.fromPromise(loading.present())
              .flatMap(data => Observable.forkJoin(this.audiobbok.catOfBookGet(),this.audiobbok.categoryGet()))
              .subscribe(data =>
                loading.dismiss().then(() =>{
                  this.allBooklist=data[0];
                  this.bookData=data[0]
            
                  this.bookDatasale=this.bookData['sale'];
                  this.bookDatafree=this.bookData['free'];
                  this.bookDatarecent=this.bookData['recent'];
                  this.bookDatasubscribe=this.bookData['mysubs']
                  this.dataforSearchAll=this.bookData['sale'].concat(this.bookData['free']).concat(this.bookData['recent'])
                  this.dataforSearch=this.bookData['sale'].concat(this.bookData['free']).concat(this.bookData['recent'])
                  this.fordummy=this.bookData['sale'].concat(this.bookData['free']).concat(this.bookData['recent'])
                  // alert(JSON.stringify(this.bookData));
                  console.log(JSON.stringify(this.dataforSearchAll))
                  // this.booklist=this.booklist[0]
                  // console.log(this.booklist[0])
                  // console.log(JSON.stringify(this.booklist[0]))
                  this.Category=data[1]; 
                }
              ),
              error =>
                loading.dismiss().then(() => {}))
  }
  onBook(bookdata){
    this.searchbar='false';
    this.navCtrl.push(ListenLibrary,{bookdata:bookdata})
     // let loading = this.loadingCtrl.create({ content: this.translateService.instant('loading'),duration: 500,spinner:'bubbles'});
     // Observable.of(loading).delay(200).flatMap(loading => loading.present()).subscribe(data=>loading.dismiss().then(() =>
     // {
     //   this.navCtrl.push(ListenLibrary,{bookdata:bookdata})
     // }))
     
  }
  onViewMore(data,titleEng,titleArb){
   this.navCtrl.push(ViewMore,{bookdata:data,titleEng:titleEng,titleArb:titleArb})
  }
  onCategory(data){
    console.log(JSON.stringify(data))
   this.navCtrl.push(CategoryBookList,{categoryWiseBook:data})
  }

  onSearch(){
 ///////////////new ///////////////////

      if (this.appProvider.current.currentLanguage=='en') {
          this.searchbar='true';
           if(this.myInput== ''){
        
        this.dataforSearchAll=this.fordummy;
        return;
      }
      let ev= this.myInput;
      if (ev && ev.trim() != '') {
         if (this.dataforSearch.length>0) {
              this.dataforSearchAll=this.dataforSearch.filter((value)=>{
              console.log('serch '+JSON.stringify(value));
              return (value.book_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name.toUpperCase().indexOf(ev.toUpperCase()) > -1)
             })
         }
       }else
         {
          this.dataforSearchAll = this.dataforSearchAll;
          console.log( 'else'+this.dataforSearchAll)
         }

     
    }else if(this.appProvider.current.currentLanguage=='arb'){
      this.searchbar='true';
           if(this.myInput== ''){
        
        this.dataforSearchAll=this.fordummy;
        return;
      }
      let ev= this.myInput;
      if (ev && ev.trim() != '') {
         if (this.dataforSearch.length>0) {
              this.dataforSearchAll=this.dataforSearch.filter((value)=>{
              console.log('serch '+JSON.stringify(value));
              return (value.book_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1)
             })
         }
       }else
         {
          this.dataforSearchAll = this.dataforSearchAll;
          console.log( 'else'+this.dataforSearchAll)
         }
    }

    ////////////////old //////////////////////////
    // if (this.appProvider.current.currentLanguage=='en') {
    //    this.searchbar='true';
    //  if(this.myInput== ''){
    //    this.allBooklist['sale']=this.bookDatasale;
    //    this.allBooklist['recent']=this.bookDatarecent;
    //    this.allBooklist['free']=this.bookDatafree;
    //    this.allBooklist['mysubs']=this.bookDatasubscribe;
    //    console.log('data'+JSON.stringify(this.bookData));
    //    console.log('iffff'+JSON.stringify(this.allBooklist));
    //    return;
    //  }
    //  let ev= this.myInput;
    //  if (ev && ev.trim() != '') {
    //    if (this.bookDatasale.length>0) {
    //         this.allBooklist['sale']=this.bookDatasale.filter((value)=>{
    //         console.log('serch '+JSON.stringify(value));
    //         return (value.book_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name.toUpperCase().indexOf(ev.toUpperCase()) > -1)
    //        })
    //    }
    //    if (this.bookDatarecent.length>0) {
    //        this.allBooklist['recent']=this.bookDatarecent.filter((value)=>{
    //        console.log('serch '+JSON.stringify(value));
    //        return (value.book_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name.toUpperCase().indexOf(ev.toUpperCase()) > -1)
    //      })
    //    }
    //    if (this.bookDatafree.length>0) {
    //        this.allBooklist['free']=this.bookDatafree.filter((value)=>{
    //        console.log('serch '+JSON.stringify(value));
    //        return (value.book_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name.toUpperCase().indexOf(ev.toUpperCase()) > -1)
    //      })
    //    }
    //    if (this.bookDatasubscribe.length>0) {
    //        this.allBooklist['mysubs']=this.bookDatasubscribe.filter((value)=>{
    //        console.log('serch '+JSON.stringify(value));
    //        return (value.book_name.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name.toUpperCase().indexOf(ev.toUpperCase()) > -1)
    //      })
    //    }
    //  }
    //  else
    //     {
    //      this.allBooklist = this.allBooklist;
    //      console.log( 'else'+this.allBooklist)
    //     }
    // }
    // else if(this.appProvider.current.currentLanguage=='arb'){
    //     this.searchbar='true';
    //  if(this.myInput== ''){
    //    this.allBooklist['sale']=this.bookDatasale;
    //    this.allBooklist['recent']=this.bookDatarecent;
    //    this.allBooklist['free']=this.bookDatafree;
    //    this.allBooklist['mysubs']=this.bookDatasubscribe;
    //    console.log('data'+JSON.stringify(this.bookData));
    //    console.log('iffff'+JSON.stringify(this.allBooklist));
    //    return;
    //  }
    //  let ev= this.myInput;
    //  if (ev && ev.trim() != '') {
    //    if (this.bookDatasale.length>0) {
    //         this.allBooklist['sale']=this.bookDatasale.filter((value)=>{
    //         console.log('serch '+JSON.stringify(value));
    //         return (value.book_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1)
    //        })
    //    }
    //    if (this.bookDatarecent.length>0) {
    //        this.allBooklist['recent']=this.bookDatarecent.filter((value)=>{
    //        console.log('serch '+JSON.stringify(value));
    //        return (value.book_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1)
    //      })
    //    }
    //    if (this.bookDatafree.length>0) {
    //        this.allBooklist['free']=this.bookDatafree.filter((value)=>{
    //        console.log('serch '+JSON.stringify(value));
    //        return (value.book_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1)
    //      })
    //    }
    //  }
    //  if (this.bookDatasubscribe.length>0) {
    //        this.allBooklist['mysubs']=this.bookDatasubscribe.filter((value)=>{
    //        console.log('serch '+JSON.stringify(value));
    //        return (value.book_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1 || value.author.author_name_arabic.toUpperCase().indexOf(ev.toUpperCase()) > -1)
    //      })
    //    }
    //  else
    //     {
    //      this.allBooklist = this.allBooklist;
    //      console.log( 'else'+this.allBooklist)
    //     }
    // }
    
     
    
  }

  onContent(){
    this.searchbar='false';
  }
  hideSearchIcon(){
    this.searchIcon='false';
  }
  showSearchIcon(){
    this.searchIcon='true';
  }
  onPathGet(path){
    return this.imagePath.findPath(path)
  }
}
