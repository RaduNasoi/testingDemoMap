import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UploadMetadata} from "angular2-image-upload";
import {ImageService} from "./image.service";
import {ImageModel} from "./image.model";
import {Http, RequestOptions} from "@angular/http";
import {isNullOrUndefined} from "util";
import {UserService} from "../user.service";
import {User} from "../user.model";

declare var Blob: {
  prototype: Blob;
  new (): Blob;
  new (request: any, mime: string): Blob;
}

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})


export class MyprofileComponent implements OnInit {
  private isImageinDB: boolean;
  private selectedFile: File = null;
  private imageToShow: any;
  private isImageLoading: boolean;
  private users:User[]=[];
  private user:User;

  //@ViewChild('myProfile') username: string;

  constructor(private imageService: ImageService, private http: Http, private userService: UserService) {

    //console.log("--------------------------------------------------> "+localStorage.getItem("userProfile").toString());
    this.userService.getUsers().subscribe(user => {

      this.users=user;
      //console.log(this.users);
        for(let u of this.users){

        if(u.username == localStorage.getItem("username").toString()){
          this.user = u;

        }

          // this.userService.getUserByUsername(localStorage.getItem("username").toString())
          //   .subscribe(
          //     user => {
          //
          //       console.log("---------------> "+this.user.accountCreated);
          //       user.accountCreated = this.user.accountCreated
          //     });



        }
    });

  }


  ngOnInit() {

    if (this.getImageFromService() != undefined || this.getImageFromService() != null) {
      this.imageToShow = this.getImageFromService();

    }
    else {
      this.isImageLoading = false;

    }




  }


  onFileSelected(event) {


    this.selectedFile = event.target.files[0];
    //console.log("-----------------------> " + this.selectedFile.name);
  }

  onUpload() {

    let options = new RequestOptions();

    let formData = new FormData();
    formData.append("file", this.selectedFile, this.selectedFile.name);


    this.http.post(`/api/addImage/?file=${this.selectedFile}&uploader=${localStorage.getItem("username").toString()}`,
      formData, options).subscribe(res => {
      console.log(res);

    })


    this.getImageFromService();

    location.reload();
  }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;

    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }


  }

  getImageFromService() {
    var username:string = localStorage.getItem("username").toString();
    this.isImageLoading = true;
    this.imageService.getImage(username).subscribe(data => {
      this.createImageFromBlob(data);

      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });


  }



}
