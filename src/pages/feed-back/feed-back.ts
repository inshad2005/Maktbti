import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { UserData } from "../../providers/user-data";
import { AppProvider } from '../../providers/app'
/**
 * Generated class for the FeedBack page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-feed-back',
  templateUrl: 'feed-back.html',
  providers:[UserData]
})
export class FeedBack {
  feedback:any;
  data:any;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private userDataProvider:UserData,
   private loadingCtrl:LoadingController,
    private alert : AlertController,
    private translateService:TranslateService,
    private appProvider:AppProvider) {
  	this.feedback={}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedBack');
  }
  onSubmit(){

  
  	let loading = this.loadingCtrl.create({content:this.translateService.instant('loading'),spinner:'bubbles'});
            Observable.fromPromise(loading.present())
            .flatMap(data => Observable.forkJoin(this.userDataProvider.sendFeedBack(this.feedback)))
            .subscribe(data =>
              loading.dismiss().then(() =>{
                this.data=data;
                 this.alert.create({
					                  title:this.translateService.instant('feedback.alerttitle'),
					                  subTitle:this.translateService.instant('feedback.alertsubtitle'),
					                  buttons:[{
					                    text:this.translateService.instant('feedback.alertok'),
					                    handler:() => {
					                   this.navCtrl.pop();

					                    }
					                  }]
                				}).present(); 
              //this.booklist=data[0];
              // this.booklist=this.booklist[0]
              // console.log(this.booklist[0])
              // console.log(JSON.stringify(this.booklist[0]))
              // this.Category=data[1]; 

              }),
               error =>
                    loading.dismiss().then(() => {}))


  }
}
