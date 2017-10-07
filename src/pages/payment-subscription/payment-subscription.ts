import { Component } from '@angular/core';
import { LoadingController,AlertController, NavParams,ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { UserData } from '../../providers/user-data';
import {AppProvider} from "../../providers/app";
import { PaymentProvider } from '../../providers/payment-provider';
import { Device } from '@ionic-native/device';

/**
 * Generated class for the AboutUs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-payment-subscription',
  templateUrl: 'payment-subscription.html',
  providers:[UserData,PaymentProvider ]
})
export class PaymentSubscription {
  about;
  PaymentDetails;
  PaymentDetailsSend;
  cardImage;
  slas
  dateError:boolean;
  bookId;
  pageFlag;
  paymentDataSend;
  promo;
  price=0;
  expDate;
  totalAmount=0;
  planDiscount=0;
  promoDiscount=0;
  paymentData;
  promocodeDetails;
  promocodeDetailsUpdate;
  buttonWithoutPromoCode=true;
  bu;
  constructor(
    private appProvider:AppProvider,
   private userDataProvider:UserData,
   private loadingCtrl:LoadingController,
   private paymentProvider:PaymentProvider,
    private translateService: TranslateService,
    private alert: AlertController,
    private navParams:NavParams,
    private viewCtrl: ViewController,
    private device: Device) {
    this.PaymentDetails={}
    this.promo={}
    this.paymentDataSend={}
    this.PaymentDetailsSend={}
    this.promocodeDetailsUpdate={}
    this.bookId=navParams.get('book_id')
    this.pageFlag=navParams.get('page')
    this.price=navParams.get('a');
    this.expDate=navParams.get('b');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUs');
  }
  ngOnInit(){
    console.log(this.price)
    console.log(this.expDate)
     var d1 = new Date();
     var d2 = new Date(this.expDate)
     console.log(d1)
   if(d1.getTime()<d2.getTime()){
     this.planDiscount =(this.price*20)/100;
     this.totalAmount=this.price-this.planDiscount;
   }
   else{
     this.planDiscount=0;
     this.totalAmount=this.price-this.planDiscount;
   }
  this.loadingCtrl.create({content: 'Loading',spinner:'bubbles'});
			
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
    if (this.PaymentDetails.expireDate) {
      // code...
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
   
  }
  paymentBookSubs(){
    let splitdata
    if (this.PaymentDetails.expireDate) {
      // code...
      splitdata=this.PaymentDetails.expireDate.split('/')
    }
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
          let alert=this.alert.create({
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
          let alert=this.alert.create({
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
  onCancel(){
    this.viewCtrl.dismiss()
  }
 


 
}
