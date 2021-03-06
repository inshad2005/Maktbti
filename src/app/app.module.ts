import { NgModule, ErrorHandler } from '@angular/core';
// import * as moment from "moment";
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ReviewPage } from '../pages/review/review';

import { MyLibrary } from '../pages/my-library/my-library';
import { MySubscribed} from '../pages/my-subscribed/my-subscribed';
import { ListenLibrary } from '../pages/listen-library/listen-library';
import { Newlogin }  from '../pages/newlogin/newlogin';
import { Forgetpasword }  from '../pages/forgetpasword/forgetpasword';
import { Thanks }  from '../pages/thanks/thanks';
import { Category }  from '../pages/category/category';
import { Signup } from '../pages/signup/signup';
import { MyAccount } from '../pages/my-account/my-account';
import { FeedBack } from '../pages/feed-back/feed-back';
import { SubscriptionPlans } from '../pages/subscription-plans/subscription-plans';
import { ListeningTime } from '../pages/listening-time/listening-time';
import { PaymentHistory } from '../pages/payment-history/payment-history';
import { AllBooks } from "../pages/all-books/all-books"
import { ViewMore } from "../pages/view-more/view-more"
import { Recommanded } from '../pages/recommanded/recommanded';
import { CategoryBookList}  from '../pages/categoryBookList/categoryBookList';
import { AboutUs } from '../pages/about-us/about-us';
import { ContactUs } from '../pages/contact-us/contact-us';
import { SimilarBooks } from '../pages/similar-books/similar-books';
import { DeeplinkLibraryPage } from '../pages/deeplink-library-page/deeplink-library-page';
import { AcountSetting } from '../pages/acount-setting/acount-setting';
import { Payment } from '../pages/payment/payment';
import { PaymentSubscription } from '../pages/payment-subscription/payment-subscription';
import { Network } from '@ionic-native/network';

import {SignUp} from '../providers/sign-up'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';
import { MediaPlugin} from '@ionic-native/media';
import { MusicControls } from '@ionic-native/music-controls';
import { Device } from '@ionic-native/device';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { FormsModule }        from '@angular/forms';

import { AppProvider} from "../providers/app";
import { UserData } from '../providers/user-data'
import { Deeplinks } from '@ionic-native/deeplinks';
import { Globalization } from '@ionic-native/globalization';

import {Timer} from '../pipes/timer';
import {DateMomentFormatPipe} from '../pipes/date';
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}

@NgModule({
  declarations: [
  MyApp,
    HomePage, 
    Signup,
    MyLibrary,
    ListenLibrary,
    Newlogin,
    Forgetpasword,
    Thanks,
     Category,
    FeedBack,
    MyAccount,
    SubscriptionPlans,
    ListeningTime,
    PaymentHistory,
    AllBooks,
    Recommanded,
    CategoryBookList,
    ViewMore,
    ReviewPage,
    Timer,
    DateMomentFormatPipe,
    AboutUs,
    ContactUs,
    SimilarBooks,
    DeeplinkLibraryPage,
    AcountSetting,
    MySubscribed,
    Payment,
    PaymentSubscription

  ],
  imports: [
   BrowserModule,
    HttpModule ,
    FormsModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      // iconMode: 'ios',
      // modalEnter: 'modal-slide-in',
      // modalLeave: 'modal-slide-out',
      // pageTransition: 'ios-transition'
    }),
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyAccount,
    HomePage,
    Signup,
    MyLibrary,
    ListenLibrary,
    Newlogin,
    FeedBack,
    Forgetpasword,
    Thanks,
     Category,
    SubscriptionPlans,
    ListeningTime,
    PaymentHistory,
    AllBooks,
    Recommanded,
    CategoryBookList ,
    ViewMore,
    ReviewPage,
    AboutUs,
    ContactUs,
    SimilarBooks,
    DeeplinkLibraryPage,
    AcountSetting,
    MySubscribed,
    Payment,
    PaymentSubscription
   
  ],
  providers: [
    
   StatusBar,
   SplashScreen,
   NativeAudio,
   MediaPlugin,
   AppProvider,
   MusicControls,
   UserData,
   Device,
   Network,
   {provide: ErrorHandler, useClass: IonicErrorHandler},
   SignUp,
   Deeplinks,
   Globalization

  ]
})
export class AppModule {}
