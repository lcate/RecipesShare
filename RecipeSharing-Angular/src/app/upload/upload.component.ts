import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { FileService } from '../shared/services/file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @Input() public message!: string;
  @Input() public btnTitle = 'Upload';

  @Output() public onUploadFinished = new EventEmitter();

  public progress!: number;

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }

    const fileToUpload =  files[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.fileService.upload(formData)
    .subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total!);
      }
      else if (event.type === HttpEventType.Response) {
          this.onUploadFinished.emit(event.body);
      }
    });
  }
}
