import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Rx";
import { UserData } from "../../providers/user-data";
import { Category } from "../category/category";
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app'


/**
 * Generated class for the ContactUs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
  providers:[UserData]
})
export class ContactUs {
contactUsData;
contact;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private translateService:TranslateService,
   private userDataProvider:UserData,
   private loadingCtrl:LoadingController,
   private alertCtrl:AlertController,
   private appProvider:AppProvider) {
  	this.contactUsData={};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUs');
  }

  onSubmit(){
    let loading = this.loadingCtrl.create({content: 'Loading',spinner:'bubbles'});
		Observable.fromPromise(loading.present())
		.flatMap(data => this.userDataProvider.contactUs(this.contactUsData))
		.subscribe(data =>
			loading.dismiss().then(() =>{ 
			  this.contact = data;
        if (this.contact.response == "true") {
          this.alertCtrl.create({
            title:this.translateService.instant('message.success'),
                  subTitle:this.translateService.instant('contactus.successMessage'),
                  buttons:[{
                    text:this.translateService.instant('message.ok'),
                    handler:() => {
                     this.navCtrl.setRoot(Category);
                    }
                  }]
          }).present();
        }

			}),
			error =>
			loading.dismiss().then(() => {})
		);
  }

}
