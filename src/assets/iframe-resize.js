
(function($){
  window.enableColumnResize = function() {
    const $table = $('#myTable');
    if ($table.find('.resize-handle').length > 0) {
      $table.find('.resize-handle').toggleClass('active');
      return;
    }

    $table.find('th').each(function(index, th) {
      if(index === $table.find('th').length - 1) return;

      const $th = $(th);
      const $handle = $('<div class="resize-handle active"></div>');
      $th.append($handle);

      let startX;

      $handle.on('mousedown', function(e) {
        e.preventDefault();
        startX = e.pageX;

        const $leftTh = $th;
        const $rightTh = $th.next('th');

        const leftStartWidth = $leftTh.width();
        const rightStartWidth = $rightTh.width();

        $(document).on('mousemove.resize', function(e) {
          const deltaX = e.pageX - startX;

          let newLeftWidth = leftStartWidth + deltaX;
          let newRightWidth = rightStartWidth - deltaX;

          const minWidth = 30;
          if (newLeftWidth < minWidth) {
            newLeftWidth = minWidth;
            newRightWidth = leftStartWidth + rightStartWidth - minWidth;
          } else if (newRightWidth < minWidth) {
            newRightWidth = minWidth;
            newLeftWidth = leftStartWidth + rightStartWidth - minWidth;
          }

          $leftTh.width(newLeftWidth);
          $rightTh.width(newRightWidth);

          const leftIndex = $leftTh.index() + 1;
          const rightIndex = $rightTh.index() + 1;

          $table.find('tbody tr').each(function() {
            $(this).find('td:nth-child(' + leftIndex + ')').width(newLeftWidth);
            $(this).find('td:nth-child(' + rightIndex + ')').width(newRightWidth);
          });
        });

        $(document).on('mouseup.resize', function() {
          $(document).off('.resize');
        });
      });
    });
  }
})(jQuery);
