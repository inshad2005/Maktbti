var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, NavController, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { ENV } from "./env";
import { Observable } from "rxjs/Rx";
import { HomePage } from '../pages/home/home';
import { MyLibrary } from '../pages/my-library/my-library';
import { Category } from '../pages/category/category';
import { CategoryBookList } from '../pages/categoryBookList/categoryBookList';
import { MyAccount } from "../pages/my-account/my-account";
import { AllBooks } from "../pages/all-books/all-books";
import { Recommanded } from '../pages/recommanded/recommanded';
import { AboutUs } from '../pages/about-us/about-us';
import { ContactUs } from '../pages/contact-us/contact-us';
import { DeeplinkLibraryPage } from '../pages/deeplink-library-page/deeplink-library-page';
import { AcountSetting } from '../pages/acount-setting/acount-setting';
import { Globalization } from '@ionic-native/globalization';
import { UserData } from '../providers/user-data';
import { AppProvider } from "../providers/app";
import { Deeplinks } from '@ionic-native/deeplinks';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, translateService, appProvider, userDataProvider, loadingCtrl, deeplinks, globalization, menuCtrl, events) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.translateService = translateService;
        this.appProvider = appProvider;
        this.userDataProvider = userDataProvider;
        this.loadingCtrl = loadingCtrl;
        this.deeplinks = deeplinks;
        this.globalization = globalization;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.bottomline = '';
        this.events.subscribe('user:created', function () {
            // alert('subscribe event');
            _this.firstName = localStorage['first_name'];
            _this.lastName = localStorage['last_name'];
            _this.email = localStorage['email'];
            _this.imageUrl = localStorage['image'];
        });
        if (localStorage['aut'] == 'login') {
            // alert('publish event')
            this.events.publish('user:created');
        }
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (localStorage['aut'] == "login") {
                _this.rootPage = Category;
            }
            else {
                _this.rootPage = HomePage;
            }
            _this.appProvider.current.currentLanguage = ENV.language;
            _this.translateService.setDefaultLang(ENV.language);
            _this.translateService.use(ENV.language);
            _this.pages = [
                { title: "menu.titleHome", logo: "img/home(2).png", component: Category },
                { title: 'menu.titleMyAccount', logo: "img/avatar(1).png", component: MyAccount },
                { title: 'menu.titleMyLibrary', logo: "img/open-book(1).png", component: MyLibrary },
                { title: 'menu.titleRecommended', logo: "img/favorites-button(1).png", component: Recommanded },
                { title: 'menu.titleBrowseAll', logo: "img/magnifying-glass.png", component: AllBooks },
                { title: 'menu.titleCategory', logo: "img/file.png", component: CategoryBookList },
                { title: 'menu.titleAboutUs', logo: "img/care-about-planet.png", component: AboutUs },
                { title: 'menu.titleContactUs', logo: "img/sms.png", component: ContactUs },
            ];
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.backgroundColorByHexString('#2ABFDB');
            _this.splashScreen.hide();
            //----------------------------------------------  DEEPLINK -------------------------------------
            _this.deeplinks.routeWithNavController(_this.nav, {
                '/about-us/:book_id': DeeplinkLibraryPage,
            }).subscribe(function (match) {
                // match.$route - the route we matched, which is the matched entry from the arguments to route()
                // match.$args - the args passed in the link
                // match.$link - the full link data
                // alert('Successfully matched route');
            }, function (nomatch) {
                // nomatch.$link - the full link data
                // alert('Got a deeplink that didn\'t match');
            });
            //----------------------------------------------  DEEPLINK END -------------------------------------
            //----------------------------------------------globalization----------------------------------------
            _this.globalization.getPreferredLanguage()
                .then(function (res) {
                // alert(JSON.stringify (res));
                // alert(res.value);
                var a = res.value.split('-');
                // alert(JSON.stringify(a))
                if (a[0] == 'en') {
                    _this.appProvider.current.currentLanguage = 'en';
                    _this.translateService.use('en');
                }
                else {
                    _this.appProvider.current.currentLanguage = 'arb';
                    _this.translateService.use('arb');
                }
            })
                .catch(function (e) { return alert(e); });
        });
        this.listeningTime();
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.onLogOut = function () {
        localStorage.clear();
        this.nav.setRoot(HomePage);
    };
    MyApp.prototype.listeningTime = function () {
        var _this = this;
        if (localStorage['totalListeningTime']) {
            var loading_1 = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
            Observable.fromPromise(loading_1.present())
                .flatMap(function (data) { return _this.userDataProvider.sendListeningTime(); })
                .subscribe(function (data) {
                return loading_1.dismiss().then(function () {
                    localStorage['totalListeningTime'] = 0;
                });
            }, function (error) {
                return loading_1.dismiss().then(function () {
                    // alert(JSON.stringify(error));
                });
            });
        }
    };
    MyApp.prototype.onImage = function () {
        this.menuCtrl.close();
        this.nav.push(AcountSetting);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", NavController)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        StatusBar,
        SplashScreen,
        TranslateService,
        AppProvider,
        UserData,
        LoadingController,
        Deeplinks,
        Globalization,
        MenuController,
        Events])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map