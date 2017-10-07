import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { SignUp } from "../../providers/sign-up"
import { Http } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app'
/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers:[SignUp]
})
export class Signup {
 signupdata:any
 confirm_password;
 message;
 termcondition
  constructor(private translateService:TranslateService,
    public http:Http,public navCtrl: NavController,
    public navParams: NavParams,
    private signupprovider: SignUp,
    private loadingCtrl:LoadingController,
    private alert : AlertController,
    private appProvider:AppProvider) {
    this.signupdata={}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Signup');
  }

onSignup(){
     let loading = this.loadingCtrl.create({content:this.translateService.instant('loading'),spinner:'bubbles' });
            Observable.fromPromise(loading.present())
            .flatMap(data => this.signupprovider.signup(this.signupdata))
            .subscribe(data =>
              loading.dismiss().then(() =>{ 
              this.signupdata.response = data
              if(this.signupdata.response.status==1){
                this.alert.create({
                  title:this.translateService.instant('message.success'),
                  subTitle:this.translateService.instant('message.messageSignup'),
                  buttons:[{
                    text:this.translateService.instant('message.ok'),
                    handler:() => {
                     this.navCtrl.pop();
                    }
                  }]
                }).present();      
          }
          else if (this.signupdata.response.status==0) {
            this.alert.create({
                  title:this.translateService.instant('message.alreadyRegistered'),
                  subTitle:this.translateService.instant('message.messageAlreadyRegistered'),
                  buttons:[{
                    text:this.translateService.instant('message.ok'),
                    handler:() => {
                     this.navCtrl.pop();
                    }
                  }]
                }).present();
          }
          }),
               error =>
                    loading.dismiss().then(() => {
                        this.alert.create({
                        title:this.translateService.instant('message.error'),
                        subTitle:this.translateService.instant('message.somethingWentWrong'),
                        buttons:[{
                        text:this.translateService.instant('message.ok'),
                        handler:() => {
                        
                    }
                  }]
                }).present(); 
                    })
     )
}
 confirm(){
   if (this.confirm_password == this.signupdata.password) {
     this.message=false;
   }
   else{
     this.message=true;
   }
  }
  pass_confirm(){
   if (this.confirm_password) {
     // code...
     if (this.confirm_password == this.signupdata.password) {
     this.message=false;
   }
   else{
     this.message=true;
   }
   }
   
  }
  term(a){
    this.termcondition=a;
    // alert(a)

  }
  onAlreadyRegistered(){
    this.navCtrl.pop();
  }






}