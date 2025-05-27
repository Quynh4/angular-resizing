import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class IframeComponent implements AfterViewInit {
  @ViewChild('myIframe') iframeRef!: ElementRef;

  ngAfterViewInit() {
    const iframe = this.iframeRef.nativeElement as HTMLIFrameElement;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (doc) {
      doc.open();
      doc.write(`
        <html>
          <head>
            <style>
              table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
                padding: 8px;
              }
            </style>
          </head>
          <body>
            <script>
              const table = document.createElement('table');
              const header = table.insertRow();
              ['Name', 'Age', 'City'].forEach(text => {
                const th = document.createElement('th');
                th.innerText = text;
                header.appendChild(th);
              });

              const data = [['Alice', 30, 'Hanoi'], ['Bob', 25, 'Saigon']];
              data.forEach(rowData => {
                const row = table.insertRow();
                rowData.forEach(cell => {
                  const td = document.createElement('td');
                  td.innerText = cell;
                  row.appendChild(td);
                });
              });

              document.body.appendChild(table);
            <\/script>
          </body>
        </html>
      `);
      doc.close();
    }
  }
}
