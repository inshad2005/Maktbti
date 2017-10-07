import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app'
/**
 * Generated class for the ListeningTime page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-listening-time',
  templateUrl: 'listening-time.html',
})
export class ListeningTime {
  listeningTime=0;
  days=0;
  hours=0;
  minutes=0;
  seconds=0;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  private translateService:TranslateService,
  private appProvider:AppProvider) {
    this.listeningTime=this.navParams.get('listeningTime');
    // alert(this.listeningTime);
    this.days=Math.floor(this.listeningTime/86400);
    this.hours=Math.floor((this.listeningTime % 86400)/3600);
    this.minutes=Math.floor(((this.listeningTime % 86400 ) % 3600 ) / 60);
    this.seconds=Math.floor(((this.listeningTime % 86400 ) % 3600 ) % 60);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListeningTime');
  }

}
