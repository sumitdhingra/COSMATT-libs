//import { NumberFormatter } from "../../../number-formatter/src/NumberFormatter/NumberFormatter";
//import { INumberFormatterOptions } from "../../../number-formatter/src/NumberFormatter/INumberFormatterOptions";

declare var jQuery: any;
declare var Leonardo: any;
declare var Cosmatt: any;
declare var window: any;

(function ($) {
  $.fn.spreadsheetLeonardo = function (options: any) {
    var settings = $.extend({}, options);
    var self = this;
    self.append('<div class="leonardo-plugin"></div>');
    var $leonardoPlugin = this.find('.leonardo-plugin');
    if (settings.style != undefined) {
      //$leonardoPlugin.css("width",'inherit' );
      $leonardoPlugin.css("height", settings.style.height);
      $leonardoPlugin.css("text-align", 'center');
    }
    var valueRenderer = function(input: any) {
      return numberFormatter.format(input, true);
    }
    var numberFormatter = new Cosmatt.NumberFormatter(settings.numberFormatterOptions || {});
    var eventHandlers = { beforeValueRender: valueRenderer }
    window.setTimeout(function () {
      Leonardo.scripts.add($leonardoPlugin[0], settings.config, settings.correctData, eventHandlers);
      $leonardoPlugin.on('resize', function () {
        var $btnContainer = self.find(".btn-container");
        if ($btnContainer.length) {
          $btnContainer.css({
            'width': $leonardoPlugin.find('.DLSLeonardo #grid').outerWidth()
          });
        }
      });
      $leonardoPlugin[0].addEventListener("keyup", function (e: any) {
        assessmentNotifier();
      }, true);
      $leonardoPlugin[0].addEventListener("mouseup", function (e: any) {
        assessmentNotifier();
      }, true);
    }, 0);

    var assessmentNotifier = function () {
      if (settings.assessmentCallback) {
        settings.assessmentCallback({
          "configData": {
            "value": JSON.stringify(Leonardo.scripts.getData($leonardoPlugin[0])),
            "unit": ""
          }
        });
      }
    }


    var updateSheet = function (params: any) {
      if (params && params.configData) {
        Leonardo.scripts.updateData($leonardoPlugin[0], JSON.parse(params.configData.value));
      }
    }

    var markAnswers = function (params: any) {
      Leonardo.scripts.checkAnswer($leonardoPlugin[0], settings.correctData);
    }

    var resetAnswers = function (params: any) {
      Leonardo.scripts.reset($leonardoPlugin[0]);
    }

    var clearGrades = function (params: any) {
      Leonardo.scripts.tryAgain($leonardoPlugin[0]);
    }
    return {
      ref: this,
      updateSheet: updateSheet,
      markAnswers: markAnswers,
      resetAnswers: resetAnswers,
      clearGrades: clearGrades
    };
  };
}(jQuery));



