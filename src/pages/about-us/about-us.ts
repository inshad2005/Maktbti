import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { UserData } from '../../providers/user-data';
import {AppProvider} from "../../providers/app";


/**
 * Generated class for the AboutUs page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
  providers:[UserData]
})
export class AboutUs {
about;
  constructor(
    private appProvider:AppProvider,
   private userDataProvider:UserData,
   private loadingCtrl:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUs');
  }
  ngOnInit(){
  	let loading = this.loadingCtrl.create({content: 'Loading',spinner:'bubbles'});
				Observable.fromPromise(loading.present())
				.flatMap(data => this.userDataProvider.aboutUs())
				.subscribe(data =>
				loading.dismiss().then(() =>{ 
				this.about = data;
				// this.about_data=data.about_us.content;
				//alert(JSON.stringify(this.about));
				
				}),
				error =>
				loading.dismiss().then(() => {})
				);	
  }

}
