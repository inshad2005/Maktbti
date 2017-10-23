import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,AlertController,Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { UserData } from '../../providers/user-data';
import { Observable } from 'rxjs/Rx';
import { TranslateService } from '@ngx-translate/core';
import { AppProvider  } from "../../providers/app";
import { MyAccount} from "../my-account/my-account"

/**
 * Generated class for the AcountSetting page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-acount-setting',
  templateUrl: 'acount-setting.html',
  providers:[Camera,FileTransfer,UserData]
})
export class AcountSetting {
	pic;
	imageUrl;
	showChangePassword:boolean= true;
	showChangeImage:boolean=true;
	showChangeName:boolean=true;
	accountSettingData;
	confirm_password;
	message;
	response;
	uploadButton:boolean=false;
  constructor(public navCtrl: NavController,
  	public navParams: NavParams,
  	private camera: Camera,
  	private transfer:FileTransfer,
  	private userDataProvider:UserData,
  	private loadingCtrl:LoadingController,
  	private alertCtrl:AlertController,
  	private translateService:TranslateService,
  	public events: Events,
  	private appProvider:AppProvider) {
  	this.accountSettingData={};
  	this.pic=localStorage['image'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AcountSetting');
  }

  onSelectPicture(){
  	const options: CameraOptions = {
	  	quality: 50,
	  	destinationType: this.camera.DestinationType.DATA_URL,
	  	encodingType: this.camera.EncodingType.JPEG,
	  	mediaType: this.camera.MediaType.PICTURE,
	  	sourceType:2,
	  	correctOrientation:true
	}
	this.camera.getPicture(options).then((imageData) => {
		 let base64Image = 'data:image/jpeg;base64,' + imageData;
		 this.pic = base64Image;
		 this.imageUrl=base64Image;
		 this.uploadButton=true;
	}, (err) => {
	 // alert(JSON.stringify(err));
	});
  }

  	onCapturePicture(){
		const options: CameraOptions = {
		  quality: 50,
		  destinationType: this.camera.DestinationType.DATA_URL,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE,
		  correctOrientation:true
		}
		this.camera.getPicture(options).then((imageData) => {
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			this.pic=base64Image;
			this.imageUrl=base64Image;
			this.uploadButton=true;
		}, (err) => {
		 // Handle error
		});
  	}

  	onUploadImage() {
  		let loading=this.loadingCtrl.create({
  			content:this.translateService.instant('loading'),
  			spinner:'bubbles'
  		})
  		Observable.fromPromise(loading.present())
		let options: FileUploadOptions = {
			fileKey: 'image',
			fileName: 'name.jpeg',
			chunkedMode: false,
		}
		const fileTransfer: FileTransferObject = this.transfer.create();
		fileTransfer.upload(this.imageUrl, 'http://europa.promaticstechnologies.com/audioLibrary/WebServices/updatedUserImage/' + localStorage['user_id'] + '.json', options)
			.then((data) =>
				loading.dismiss().then(() =>  {
					// alert(JSON.stringify(options));
					// alert(JSON.stringify(data));
				this.alertCtrl.create({
					title:this.translateService.instant('message.success'),
					subTitle:this.translateService.instant('accountSettings.imageSuccess'),
					buttons:[{
						text:this.translateService.instant('message.ok'),
						handler:()=>{
							localStorage['image']=this.pic;
							this.events.publish('user:created');
							this.uploadButton=false;
						}
					}]
				}).present()	
			}),(err) => {
					loading.dismiss().then(() =>{
						this.alertCtrl.create({
						title:this.translateService.instant('message.error'),
						subTitle:this.translateService.instant('accountSettings.imageError'),
						buttons:[{
							text:this.translateService.instant('message.ok'),
							handler:()=>{
								this.navCtrl.pop();
							}
						}]
					}).present()
				})
			})
	}

	 onChangePassword(){
	 	this.showChangePassword=false;
	 	this.showChangeName=true;
	 	this.showChangeImage=true;
	 }
	
	 onChangeName(){
	 	this.showChangeName=false;
	 	this.showChangeImage=true;
	 	this.showChangePassword=true;
	 }

	  onChangeImage(){
  		this.showChangeImage=false;
  		this.showChangeName=true;
  		this.showChangePassword=true;
  	  }

	 onSubmit(){
	 	let message={
	 		password:this.accountSettingData.password,
	 		confirmPassword:this.confirm_password
	 	}
	 	let mandatory: string[] = [];
		if (message.password != message.confirmPassword) {
			mandatory.push('Pass')
		}
		if (mandatory.length > 0) {
			this.alertCtrl.create({
					title: this.translateService.instant('mylibrary.alerttitle'),
					message: this.translateService.instant('forgot.paswordconfirmpassword'),
					buttons: ['ok']
				})
				.present()
			return
		}
	 	this.accountSettingData.id=localStorage['user_id'];
	 	let loading = this.loadingCtrl.create({content: this.translateService.instant('loading'),spinner:'bubbles'});
		Observable.fromPromise(loading.present())
		.flatMap(data => this.userDataProvider.editProfile(this.accountSettingData))
		.subscribe(data =>
			loading.dismiss().then(() =>{ 
				this.response=data;
				if (this.response.message=='profile updated successfully') {
					this.alertCtrl.create({
						title:this.translateService.instant('message.success'),
						subTitle:this.translateService.instant('accountSettings.profileSuccess'),
						buttons:[{
							text:this.translateService.instant('message.ok'),
							handler:()=>{
								if (this.accountSettingData.first_name) {
									localStorage['first_name']=this.accountSettingData.first_name;
									this.appProvider.current.firstName=this.accountSettingData.first_name;
									this.events.publish('user:created');
									this.onBack()
								}
								if (this.accountSettingData.last_name) {
									localStorage['last_name']=this.accountSettingData.last_name;
									this.appProvider.current.lastName=this.accountSettingData.last_name;
									this.events.publish('user:created');
									this.onBack()
								}
							}
						}]
					}).present();
				}
				else if(this.response.message=='password updated successfully'){
					this.alertCtrl.create({
						title:this.translateService.instant('message.success'),
						subTitle:this.translateService.instant('accountSettings.passwordSuccess'),
						buttons:[{
							text:this.translateService.instant('message.ok'),
							handler:()=>{
								this.onBack()
							}
						}]
					}).present();
				}
			}),
			error =>
			loading.dismiss().then(() => {})
		);
	 }

	 confirm(){
	   if (this.confirm_password == this.accountSettingData.password) {
	     this.message=false;
	   }
	   else{
	     this.message=true;
	   }
  	}

  	pass_confirm(){
	   if (this.confirm_password) {
	     // code...
	     if (this.confirm_password == this.accountSettingData.password) {
	     this.message=false;
	   }
	   else{
	     this.message=true;
	   }
   	}
   
  }

 onBack(){
  this.navCtrl.setRoot(MyAccount)
 }

}
