(function ($) {

    // add the plugin to the jQuery.fn object
    $.fn.unitsComboBox = function (options) {
        // default values 
        var defaults = {
            "unitType": "",
            "unit": "",
            "roundOfNumber": "",
            "value": "",
            "show": "true",
            "enable": {
                "textbox": "true",
                "comboBox": "true"
            },
            "comboBoxWidthRatio": {
                "textBox": "60%",
                "comboBox": "40%"
            },
            "step": "0.1",
            "dataRule": "currency",
            "userEnteredValue":"",
            "userEnteredUnit":"",
            "numberFormatterOptions": {
            },
            callBackFn: function () { }
        }

        // current instance of the object
        var plugin = this;
        var timerId = 0;
        plugin.settings = {}
        var $element = $(this); // reference to the jQuery version of DOM element  
        // the plugin's final properties are the merged default and
        plugin.settings = $.extend({}, defaults, options);
        var numberFormatter = new Cosmatt.NumberFormatter(plugin.settings.numberFormatterOptions);

        // the "constructor" method that gets called when the object is created
        plugin.init = function () {

            // function is called to intialze dom element
            createComboBox(plugin.settings.unitType);

        }

        /** public function to update plugin contols based on inputs  **/
        plugin.update = function (options) {
            var newOptions = $.extend({}, plugin.settings, options);

            $element.find('.cosmatt-unitComboBox')[newOptions.show == 'true' ? 'show' : 'hide']();

            newOptions.enable.textbox == 'true' ? $element.find('.cosmatt-unitComboBox').find('input').removeAttr('disabled') :
                $element.find('.cosmatt-unitComboBox').find('input').attr('disabled', 'disabled');

            newOptions.enable.comboBox == 'true' ? $element.find('.cosmatt-unitComboBox').find('.btn-group').find('button').removeAttr('disabled') :
                $element.find('.cosmatt-unitComboBox').find('.btn-group').find('button').attr('disabled', 'disabled');

            $element.find('.cosmatt-unitComboBox').find('.unitTextBox')[newOptions.showComboBoxOnly == 'true' ? 'hide' : 'show']();

            $element.find('.cosmatt-unitComboBox').find('.unitComboBox')[newOptions.showTextBoxOnly == 'true' ? 'hide' : 'show']();
        };

        /** public function return SI value for provided unit type **/
        plugin.getSIValue = function () {

            var textboxValue = 0;
            var SIUnitObj = '';
            if (typeof COSMATT.UNITCONVERTER === 'object') {
                SIUnitObj = COSMATT.UNITCONVERTER.getSIUnit(plugin.settings.unitType);

                //textboxValue = $element.find(".amount_" + plugin.settings.unitType).val();
                var convertedVal = COSMATT.UNITCONVERTER.getUnitConvertedValue(plugin.settings.unitType, plugin.settings.value, plugin.settings.unit, SIUnitObj.id);

                return convertedVal;
            }
        };

        /** public function return value in selected unit type from dropdown **/
        plugin.getValueInSelectedUnit = function (siVal) {



            // var textboxValue = 0;
            var SIUnitObj = '';
            if (typeof COSMATT.UNITCONVERTER === 'object') {
                SIUnitObj = COSMATT.UNITCONVERTER.getSIUnit(plugin.settings.unitType);

                // textboxValue = $element.find(".amount_" + plugin.settings.unitType).val();
                var convertedVal = COSMATT.UNITCONVERTER.getUnitConvertedValue(plugin.settings.unitType, siVal, SIUnitObj.id, plugin.settings.unit);
                return convertedVal;
            }
        };

        /** public function return SI value for provided unit type **/
        plugin.getConversionFactor = function () {

            var textboxValue = 0;
            var conversionfactor = '';
            if (typeof COSMATT.UNITCONVERTER === 'object') {
                conversionfactor = COSMATT.UNITCONVERTER.getConversionFactor(plugin.settings.unitType, plugin.settings.unit);

            }
            return conversionfactor;
        };
        /** public function set DropBox Item **/
        plugin.setDropBoxItem = function (optionId) {

            $element.find('.dropdown-menu a').filter(function (ele, option) {
                $element.find('a.selected').removeClass('selected');
                return $(option).data('id') == optionId;
            }).addClass("selected");

            $element.find('button.boxSelectedVal').text($element.find('a.selected').text());


            var textboxValue = 0;
            textboxValue = plugin.settings.value;
            if (textboxValue === '') {
                plugin.setTextBoxValue(textboxValue);
                plugin.settings.unit = $element.find('a.selected').data('id');
                return;
            }

            if (plugin.settings.showComboBoxOnly == 'true') {
                var convertedVal = COSMATT.UNITCONVERTER.getUnitConvertedValue(plugin.settings.unitType, 1, plugin.settings.unit, $element.find('a.selected').data('id'));
            } else {
                var convertedVal = COSMATT.UNITCONVERTER.getUnitConvertedValue(plugin.settings.unitType, textboxValue, plugin.settings.unit, $element.find('a.selected').data('id'));
            }

            // conversionfactor = COSMATT.UNITCONVERTER.getConversionFactor(plugin.settings.unitType, $(this).val());

            plugin.settings.unit = $element.find('a.selected').data('id');
            plugin.settings.userEnteredUnit = plugin.settings.unit; 
            plugin.setTextBoxValue(convertedVal);
        }
        /** public function to set Value in SI unit **/
        plugin.setSIValue = function (value) {
            var SIUnit = COSMATT.UNITCONVERTER.getSIUnit(plugin.settings.unitType);
            var currentValue = COSMATT.UNITCONVERTER.getUnitConvertedValue(plugin.settings.unitType, value, SIUnit.id, plugin.settings.unit);

            plugin.setTextBoxValue(currentValue);
        }
        /** public function set TextboxValue **/
        plugin.setTextBoxValue = function (value) {

            var stringToNum;

            if (value === '') {
                stringToNum = value;
            } else {
                stringToNum = Number(value);
            }
            plugin.settings.value = value;

            /** Update the stored values if we update dynamically textbox value from x to y **/
            if(plugin.settings.userEnteredUnit === plugin.settings.unit){
                saveUserEnteredData();
            }
            

            plugin.formatTextBoxValue(value);
            // if (plugin.settings.roundOfNumber !== '' && stringToNum !== '') {
            //   // stringToNum = (stringToNum).toFixed(plugin.settings.roundOfNumber);
            //   // stringToNum = (stringToNum).toFixed(plugin.settings.roundOfNumber);
            //   var decimalPlaces = Math.pow(10, plugin.settings.roundOfNumber);
            //   stringToNum = Math.round(stringToNum * decimalPlaces) / decimalPlaces;
            // }

            //$element.find(".amount_" + plugin.settings.unitType).val(stringToNum);
            //$element.find(".amount_" + plugin.settings.unitType).attr('title', plugin.settings.value);
        };
        plugin.formatTextBoxValue = function (value) {
            if ($element.find(".unitTextBox input").is(":focus")) {
                console.log("input has focus, don't format")
                return;
            }
            if (numberFormatter) {
                value = numberFormatter.format(value, true);
            }
            $element.find(".amount_" + plugin.settings.unitType).val(value);
        };
        /* private method
         *  createComboBox functions is responsible to create dopdown,textbox and attache event handler 
         *  input value TIME or ANGULARACCELERATION or MASS etc 
         */
        var createComboBox = function (unitType) {

            var callbackData = {};
            try {
                if (typeof COSMATT.UNITCONVERTER === 'object' && unitType != '') {
                    var dropDownOptions = COSMATT.UNITCONVERTER.getunitsAndIds(unitType);
                    //var UNITSI = COSMATT.UNITCONVERTER.getSIUnit(unitType);

                    var $unitWrapper = $('<div class="cosmatt-unitComboBox"></div>');
                    $element.append($unitWrapper);


                    var $textboxContainer = $('<div class="unitTextBox"></div>');
                    $unitWrapper.append($textboxContainer);


                    var $spinControlWrap = $('<div class="input-group unitComboBoxGrp"></div>');
                    $textboxContainer.append($spinControlWrap);


                    if (plugin.settings.mode == 'spin') {

                        $spinControlWrap.addClass("spinner");

                        $spinControlWrap.attr('data-trigger', 'spinner');

                        var $inputBox = $('<input type="text" class="form-control text-left spin-control amount_' + plugin.settings.unitType + '" value="" data-rule="' + plugin.settings.dataRule + '"></div>');
                        $spinControlWrap.append($inputBox);

                        $inputBox.attr('data-step', plugin.settings.step);
                        var $inputGroup = $('<div class="input-group-addon"></div>');
                        $spinControlWrap.append($inputGroup);

                        var $spinUp = $('<a href="javascript:;" class="spin-up" data-spin="up"><i class="fa fa-caret-up"></i></a>');
                        $inputGroup.append($spinUp);

                        var $spinDown = $(' <a href="javascript:;" class="spin-down" data-spin="down"><i class="fa fa-caret-down"></i></a>');
                        $inputGroup.append($spinDown);

                    }
                    else {
                        $spinControlWrap.addClass("defaultTextBox");

                        var $inputBox = $('<input type="text" class="form-control text-left input-control amount_' + plugin.settings.unitType + '" value="" data-rule="' + plugin.settings.dataRule + '"></div>');
                        $spinControlWrap.append($inputBox);
                    }

                    plugin.setTextBoxValue(plugin.settings.value);

                    if (plugin.settings.max != undefined) {
                        $inputBox.attr('max', plugin.settings.max);
                    }
                    else {
                        $inputBox.attr('max', '9999999999');
                    }
                    if (plugin.settings.min != undefined) {
                        $inputBox.attr('min', plugin.settings.min);
                    }
                    else {
                        $inputBox.attr('min', '0');
                    }

                    /***********************Drop Box*************************/
                    for (var loop1 = 0; loop1 < dropDownOptions.length; loop1++) {
                        if (plugin.settings.unit == dropDownOptions[loop1].id) {
                            var selectedUnit = dropDownOptions[loop1].name;
                            var selectedUnitId = dropDownOptions[loop1].id;
                        }
                    }

                    var $unitDropDown = $('<div class="unitComboBox"></div>');
                    $unitWrapper.append($unitDropDown);

                    var $buttonGrp = $('<div class="btn-group"></div>');
                    $unitDropDown.append($buttonGrp);

                    var $btnSecondary = $('<button type="button" data-toggle="dropdown" class="btn btn-default boxSelectedVal" id="comboBox' + plugin.settings.unitType + '">' + selectedUnit + '</button>');
                    $buttonGrp.append($btnSecondary);

                    var $toggleButton = $('<button type="button" data-toggle="dropdown" class="btn btn-default dropdown-toggle"><span class="caret"></span></button>');
                    $buttonGrp.append($toggleButton);

                    var $menuItems = $('<ul class="dropdown-menu"></ul>');
                    $buttonGrp.append($menuItems);

                    for (var loop = 0; loop < dropDownOptions.length; loop++) {
                        var $list = $('<li></li>');
                        $menuItems.append($list);
                        var option = $('<a class="dropdown-item">' + dropDownOptions[loop].name + '</a>');
                        option.data('id', dropDownOptions[loop].id);
                        $list.append(option);
                    }

                    $textboxContainer.css('width', plugin.settings.comboBoxWidthRatio.textBox);
                    $unitDropDown.css('width', plugin.settings.comboBoxWidthRatio.comboBox);

                    $element.find('.dropdown-menu a').filter(function (ele, option) {
                        return $(option).data('id') == plugin.settings.unit;
                    }).addClass("selected");


                    plugin.settings.unit = selectedUnitId;
                    initializeComboBoxControl();
                    initializeTextBoxControl();
                    plugin.update({});
                    plugin.settings.SIValue = plugin.getSIValue({});
                    if (typeof plugin.settings.callBackFn == 'function') { // make sure the callback is a function    

                        callbackData.unit = plugin.settings.unit;
                        callbackData.SIValue = plugin.settings.SIValue;
                        plugin.settings.callBackFn.call(callbackData); // brings the scope to the callback
                    }
                }
            } catch (errorMessage) {
                console.log('Error : ' + errorMessage);
            }
        };


        /** Combo box event handler **/

        var initializeComboBoxControl = function () {
            var textboxValue = 0;
            var callbackData = {};

            $element.find('.dropdown-menu a').bind("mousedown", function (event) {

                textboxValue = plugin.settings.value;

                if (textboxValue === '') {
                    plugin.setTextBoxValue(textboxValue);
                    plugin.settings.unit = $(this).data('id');
                    return;
                }

                if (plugin.settings.showComboBoxOnly == 'true') {
                    var convertedVal = COSMATT.UNITCONVERTER.getUnitConvertedValue(plugin.settings.unitType, 1, plugin.settings.unit, $(this).data('id'));
                }
                else {                    
                    /**Added a check if stored unit is equal to current selected unit to fixed the issue COSMATT-1479 **/                   
                    if(plugin.settings.userEnteredUnit === $(this).data('id')){
                      plugin.setTextBoxValue(plugin.settings.userEnteredValue);
                    }
                    else{
                      var convertedVal = COSMATT.UNITCONVERTER.getUnitConvertedValue(plugin.settings.unitType, textboxValue, plugin.settings.unit, $(this).data('id'));
                    }  
                    
                }

                plugin.settings.unit = $(this).data('id');

                $element.find('button.boxSelectedVal').text($(this).text());
                if (convertedVal != undefined) {
                    plugin.setTextBoxValue(convertedVal);
                }


                if (typeof plugin.settings.callBackFn == 'function') { // make sure the callback is a function    


                    callbackData.unit = plugin.settings.unit;
                    callbackData.value = plugin.settings.value;
                    callbackData.SIValue = plugin.getSIValue({});
                    callbackData.type = "dropdown";
                    plugin.settings.callBackFn.call(callbackData); // brings the scope to the callback
                }
            });

        }

        var saveUserEnteredData = function(){
            
            plugin.settings.userEnteredValue = plugin.settings.value;
            plugin.settings.userEnteredUnit = plugin.settings.unit; 
        }

        /** Text box event handler **/

        var initializeTextBoxControl = function () {

            /** Stored the textbox value and selected unit when unitcombo box is initialized **/
            saveUserEnteredData();

            $element.find(".unitTextBox input").on('focus', function () {

                $(this).val(plugin.settings.value)
            });
            $element.find(".unitTextBox input").on('blur', function () {

                plugin.setTextBoxValue(plugin.settings.value);
            });
            $element.find(".unitTextBox input.input-control").on('input', function () {

                var self = this;
                plugin.settings.value = $(self).val();
                /** Update the stored values if user trying to change tetxbox value from x to y **/
                saveUserEnteredData();

                var $pluginObj = $element
                var callbackData = {};

                if (timerId > 0) {
                    clearTimeout(timerId);
                }

                timerId = setTimeout((function () {

                    if (typeof plugin.settings.callBackFn == 'function') { // make sure the callback is a function    

                        callbackData.value = plugin.settings.value;
                        callbackData.unit = plugin.settings.unit;
                        callbackData.type = "textbox";
                        callbackData.SIValue = plugin.getSIValue();

                        plugin.settings.callBackFn.call(callbackData); // brings the scope to the callback
                    }

                }), 800);


            });
            if (plugin.settings.mode == 'spin') {
                $element.find(".unitComboBoxGrp").spinner('changing', function (e, newVal, oldVal) {

                    var self = this;
                    plugin.settings.value = newVal;                  
                    /** Update the stored values if user trying to change spin control value from x to y **/
                    saveUserEnteredData();                 
                    var $pluginObj = $element
                    var callbackData = {};

                    if (typeof plugin.settings.callBackFn == 'function') { // make sure the callback is a function
                        callbackData.value = plugin.settings.value;
                        callbackData.unit = plugin.settings.unit;
                        callbackData.type = "textbox";
                        callbackData.SIValue = plugin.getSIValue();

                        plugin.settings.callBackFn.call(callbackData); // brings the scope to the callback
                    }
                });

            }


        };


        // call the "constructor" method
        plugin.init();
        $(this).data('unitsComboBox', plugin);
    }

})(jQuery);