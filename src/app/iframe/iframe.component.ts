import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class IframeComponent implements AfterViewInit {
  @ViewChild('myIframe') iframeRef!: ElementRef;
  private doc!: Document;

  ngAfterViewInit() {
    const iframe = this.iframeRef.nativeElement as HTMLIFrameElement;
    this.doc = iframe.contentDocument || iframe.contentWindow?.document as Document;

    if (this.doc) {
      this.doc.open();
      this.doc.write(`
        <html>
          <head>
            <style>
              table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
                padding: 8px;
                position: relative;
              }
              /* Để chứa các thanh resize */
              th {
                position: relative;
              }
              /* Thanh resize mặc định ẩn */
              .resize-handle {
                position: absolute;
                top: 0;
                right: 0;
                width: 5px;
                height: 100%;
                cursor: col-resize;
                background-color: transparent;
                z-index: 10;
              }
              /* Thanh resize khi bật sẽ hiện màu xanh */
              .resize-handle.active {
                background-color: #007bff;
              }
            </style>
            <!-- Load jQuery -->
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
          </head>
          <body>
            <table id="myTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Alice</td><td>30</td><td>Hanoi</td></tr>
                <tr><td>Bob</td><td>25</td><td>Saigon</td></tr>
              </tbody>
            </table>

            <script>
              (function($){
                // Hàm bật/tắt resize handle
                window.enableColumnResize = function() {
                  const $table = $('#myTable');
                  // Nếu đã có handle thì không tạo lại
                  if ($table.find('.resize-handle').length > 0) {
                    // Toggle active class để hiện/ẩn
                    $table.find('.resize-handle').toggleClass('active');
                    return;
                  }

                  // Thêm resize handle cho từng th ngoại trừ th cuối cùng
                  $table.find('th').each(function(index, th) {
                    if(index === $table.find('th').length - 1) return; // ko thêm cho cột cuối

                    const $th = $(th);
                    const $handle = $('<div class="resize-handle active"></div>');
                    $th.append($handle);

                    let startX, startWidth;

                    $handle.on('mousedown', function(e) {
                      e.preventDefault();
                      startX = e.pageX;
                      startWidth = $th.width();

                      $(document).on('mousemove.resize', function(e) {
                        const newWidth = startWidth + (e.pageX - startX);
                        if(newWidth > 30) { // giới hạn min width
                          $th.width(newWidth);
                          // Cột tương ứng trong tbody cũng resize
                          const colIndex = $th.index() + 1;
                          $table.find('tbody tr').each(function(){
                            $(this).find('td:nth-child(' + colIndex + ')').width(newWidth);
                          });
                        }
                      });

                      $(document).on('mouseup.resize', function() {
                        $(document).off('.resize');
                      });
                    });
                  });
                }
              })(jQuery);
            </script>
          </body>
        </html>
      `);
      this.doc.close();
    }
  }

  enableResize() {
    // Gọi hàm enableColumnResize trong iframe
    const iframeWindow = (this.iframeRef.nativeElement as HTMLIFrameElement).contentWindow;
    if (iframeWindow && iframeWindow.enableColumnResize) {
      iframeWindow.enableColumnResize();
    }
  }
}
