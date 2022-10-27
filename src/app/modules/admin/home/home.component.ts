import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { HomeModel } from './home.model';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  data$: Observable<HomeModel>;
  isReady: boolean = false;
  formData: UntypedFormGroup;
  imageSrc: string | ArrayBuffer;
  private _fileToUpload: FormData;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _homeService: HomeService,
  ) { }

  /**
   * On init
   */
  ngOnInit(): void {
    this.initialFormData();
    this.data$ = this._homeService.data$;
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  onFileSelected(event) {
    // Convert file to FormData
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this._fileToUpload = new FormData();
      var file = new File([event.target.files[0]], event.target.files[0].name);
      console.log(file);
      this._fileToUpload.append('image', file);
    });
    // Image preview
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.imageSrc = event.target.result;
    }
  }

  postData() {
    if (this.formData.valid) {
      this._homeService.postData(this._fileToUpload).subscribe((result) => {
        console.log(result);
      })
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  private convertFile(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    console.log(result);
    return result;
  }

  private initialFormData() {
    this.formData = this._formBuilder.group({
      image: ['', Validators.required]
    });
    this.formData.valueChanges.subscribe(() => {
      if (this.formData.valid) {
        this.isReady = true;
      }
    })
  }

}
