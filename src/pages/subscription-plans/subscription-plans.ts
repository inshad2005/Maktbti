import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,AlertController,ModalController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Rx';
import { PaymentProvider } from '../../providers/payment-provider';
import {AppProvider} from "../../providers/app";
import { Payment } from '../payment/payment';
/**
 * Generated class for the SubscriptionPlans page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 declare var StartCheckout

@Component({
  selector: 'page-subscription-plans',
  templateUrl: 'subscription-plans.html',
  providers:[PaymentProvider]
})
export class SubscriptionPlans {
	paymentData;
  paymentDataSend;
  amount=200;
  userdetails;
  PaymentDetails;
  cardImage;
  slas
  dateError:boolean;
  showdiv1:boolean=true;
  showdiv2:boolean=false;
  constructor(public navCtrl: NavController, 
  	public  navParams: NavParams,
  	private translateService:TranslateService,
  	private loadingCtrl:LoadingController,
  	private paymentProvider:PaymentProvider,
    private appProvider:AppProvider,
    private altCtrl:AlertController,
    private modalCtrl: ModalController) {
    this.PaymentDetails={}
      this.paymentData=this.navParams.get('subscriptionPlanData')
     this.userdetails=this.navParams.get('userdetails')
         this.paymentDataSend={}
    StartCheckout.config({
    key: "test_open_k_0bbf6eeeaa38883b515b",
    complete: (params)=> {
      this.payment(params);
    }
  });
    
  }

  ionViewDidLoad() {

   
    console.log('ionViewDidLoad SubscriptionPlans');
  }
  // ngOnInit(){
  // 	let loading = this.loadingCtrl.create({content: 'Loading'});
		// 		Observable.fromPromise(loading.present())
		// 		.flatMap(data => this.paymentProvider.subscription())
		// 		.subscribe(data =>
		// 		loading.dismiss().then(() =>{ 
		// 		this.paymentData = data.subscriptionPlan;
		// 		//alert(JSON.stringify(this.paymentData));
		// 		// this.about_data=data.about_us.content;
		// 		//alert(JSON.stringify(this.about));
				
		// 		}),
		// 		error =>
		// 		loading.dismiss().then(() => {})
		// 		);	
  // }
   makePayment(a){
     let profileModal =  this.modalCtrl.create(Payment,{page:"ApplicationSubscription"})
              profileModal.present();
              profileModal.onDidDismiss(data=>{
                // alert(JSON.stringify(data))
                if (data) {
                if (data.response=="true") {
               
                 }
              }

    }) 
    // let profileModal= this.modalCtrl.create(Payment)
    //  profileModal.present();
    // StartCheckout.open({
    //   amount:a.amount*100,
    //     // = AED 100.00
    //   currency: "SAR"
    // });
    }

     payment(params){
     
      // this.paymentData.amount_paid=this.amount;
      let splitdata=this.PaymentDetails.expireDate.split('/')
      this.paymentDataSend.exp_month=window.btoa(splitdata[0])
      this.paymentDataSend.exp_year=window.btoa('20'+splitdata[1])
      this.paymentDataSend.user_id=window.btoa(localStorage['user_id'])
      this.paymentDataSend.name=window.btoa(localStorage['first_name']+' '+localStorage['last_name'])
      this.paymentDataSend.number=window.btoa(this.PaymentDetails.number)
      this.paymentDataSend.cvc=window.btoa(this.PaymentDetails.cvc)
      this.paymentDataSend.email=window.btoa(this.PaymentDetails.email)
      let loading = this.loadingCtrl.create({content: this.translateService.instant('loading'),spinner:'bubbles'});
      Observable.fromPromise(loading.present())
     .flatMap(data => this.paymentProvider.Payment(this.paymentDataSend))
     .subscribe(data =>
      loading.dismiss().then(() =>{ 
        if (data.response=='true') {
          let alert=this.altCtrl.create({
            title:this.translateService.instant('message.payment'),
            subTitle:this.translateService.instant('message.paymentSubscription'),
            buttons: [
              {
                text: this.translateService.instant('message.ok'),
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          alert.present();
        }else{
          let alert=this.altCtrl.create({
            title:this.translateService.instant('message.payment'),
            subTitle:this.translateService.instant('message.messagepaymentfailed'),
            buttons: [
              {
                text: this.translateService.instant('message.ok'),
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          alert.present();
        }
      
      //this.logindata.res = data
      
      }),
    error =>
            loading.dismiss().then(() => {
        })
        )

    }
cardCheck(a){
  this.cardImage=this.card(a);
 
}

card(number){

    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa.png";

    // Mastercard
    re = new RegExp("^5[1-5]");
    if (number.match(re) != null)
        return "Mastercard.png";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "AMEX.png";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover.png";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners.png";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Diners.png";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB.png";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron.png";

     re = new RegExp("^12");
    if (number.match(re) != null)
        return "Airplus.png";
 

    re = new RegExp("^67");
    if (number.match(re) != null)
        return "Maestro.png";

    

    return "";
  }
  dateCheck(a){
    this.dateError=false;
   if (a.length<2) {
      this.slas='flase';
      this.PaymentDetails.expireDate=a;
   }else if (a.length==2) {
     if (this.slas!='true') {
         this.PaymentDetails.expireDate=a+'/';
     }
   }
   
   if (a.length==5) {
     var mydate=parseInt('20'+a.split('/')[1]);
     var mymonth=parseInt(a.split('/')[0]);
     var date= new Date();
     var currentdate=date.getFullYear()
     var currentMonth=date.getMonth()+1;
     if (mydate<currentdate) {
       this.dateError=true;
     }else if ( mydate==currentdate) {
       if (mymonth<currentMonth) {
           this.dateError=true;
       
       }
     }
     if (mymonth>12) {
       // code...
     }
     // code...
   }
   if (this.PaymentDetails.expireDate.length==3) {
     this.slas='true';
   }
   
  }
  onCancel(){
    this.PaymentDetails={}
    this.showdiv1=true;
    this.showdiv2=false;
  }
}
