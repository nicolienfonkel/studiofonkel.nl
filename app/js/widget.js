$(function(){

var width = $('.site').width() / 2

 var gridster = $(".gridster ul").gridster({
    widget_selector: 'li',
    widget_base_dimensions: [width, width * .6],
    widget_margins: [10, 10],
    max_cols: 2,
    min_cols: 2,
    max_size_x: 2,
    min_rows: 2,
    serialize_params: function($w, wgd) {
        return {
            col: wgd.col,
            row: wgd.row,
            url: $(wgd.el).data('url'),
            size_x: wgd.size_x,
            size_y: wgd.size_y,
        };
    },
    draggable: {
      stop: function() {
        $('.save').css('visibility', 'visible');
      }
    },
    resize: {
    	enabled: true,
      max_size: [2, 2],
      stop: function() {
        $('.save').css('visibility', 'visible');
      }
    }
  }).data('gridster');

  $('#reset').on('click', function() {
    location.reload();
  })

  $('#save-frontpage').on('click', function() {
    $('.save .loader').css('display', 'block');
      var s = gridster.serialize();

      var rows = [];

      $(s).each(function (delta, item) {
        if (item.row) {

          var order = item.col * item.row

          item.order = order

          rows.push(item.row);
        }
      })

      var max = Math.max.apply( null, rows );

      var returnObject = {
        items: s,
        height: max
      }

      var json = JSON.stringify(returnObject)

      $.ajax({
        type: "POST",
        url: 'http://localhost:3003',
        data: {
          'json': json
        },
        success: function () {
          alert('Yo')
        },
        dataType: 'json'
      });

      return false
  })
});
