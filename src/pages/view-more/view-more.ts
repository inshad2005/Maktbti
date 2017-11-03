import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {ListenLibrary} from '../listen-library/listen-library';
import { AudioBook } from "../../providers/audio-book";
import {AppProvider} from "../../providers/app";
import { TranslateService } from '@ngx-translate/core';
import {ImagePath} from "../../providers/imagePath";

/**
 * Generated class for the AllBooks page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-more',
  templateUrl: 'view-more.html',
  providers:[AudioBook,ImagePath]
})
export class ViewMore {
  language;
  booklist;
  titleEng;
  titleArb
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl:LoadingController,
    private audiobbok:AudioBook,
     private translateService:TranslateService,
     private appProvider:AppProvider,
     private imagePath:ImagePath) {
    this.booklist=this.navParams.get('bookdata')
    // alert(JSON.stringify(this.booklist))
    this.titleEng=this.navParams.get('titleEng')
    this.titleArb=this.navParams.get('titleArb');
    console.log(JSON.stringify(this.booklist) )
  }

//   ngOnInit(){
//   this.language='eng';
//     let loading = this.loadingCtrl.create({content: 'Loading'});
//             Observable.fromPromise(loading.present())
//             .flatMap(data => Observable.forkJoin(this.audiobbok.allBookGet()))
//             .subscribe(data =>
//               loading.dismiss().then(() =>{
//               this.booklist=data[0];

//               }),
//                error =>
//                     loading.dismiss().then(() => {}))

// }
onBook(bookdata){
 this.navCtrl.push(ListenLibrary,{bookdata:bookdata})
}
 onPathGet(path){
    return this.imagePath.findPath(path)
  }
}
