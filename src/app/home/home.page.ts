import { Component } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  pdfURL: any;

  constructor(private transfer: FileTransfer, private file: File, private iab: InAppBrowser,
    private document: DocumentViewer, private fileOpener: FileOpener) { }

  fileDownload() {
    const url = 'http://files.srpc.com/publications/ariyadiyah/data/ARR.pdf';
    const fileTransfer = this.transfer.create();
    const options: DocumentViewerOptions = {
      title: ''
    }

    fileTransfer.onProgress((progressEvent) => {
      var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
      console.log(perc);
    });

    this.file.listDir(this.file.dataDirectory, '').then(results => {
      console.log(results);
    });

    //this.iab.create(this.file.dataDirectory + "sample.pdf");
    //this.document.viewDocument(this.file.dataDirectory + "sample.pdf", 'application/pdf', options);

    this.fileOpener.open(this.file.dataDirectory + "sample.pdf", 'application/pdf')
    .then((results) => console.log('File is opened' + results))
    .catch(e => console.log('Error opening file', e));

    fileTransfer.download(url, this.file.dataDirectory + 'sample.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.fileOpener.open(entry.toURL(), 'application/pdf')
        .then((results) => console.log('File is opened' + results))
        .catch(e => console.log('Error opening file', e));
    }, (error) => {
      console.log(error);
    });
  }

}
