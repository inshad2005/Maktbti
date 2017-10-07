import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,LoadingController,NavController,MenuController,Events,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';
import { ENV } from "./env";
import { Observable } from "rxjs/Rx";

import { HomePage } from '../pages/home/home';
import { MyLibrary } from '../pages/my-library/my-library';

import { Category }  from '../pages/category/category';
import { CategoryBookList }  from '../pages/categoryBookList/categoryBookList';

import { MyAccount } from "../pages/my-account/my-account"
import { AllBooks } from "../pages/all-books/all-books";
import { Recommanded } from '../pages/recommanded/recommanded';
import { AboutUs } from '../pages/about-us/about-us';
import { ContactUs } from '../pages/contact-us/contact-us';
import { DeeplinkLibraryPage } from '../pages/deeplink-library-page/deeplink-library-page';
import { AcountSetting } from '../pages/acount-setting/acount-setting';

import { Globalization } from '@ionic-native/globalization';
import { Network } from '@ionic-native/network';

import { UserData } from '../providers/user-data';
import { AppProvider } from "../providers/app";
import { Deeplinks } from '@ionic-native/deeplinks';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: NavController;

  rootPage: any;
  
  pages: Array<{title: string,logo:string,component?: any}>;
  bottomline='';
  firstName;
  lastName;
  email;
  imageUrl

  constructor(public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private translateService: TranslateService,
    private appProvider:AppProvider,
    private userDataProvider:UserData,
    private loadingCtrl:LoadingController,
    private deeplinks: Deeplinks,
    private globalization: Globalization,
    private menuCtrl:MenuController,
    public events: Events,
    private network: Network,
    private toastctrl:ToastController
    ) {

     this.events.subscribe('user:created', () => {
       // alert('subscribe event');
       this.firstName=localStorage['first_name'];
       this.lastName=localStorage['last_name'];
       this.email=localStorage['email'];
       this.imageUrl=localStorage['image'];
      });
      if (localStorage['aut']=='login') {
        // alert('publish event')
        this.events.publish('user:created');
      }
       this.initializeApp();
      
    }

  initializeApp() {
    this.platform.ready().then(() => {
      if(localStorage['aut']=="login"){
         this.rootPage=Category;
      }else{
       this.rootPage= HomePage;
      }
      this.appProvider.current.currentLanguage=ENV.language
      this.translateService.setDefaultLang(ENV.language);
      this.translateService.use(ENV.language)
      this.pages = [
        { title: "menu.titleHome", logo:"img/home(2).png", component: Category},
        { title:'menu.titleMyAccount', logo:"img/avatar(1).png", component:MyAccount},
        { title:'menu.titleMyLibrary', logo:"img/open-book(1).png", component: MyLibrary},
        { title:'menu.titleRecommended', logo:"img/favorites-button(1).png", component: Recommanded},
        { title:'menu.titleBrowseAll', logo:"img/magnifying-glass.png",component:AllBooks},
        { title:'menu.titleCategory', logo:"img/file.png",component:CategoryBookList},
        { title:'menu.titleAboutUs',logo:"img/care-about-planet.png",component:AboutUs},
        { title:'menu.titleContactUs',logo:"img/sms.png",component:ContactUs},
        // { title:'test',logo:"img/sms.png",component:DeeplinkLibraryPage }
      ];
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString('#2ABFDB');
      this.splashScreen.hide();
      // ---------------------- network connection ---------------------
        this.network.onDisconnect().subscribe(() => {
        this.toastctrl.create({
          message: 'No Network Connection',
          duration: 3000
        }).present();
      })
      // ---------------------- network connection ----------------------
      //----------------------------------------------  DEEPLINK -------------------------------------
     this.deeplinks.routeWithNavController(this.nav,{
       '/about-us/:book_id': DeeplinkLibraryPage,
      }).subscribe((match) => {

       // match.$route - the route we matched, which is the matched entry from the arguments to route()
       // match.$args - the args passed in the link
       // match.$link - the full link data
         // alert('Successfully matched route');
      }, (nomatch) => {
       // nomatch.$link - the full link data
       // alert('Got a deeplink that didn\'t match');
      });
   //----------------------------------------------  DEEPLINK END -------------------------------------
    
   //----------------------------------------------globalization----------------------------------------

   this.globalization.getPreferredLanguage()
    .then(res => {
      // alert(JSON.stringify (res));
      // alert(res.value);
      let a=res.value.split('-')
      // alert(JSON.stringify(a))
      if (a[0]=='en') {
       this.appProvider.current.currentLanguage='en';
       this.translateService.use('en');
      }
      else{
        this.appProvider.current.currentLanguage='arb';
        this.translateService.use('arb');
      }
    })
      .catch(e => alert(e));

    });
      this.listeningTime();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  onLogOut(){
    localStorage.clear()
    this.nav.setRoot(HomePage);
  }
  
  listeningTime(){
    if (localStorage['totalListeningTime']) {
      let loading = this.loadingCtrl.create({content: this.translateService.instant('loading')});
    Observable.fromPromise(loading.present())
    .flatMap(data => this.userDataProvider.sendListeningTime())
    .subscribe(data =>
      loading.dismiss().then(() =>{ 
        localStorage['totalListeningTime']=0;
      }),
      error =>
      loading.dismiss().then(() => {
        // alert(JSON.stringify(error));
      })
    );
    }
    
  }

  onImage(){
    this.menuCtrl.close();
    this.nav.push(AcountSetting);
  }
}
