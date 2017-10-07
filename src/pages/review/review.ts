import { Component } from '@angular/core';
import { NavController,ViewController,LoadingController,NavParams} from 'ionic-angular';
import { AudioBook } from '../../providers/audio-book';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from '../../providers/app'

@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
  providers:[AudioBook]
})
export class ReviewPage {
  review;
  count=0;
  bookId;
  starFirst;
  starSecond;
  starThird;
  starFourth;
  starFifth;
  constructor(public navCtrl: NavController,
	   private viewCtrl:ViewController,
	   private audioBook:AudioBook,
	   private loadingCtrl:LoadingController,
	   private translateService:TranslateService,
	   private navParams:NavParams,
	   private appProvider:AppProvider) {

   this.review={}
   this.bookId=this.navParams.get('bookId')
  }

	oncancel(){
			this.viewCtrl.dismiss();
	}

	onStarClick(a){
		if (a==1) {
			var starFirst=document.getElementById('starFirst');
			starFirst.style.color='#2ABFDB';
			var starSecond=document.getElementById('starSecond');
			starSecond.style.color='#fff';
			var starThird=document.getElementById('starThird');
			starThird.style.color='#fff';
			var starFourth=document.getElementById('starFourth');
			starFourth.style.color='#fff';
			var starFifth=document.getElementById('starFifth');
			starFifth.style.color='#fff';
			this.count=1;
		}
		else if (a==2) {
			var starFirst=document.getElementById('starFirst');
			starFirst.style.color='#2ABFDB';
			var starSecond=document.getElementById('starSecond');
			starSecond.style.color='#2ABFDB';
			var starThird=document.getElementById('starThird');
			starThird.style.color='#fff';
			var starFourth=document.getElementById('starFourth');
			starFourth.style.color='#fff';
			var starFifth=document.getElementById('starFifth');
			starFifth.style.color='#fff';
			this.count=2;
		}
		else if (a==3) {
			var starFirst=document.getElementById('starFirst');
			starFirst.style.color='#2ABFDB';
			var starSecond=document.getElementById('starSecond');
			starSecond.style.color='#2ABFDB';
			var starThird=document.getElementById('starThird');
			starThird.style.color='#2ABFDB';
			var starFourth=document.getElementById('starFourth');
			starFourth.style.color='#fff';
			var starFifth=document.getElementById('starFifth');
			starFifth.style.color='#fff';
			this.count=3;
		}
		else if (a==4) {
			var starFirst=document.getElementById('starFirst');
			starFirst.style.color='#2ABFDB';
			var starSecond=document.getElementById('starSecond');
			starSecond.style.color='#2ABFDB';
			var starThird=document.getElementById('starThird');
			starThird.style.color='#2ABFDB';
			var starFourth=document.getElementById('starFourth');
			starFourth.style.color='#2ABFDB';
			var starFifth=document.getElementById('starFifth');
			starFifth.style.color='#fff';
			this.count=4;
		}
		else if (a==5) {
			var starFirst=document.getElementById('starFirst');
			starFirst.style.color='#2ABFDB';
			var starSecond=document.getElementById('starSecond');
			starSecond.style.color='#2ABFDB';
			var starThird=document.getElementById('starThird');
			starThird.style.color='#2ABFDB';
			var starFourth=document.getElementById('starFourth');
			starFourth.style.color='#2ABFDB';
			var starFifth=document.getElementById('starFifth');
			starFifth.style.color='#2ABFDB';
			this.count=5;
		}
	}
	onSubmitReview(){
		this.review.customer_id=localStorage['user_id'];
		this.review.book_id=this.bookId;
		this.review.rating=this.count;
		let loading = this.loadingCtrl.create({content:this.translateService.instant('loading'),spinner:'bubbles'});
            Observable.fromPromise(loading.present())
            .flatMap(data => Observable.forkJoin(this.audioBook.postReview(this.review)))
            .subscribe(data =>
              loading.dismiss().then(() =>{
              if(data[0].response=="true"){
              	this.review=data[0].data;
              	this.viewCtrl.dismiss({data:this.review});
              }
             
              }),
               error =>
                    loading.dismiss().then(() => {
                    	// alert(error)
                    }))
            //this.viewCtrl.dismiss({data:'hy'});
	}
}
