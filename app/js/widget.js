$(function(){

 var gridster = $(".gridster ul").gridster({
    widget_selector: 'li',
    widget_base_dimensions: [400, 320],
    widget_margins: [5, 5],
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
    resize: {
    	enabled: true,
      max_size: [2, 2]
    }
  }).data('gridster');

  $('.js-seralize').on('click', function() {
      var s = gridster.serialize();

      var rows = [];

      $(s).each(function (delta, item) {
        if (item.row) {

          var order = item.col * item.row

          console.log(order)

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
      $('#log').val(json);
  })
});
