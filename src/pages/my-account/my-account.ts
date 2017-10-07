import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { FeedBack } from '../feed-back/feed-back' ;
import { SubscriptionPlans } from '../subscription-plans/subscription-plans';
import { ListeningTime } from '../listening-time/listening-time';
import { PaymentHistory } from '../payment-history/payment-history';
import { MySubscribed } from '../my-subscribed/my-subscribed';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app';
import { AcountSetting } from '../acount-setting/acount-setting';
import { UserData } from '../../providers/user-data';
import { Observable } from 'rxjs/Rx';

/**
 * Generated class for the MyAccount page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccount {
  userdata:any;
  myAccountData;
  userDetails;
  userImage;
  subscriptionPlansData;
  listeningTime;
  paymentHistory;
  bookData;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private translateService:TranslateService,
   private appProvider:AppProvider,
   private userDataProvider:UserData,
   private loadingCtrl:LoadingController) {
    this.userdata={};
    // alert(this.appProvider.current.firstName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccount');
  }

  ngOnInit(){
     this.userdata.id=localStorage['user_id']
     let loading = this.loadingCtrl.create({content: this.translateService.instant('loading'),spinner:'bubbles'});
      Observable.fromPromise(loading.present())
      .flatMap(data => Observable.forkJoin(this.userDataProvider.userData(this.userdata),this.userDataProvider.combineSubscribe(this.userdata)))
      .subscribe(data =>
      loading.dismiss().then(() =>{
        this.myAccountData=data[0];
        this.bookData=data[1];
        this.userDetails=this.myAccountData.user_details[0];
        this.listeningTime=this.userDetails.total_listening_time;
        this.subscriptionPlansData=this.myAccountData.Subscription_plan;
        this.userImage=localStorage['image'];
        this.paymentHistory=this.myAccountData.payment_history;
        // alert(JSON.stringify(this.userDetails) )
      }),
      error =>
      loading.dismiss().then(() => {})
    );
  }
  

  onFeedback(){
  	this.navCtrl.push(FeedBack);
  }
  onSubscriptionPlans(){
    this.navCtrl.push(SubscriptionPlans,{subscriptionPlanData:this.subscriptionPlansData,userdetails:this.userDetails});
  }
  onListentiming(){
    this.navCtrl.push(ListeningTime,{listeningTime:this.listeningTime});
  }
  onPaymentHistory(){
    this.navCtrl.push(PaymentHistory,{paymentHistory:this.paymentHistory});
  }
  onAccountSetting(){
    this.navCtrl.push(AcountSetting);
  }
  onSubscribedBook(){
     this.navCtrl.push(MySubscribed);

  }
}
