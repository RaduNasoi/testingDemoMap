import {Injectable} from "@angular/core";
import {Response, Http, ResponseContentType} from "@angular/http";
import {ImageModel} from "./image.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ImageService {
  constructor(private http: Http) {
  }


  ngOnInit() {

  }

  // uploadImage(formdata: any) {
  //   let url:string = 'http://localhost/myProfile.html';
  //   return this.http.post(url, formdata).catch(this.errorHandler);
  // }
  // private errorHandler(error: Response){
  //   console.log("Error occured: "+ error);
  //   return Observable.throw(error || "Some Error on Server Occured");
  //
  // }

  getImage(username:string): Observable<File> {

    //console.log("get");


    return this.http.get(`/api/getImage?uploader=${username}`,
      { responseType: ResponseContentType.Blob })
      .map((response: Response) => response.blob());

  }


}
