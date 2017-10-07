var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Events } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { UserData } from '../../providers/user-data';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider } from "../../providers/app";
/**
 * Generated class for the AcountSetting page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AcountSetting = (function () {
    function AcountSetting(navCtrl, navParams, camera, transfer, userDataProvider, loadingCtrl, alertCtrl, translateService, events, appProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.transfer = transfer;
        this.userDataProvider = userDataProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.translateService = translateService;
        this.events = events;
        this.appProvider = appProvider;
        this.showChangePassword = true;
        this.showChangeImage = true;
        this.showChangeName = true;
        this.uploadButton = false;
        this.accountSettingData = {};
        this.pic = localStorage['image'];
    }
    AcountSetting.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AcountSetting');
    };
    AcountSetting.prototype.onSelectPicture = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: 2
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.pic = base64Image;
            _this.imageUrl = base64Image;
            _this.uploadButton = true;
        }, function (err) {
            // alert(JSON.stringify(err));
        });
    };
    AcountSetting.prototype.onCapturePicture = function () {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.pic = base64Image;
            _this.imageUrl = base64Image;
            _this.uploadButton = true;
        }, function (err) {
            // Handle error
        });
    };
    AcountSetting.prototype.onUploadImage = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: this.translateService.instant('loading')
        });
        Observable.fromPromise(loading.present());
        var options = {
            fileKey: 'image',
            fileName: 'name.jpeg',
            chunkedMode: false,
        };
        var fileTransfer = this.transfer.create();
        fileTransfer.upload(this.imageUrl, 'http://europa.promaticstechnologies.com/audioLibrary/WebServices/updatedUserImage/' + localStorage['user_id'] + '.json', options)
            .then(function (data) {
            return loading.dismiss().then(function () {
                // alert(JSON.stringify(options));
                // alert(JSON.stringify(data));
                _this.alertCtrl.create({
                    title: _this.translateService.instant('message.success'),
                    subTitle: _this.translateService.instant('accountSettings.imageSuccess'),
                    buttons: [{
                            text: _this.translateService.instant('message.ok'),
                            handler: function () {
                                localStorage['image'] = _this.pic;
                                _this.events.publish('user:created');
                                _this.uploadButton = false;
                            }
                        }]
                }).present();
            });
        }, function (err) {
            loading.dismiss().then(function () {
                _this.alertCtrl.create({
                    title: _this.translateService.instant('message.error'),
                    subTitle: _this.translateService.instant('accountSettings.imageError'),
                    buttons: [{
                            text: _this.translateService.instant('message.ok')
                        }]
                }).present();
            });
        });
    };
    AcountSetting.prototype.onChangePassword = function () {
        this.showChangePassword = false;
        this.showChangeName = true;
        this.showChangeImage = true;
    };
    AcountSetting.prototype.onChangeName = function () {
        this.showChangeName = false;
        this.showChangeImage = true;
        this.showChangePassword = true;
    };
    AcountSetting.prototype.onChangeImage = function () {
        this.showChangeImage = false;
        this.showChangeName = true;
        this.showChangePassword = true;
    };
    AcountSetting.prototype.onSubmit = function () {
        var _this = this;
        var message = {
            password: this.accountSettingData.password,
            confirmPassword: this.confirm_password
        };
        var mandatory = [];
        if (message.password != message.confirmPassword) {
            mandatory.push('Pass');
        }
        if (mandatory.length > 0) {
            this.alertCtrl.create({
                title: this.translateService.instant('mylibrary.alerttitle'),
                message: this.translateService.instant('forgot.paswordconfirmpassword'),
                buttons: ['ok']
            })
                .present();
            return;
        }
        this.accountSettingData.id = localStorage['user_id'];
        var loading = this.loadingCtrl.create({ content: this.translateService.instant('loading') });
        Observable.fromPromise(loading.present())
            .flatMap(function (data) { return _this.userDataProvider.editProfile(_this.accountSettingData); })
            .subscribe(function (data) {
            return loading.dismiss().then(function () {
                _this.response = data;
                if (_this.response.message == 'profile updated successfully') {
                    _this.alertCtrl.create({
                        title: _this.translateService.instant('message.success'),
                        subTitle: _this.translateService.instant('accountSettings.profileSuccess'),
                        buttons: [{
                                text: _this.translateService.instant('message.ok'),
                                handler: function () {
                                    if (_this.accountSettingData.first_name) {
                                        localStorage['first_name'] = _this.accountSettingData.first_name;
                                        _this.events.publish('user:created');
                                    }
                                    if (_this.accountSettingData.last_name) {
                                        localStorage['last_name'] = _this.accountSettingData.last_name;
                                    }
                                    _this.events.publish('user:created');
                                }
                            }]
                    }).present();
                }
                else if (_this.response.message == 'password updated successfully') {
                    _this.alertCtrl.create({
                        title: _this.translateService.instant('message.success'),
                        subTitle: _this.translateService.instant('accountSettings.passwordSuccess'),
                        buttons: [{
                                text: _this.translateService.instant('message.ok')
                            }]
                    }).present();
                }
            });
        }, function (error) {
            return loading.dismiss().then(function () { });
        });
    };
    AcountSetting.prototype.confirm = function () {
        if (this.confirm_password == this.accountSettingData.password) {
            this.message = false;
        }
        else {
            this.message = true;
        }
    };
    AcountSetting.prototype.pass_confirm = function () {
        if (this.confirm_password) {
            // code...
            if (this.confirm_password == this.accountSettingData.password) {
                this.message = false;
            }
            else {
                this.message = true;
            }
        }
    };
    return AcountSetting;
}());
AcountSetting = __decorate([
    IonicPage(),
    Component({
        selector: 'page-acount-setting',
        templateUrl: 'acount-setting.html',
        providers: [Camera, FileTransfer, UserData]
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Camera,
        FileTransfer,
        UserData,
        LoadingController,
        AlertController,
        TranslateService,
        Events,
        AppProvider])
], AcountSetting);
export { AcountSetting };
//# sourceMappingURL=acount-setting.js.map