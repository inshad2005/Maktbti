import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,Events } from 'ionic-angular';
import { Signup } from '../signup/signup';
import { Forgetpasword }   from '../forgetpasword/forgetpasword';
import { Category } from '../category/category';
import { Observable } from 'rxjs/Rx';
import { LoginProvider } from '../../providers/login-provider';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app'
import {ENV} from '../../app/env';



@Component({
  selector: 'page-newlogin',
  templateUrl: 'newlogin.html',
  providers:[LoginProvider]
})
export class Newlogin{
logindata
  constructor(private translateService:TranslateService,
   public navCtrl: NavController,
   public navParams: NavParams,
   private loadingCtrl:LoadingController,
   private loginProvider:LoginProvider,
   private alertCtrl : AlertController,
   private appProvider:AppProvider,
   public events: Events) {
  	this.logindata={}
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Newlogin');
  }
	onSignIn(){
		 let loading = this.loadingCtrl.create({content:this.translateService.instant('loading'),spinner:'bubbles'});
		 Observable.fromPromise(loading.present())
		 .flatMap(data => this.loginProvider.Login(this.logindata))
		 .subscribe(data =>
			loading.dismiss().then(() =>{ 
			//this.logindata.res = data
				if(data.status==1){
					 this.navCtrl.setRoot(Category)
					 localStorage['user_id']=data.data.id;
					 localStorage['aut']="login";
					 localStorage['first_name']=data.data.first_name;
					 localStorage['last_name']=data.data.last_name;
					 localStorage['email']=data.data.email;
					 localStorage['image']=ENV.profile+data.data.image;
					 this.events.publish('user:created');  				
				}
				else if (data.status==0) {
					this.alertCtrl.create({
						title:this.translateService.instant('forgot.error'),
						subTitle:this.translateService.instant('login.errorMsg'),
						buttons:[{
							text:"ok"
						}]
					}).present();
				}
			}),
	  error =>
            loading.dismiss().then(() => {
            	
    		})
    		)

	}
	signup(){
		this.navCtrl.push(Signup)
	}
	forgtpaswd(){
		this.navCtrl.push(Forgetpasword)
	}


}
