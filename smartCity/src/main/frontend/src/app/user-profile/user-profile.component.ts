import {Component, OnInit} from '@angular/core';
import {Http, RequestOptions} from "@angular/http";
import {ImageService} from "../myprofile/image.service";
import {UserService} from "../user.service";
import {User} from "../user.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private isImageinDB: boolean;
  private selectedFile: File = null;
  private imageToShow: any;
  private isImageLoading: boolean;
  private users: User[];
  private userProfile: User;

  //@ViewChild('myProfile') username: string;

  constructor(private imageService: ImageService, private http: Http, private userService: UserService) {

    //console.log("--------------------------------------------------> "+localStorage.getItem("userProfile").toString());

  }


  ngOnInit() {

    //console.log("**********************" +this.getImageFromService());
    //console.log("----> "+localStorage.getItem("userProfile").toString())
    if (this.getImageFromService() != undefined || this.getImageFromService() != null) {
      this.imageToShow = this.getImageFromService();

    }
    else {
      this.isImageLoading = false;

    }

    this.userService.getUsers().subscribe(user => {

      this.users = user;
      console.log(this.users);
      for (let u of this.users) {

        if (u.username == JSON.parse(localStorage.getItem("userProfile").toString())) {
          this.userProfile = u;

        }


      }


    });


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
    var username: string = JSON.parse(localStorage.getItem("userProfile").toString());
    //console.log("}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}} "+ username);
    this.isImageLoading = true;
    if (this.imageService.getImage(username) != null) {
      this.imageService.getImage(username).subscribe(data => {
        this.createImageFromBlob(data);

        this.isImageLoading = false;
      }, error => {
        this.isImageLoading = false;
        console.log(error);
      });
    }


  }
}
