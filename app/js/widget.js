$(function(){

  var gridster;

  gridster = $(".gridster ul").gridster({
    widget_base_dimensions: [100, 55],
    widget_margins: [5, 5]
  }).data('gridster');


  $('.js-seralize').on('click', function() {
      var s = gridster.serialize();

      $('#log').val(JSON.stringify(s));
  })

});
