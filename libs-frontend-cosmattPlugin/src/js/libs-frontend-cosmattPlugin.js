'use strict';
(function ($) {
  // add the plugin to the jQuery.fn object
  $.fn.CosmattPlugin = function (params) {
    var $container = $(this);
    var uiStyle = {horizontalAlignment: "center", "height": "expand"};
    var numberFormatter = new Cosmatt.NumberFormatter(params.options.data.numberFormatterOptions);   
    var numberFormatHandler = function(data){      
     return numberFormatter.format(data.data);
    }

    switch (params.type) {
      case "motion-profile":
        $container.motionProfile(params.options.data);
        break;
      case "ts-curve":
       return $container.TSCurve(params.options.data);
        break;
      case "spreadsheet-leonardo":
        $container.spreadsheetLeonardo(params.options.data);
        break;
      case "spreadsheet-DLSleonardo":
        $container.addLeonardoWidget("WB1", {config:params.options.data, events:{'beforeCellRender':numberFormatHandler}, uiStyle:uiStyle});

        break;  
      case "inertia-calculator":
        $container.InertiaCalculator(params.options.data);
        break;
      default:
        console.log("No such plugin exists");
    }
  }
  $.fn.CosmattPopupPlugin = function (params) {
    var $container = $(this);
    // var popupTemplate = `
    // <!-- Modal -->
    // <div class="widget-popup-window">
    //   <div class="popup-header">
    //     <div class="btn-group pull-right float-right">
    //         <button class="btn btn-primary btn-sm popup-close">
    //             <i class='fa fa-times'></i>
    //         </button>
    //         <button class="btn btn-primary btn-sm popup-minimize">
    //             <i class='fa fa-minus'></i>
    //         </button>
    //     </div>
    //   </div>
    //   <div class="popup-body">
    //   </div>
    //   <div class="popup-footer">
    //   </div>
    // </div>
    // `;
    var popupTemplate = '';
    $container.append(popupTemplate);
    $container.prepend('<button type="button" class="btn btn-primary btn-sm popup-btn float-right1 pull-right1"><i class="fa fa-expand"></i></button>');
    
    var $popupWindow = $container.find('.widget-popup-window');
    var $popupBody = $popupWindow.find('.popup-body');

    $container.find('.popup-btn').click(function(e) {
      $popupWindow.show();
      if($popupBody.children().length > 0) {
        return;
      }
      switch (params.type) {
        case "motion-profile":
          $popupBody.motionProfile(params.options.data);
          break;
        case "ts-curve":
          $popupBody.TSCurve(params.options.data);
          break;
        case "assessment":
          $popupBody.assessment(params.options.data);
          break;
        case "spreadsheet-leonardo":
          $popupBody.spreadsheetLeonardo(params.options.data);
          break;
        default:
          console.log("No such plugin exists");
      }
      e.preventDefault();
    });
  
    $popupWindow.find('.popup-close').click(function(e) {
      $popupWindow.hide();
      e.preventDefault();
    });
    $popupWindow.find('.popup-minimize').click(function(e) {
      if($(this).find('i').hasClass('fa-window-maximize')) {
        $(this).find('i').removeClass('fa-window-maximize')
        $popupBody.show();
      } else {
        $(this).find('i').addClass('fa-window-maximize');
        $popupBody.hide();
      }
      e.preventDefault();
    });
    $popupWindow.draggable({
      handle: ".popup-header"
    });
    $popupWindow.resizable({
      alsoResize: $popupBody,
      //aspectRatio: true,
    });
    $popupWindow.hide();
  }
})(jQuery);