import { Component } from '@angular/core';
import { IframeComponent } from './iframe/iframe.component'; // import component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IframeComponent], // thêm ở đây
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iframe-table-app';
}
