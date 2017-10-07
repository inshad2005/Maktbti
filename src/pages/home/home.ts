import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Newlogin} from "../newlogin/newlogin";
import { Signup} from "../signup/signup";
import { AppProvider } from '../../providers/app'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
  	private appProvider:AppProvider) {

  }
 	onSignin(){
 		this.navCtrl.push(Newlogin);
 	}
 	onSignup(){
 		this.navCtrl.push(Signup);
 	}
}
