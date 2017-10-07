import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Rx';
import { PaymentProvider } from '../../providers/payment-provider';
import { AppProvider } from '../../providers/app'
// import { InAppBrowser } from '@ionic-native/in-app-browser';


/**
 * Generated class for the PaymentHistory page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 declare var StartCheckout

@Component({
  selector: 'page-payment-history',
  templateUrl: 'payment-history.html',
  providers:[PaymentProvider]

})
export class PaymentHistory {
paymentData;
amount=200;
paymentHistory
  constructor(public navCtrl: NavController,private appProvider:AppProvider, public navParams: NavParams,private translateService:TranslateService,private loadingCtrl:LoadingController,private paymentProvider:PaymentProvider) {
    this.paymentData={}
    this.paymentHistory=this.navParams.get('paymentHistory')
  	StartCheckout.config({
	  key: "test_open_k_0bbf6eeeaa38883b515b",
	  complete: (params)=> {
	    this.payment(params);
	  }
	});
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentHistory');
  }

  makePayment(){
	  StartCheckout.open({
		  amount: this.amount,
        // = AED 100.00
		  currency: "SAR"
		});
 	 }

     payment(params){
      this.paymentData=params;
      // this.paymentData.amount_paid=this.amount;
      this.paymentData.user_id=localStorage['user_id']
      this.paymentData.name=localStorage['first_name']+' '+localStorage['last_name']
      let loading = this.loadingCtrl.create({content: this.translateService.instant('loading'),spinner:'bubbles'});
      Observable.fromPromise(loading.present())
     .flatMap(data => this.paymentProvider.Payment(this.paymentData))
     .subscribe(data =>
      loading.dismiss().then(() =>{ 
      //this.logindata.res = data
      
      }),
    error =>
            loading.dismiss().then(() => {
        })
        )

    }

}
