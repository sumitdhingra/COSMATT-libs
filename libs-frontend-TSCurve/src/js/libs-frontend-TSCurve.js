'use strict';

(function ($) {

    $.fn.TSCurve = function (options) {

        var $container = $(this);

        var defaults = {
            showApplicationPoints: false,
            motorSelectedIndex: 3,
            rmsPoints: [1200, 5.9],
            peakPoints: [1200, 9.4],
            peakAcceData: 1478,
            rmsAcceData: 1097,
            quadrant: 1,
            transmissionRaioVal: 1,
            openAppReqPanel: false,
            openTransmPanel: true,
            temperature: 40,
            altitude: 0,
            sliderLimit: {
                peakMaxSpeed: 800,
                peakMaxTorque: 100,
                rmsMaxSpeed: 800,
                rmsMaxTorque: 100,
                maxTemp: 125,
                maxAltitude: 10000,
                maxVoltage: 10,
                maxTrRatio: 1000
            },
            showQuadrantToggle: true,
            showMotorTsCurve: true,
            showMotorSelForm: true,
            showAppPointsForm: true,
            showEnviorForm: true,
            showTransmissionForm: true,
            uniqeId: '1',
            xaxisMaxVale: 12000000,
            sequenceIndex: '0',
            transmTextChange: false,
            graphLineColor: {
                "peakTSCurve": "#FF0808",
                "contionusTSCurve": "#9ADC54"
            },
            motorCheckedIndex: [],
            motorData: [{
                "motorPartNo": "CPB-1-01",
                "drivePartNo": "CB-250",
                "voltage": "480",
                "continuousStallTorque": 1.0,
                "peakStallTorque": 2.70,
                "rollOffPoint": 2.70,
                "peakTorqueAtMaxSpeed": 1.8,
                "continuosTorqueAtMaxSpeed": 0.72,
                "rollOffSpeed": 3200,
                "maxSpeed": 4500,
                "temp": 40,
                "altitude": 1,
                "motorInertia": 0.00001
            }, {
                "motorPartNo": "CPB-1-02",
                "drivePartNo": "CB-250",
                "voltage": "480",
                "continuousStallTorque": 1.7,
                "peakStallTorque": 4.40,
                "rollOffPoint": 4.40,
                "peakTorqueAtMaxSpeed": 2.4,
                "continuosTorqueAtMaxSpeed": 1.302,
                "rollOffSpeed": 3300,
                "maxSpeed": 5000,
                "temp": 40,
                "altitude": 1,
                "motorInertia": 0.000015
            }, {
                "motorPartNo": "CPB-1-03",
                "drivePartNo": "CB-250",
                "voltage": "480",
                "continuousStallTorque": 2.3,
                "peakStallTorque": 7.50,
                "rollOffPoint": 7.50,
                "peakTorqueAtMaxSpeed": 4.2,
                "continuosTorqueAtMaxSpeed": 1.71,
                "rollOffSpeed": 3100,
                "maxSpeed": 4500,
                "temp": 40,
                "altitude": 1,
                "motorInertia": 0.000025
            }, {
                "motorPartNo": "CPB-2-01",
                "drivePartNo": "CB-250",
                "voltage": "480",
                "continuousStallTorque": 2.0,
                "peakStallTorque": 3.8,
                "rollOffPoint": 3.8,
                "peakTorqueAtMaxSpeed": 2.0,
                "continuosTorqueAtMaxSpeed": 1.7,
                "rollOffSpeed": 4000,
                "maxSpeed": 6000,
                "temp": 40,
                "altitude": 1,
                "motorInertia": 0.000065
            }, {
                "motorPartNo": "CPB-2-02",
                "drivePartNo": "CB-250",
                "voltage": "480",
                "continuousStallTorque": 3.4,
                "peakStallTorque": 7.8,
                "rollOffPoint": 7.8,
                "peakTorqueAtMaxSpeed": 4.0,
                "continuosTorqueAtMaxSpeed": 3.09,
                "rollOffSpeed": 4400,
                "maxSpeed": 6000,
                "temp": 40,
                "altitude": 1,
                "motorInertia": 0.00008
            }, {
                "motorPartNo": "CPB-2-03",
                "drivePartNo": "CB-250",
                "voltage": "480",
                "continuousStallTorque": 4.2,
                "peakStallTorque": 11.0,
                "rollOffPoint": 11.0,
                "peakTorqueAtMaxSpeed": 6.0,
                "continuosTorqueAtMaxSpeed": 2.9,
                "rollOffSpeed": 3100,
                "maxSpeed": 5000,
                "temp": 40,
                "altitude": 1,
                "motorInertia": 0.00012
            }, {
                "motorPartNo": "CPB-3-01",
                "drivePartNo": "CB-250",
                "voltage": "480",
                "continuousStallTorque": 9.0,
                "peakStallTorque": 21.0,
                "rollOffPoint": 21.0,
                "peakTorqueAtMaxSpeed": 13.0,
                "continuosTorqueAtMaxSpeed": 6.3,
                "rollOffSpeed": 3200,
                "maxSpeed": 4000,
                "temp": 40,
                "altitude": 1,
                "motorInertia": 0.0004
            }, {
                "motorPartNo": "CPB-3-02",
                "drivePartNo": "CB-250",
                "voltage": "480",
                "continuousStallTorque": 10.0,
                "peakStallTorque": 29.0,
                "rollOffPoint": 29.0,
                "peakTorqueAtMaxSpeed": 16.0,
                "continuosTorqueAtMaxSpeed": 6.91,
                "rollOffSpeed": 2500,
                "maxSpeed": 3500,
                "temp": 40,
                "altitude": 1,
                "motorInertia": 0.0006
            }, {
                "motorPartNo": "CPB-4-01",
                "drivePartNo": "CB-250",
                "voltage": "480",
                "continuousStallTorque": 20.0,
                "peakStallTorque": 50.0,
                "rollOffPoint": 50.0,
                "peakTorqueAtMaxSpeed": 25.0,
                "continuosTorqueAtMaxSpeed": 15.3,
                "rollOffSpeed": 1800,
                "maxSpeed": 3000,
                "temp": 40,
                "altitude": 1,
                "motorInertia": 0.0015
            }, {
                "motorPartNo": "CPB-4-02",
                "drivePartNo": "CB-250",
                "voltage": "480",
                "continuousStallTorque": 25.0,
                "peakStallTorque": 68.0,
                "rollOffPoint": 68.0,
                "peakTorqueAtMaxSpeed": 30.0,
                "continuosTorqueAtMaxSpeed": 17.53,
                "rollOffSpeed": 1900,
                "maxSpeed": 3000,
                "temp": 40,
                "altitude": 1,
                "motorInertia": 0.0022
            }, {
                "motorPartNo": "CPB-4-03",
                "drivePartNo": "CB-250",
                "voltage": "480",
                "continuousStallTorque": 32.0,
                "peakStallTorque": 75.0,
                "rollOffPoint": 75.0,
                "peakTorqueAtMaxSpeed": 32.0,
                "continuosTorqueAtMaxSpeed": 22.8,
                "rollOffSpeed": 2100,
                "maxSpeed": 3000,
                "temp": 40,
                "altitude": 1,
                "motorInertia": 0.0029
            }],
            "numberFormatterOptions": {
                "significantDigits": 3,
                "maxPositiveExponent": 6,
                "minNegativeExponent": -4,
            },
            notifyIOData: function () { }

        };



        var settings = $.extend({}, defaults, options);
        var numberFormatter = new Cosmatt.NumberFormatter(settings.numberFormatterOptions);
        settings.selectIndex = (settings.motorSelectedIndex - 1);

        var tickFormatter = function (value, axis) {
            if (value.toString().trim() === '') {
                return value;
            }
            return numberFormatter.format(value);
        }



        var tsPlot;

        // generates widget container
        var generateTSCurveArea = function () {
            var $tsCruveContainer = $('<div class="tsCruveContainer row m-0"></div>');
            $container.append($tsCruveContainer);
            generateServoMotorTSCurveSection($tsCruveContainer);
        };

        // generates graph plot area container and accordions container
        var generateServoMotorTSCurveSection = function ($containerEle) {

            // $containerEle.append($('<div class="col-md-1"></div>'));
            var $servoMotorTSCurve = $('<div id="servoMotorTSCurve"></div>');
            $containerEle.append($servoMotorTSCurve);




            if (settings.showMotorSelForm || settings.showAppPointsForm || settings.showEnviorForm || settings.showTransmissionForm) {
                $servoMotorTSCurve.addClass('col-xs-6 col-6');

                // $containerEle.append($('<div class="col-md-1"></div>'));
                var $servoMotorArea = $('<div class="col-xs-6 col-6" id="servoMotorArea"></div>');
                $containerEle.append($servoMotorArea);



                generateServoMotorArea($servoMotorArea);
            }
            else {
                $servoMotorTSCurve.addClass('col-xs-12 col-12');
                $container.find('.tsCruveContainer').addClass('widthMaxLimit')
            }

            generateTSCurvePlotArea($servoMotorTSCurve);

            //generateServoMotorSpec();
        };

        // generates accordion container
        var generateServoMotorArea = function ($containerEle) {
            // accordion
            var $motorAreaAccordionContainer = $('<div id="motorAreaAccordionContainer"></div>');
            $containerEle.append($motorAreaAccordionContainer);

            var $panelGroup = $('<div class="panel-group" id="accordion' + settings.uniqeId + '" role="tablist" aria-multiselectable="true"></div>');
            $motorAreaAccordionContainer.append($panelGroup);

            if (!settings.showMotorTsCurve) {
                settings.showMotorSelForm = false;
            }

            if (settings.showMotorSelForm) {
                // motor panel accordion
                generateMotorPanelAccordion($panelGroup);
            }

            if (!settings.showApplicationPoints) {
                settings.showAppPointsForm = false;
            }

            if (settings.showAppPointsForm) {
                // motor ts point sliders accordion
                generateTSPointsAccordion($panelGroup);
            }

            if (settings.showTransmissionForm) {
                // transmission ratio accordion
                generateTransmissionRatioAccordion($panelGroup);
            }
            if (settings.showEnviorForm) {
                // environmentalFactors accordion
                generateEnvFactorsAccordion($panelGroup);
            }


            updateMotorStatus();
        };

        // generates motor selection table accordion
        var generateMotorPanelAccordion = function ($containerEle) {
            // motor panel accordion
            var $motorPanel = $('<div class="panelNew panel-defaultNew"></div>');
            $containerEle.append($motorPanel);

            var $motorPanelHeading = $('<div class="panel-heading panelHeadingNew" role="tab" id="headingOne"> <div id="PaginationDiv" class="Pagination"></div><span class="accordion-plus-minus  pull-right" aria-hidden="true" style="color: grey;"></span> </div>');
            $motorPanel.append($motorPanelHeading);

            var $motorPanelBodyContainer = $('<div id="collapseOne" class="panel-collapse collapse motorDataOpenPanle" role="tabpanel" aria-labelledby="headingOne"></div>');
            $motorPanel.append($motorPanelBodyContainer);

            var $motorPanelBody = $('<div class="panel-body"></div>')
            $motorPanelBodyContainer.append($motorPanelBody);

            $motorPanel.on('show.bs.collapse', function (e) {
                $(this).find('.accordion-plus-minus').removeClass('glyphicon-chevron-down fa fa-chevron-down').addClass('glyphicon-chevron-up fa fa-chevron-up');
            });
            $motorPanel.on('hide.bs.collapse', function (e) {
                $(this).find('.accordion-plus-minus').removeClass('glyphicon-chevron-up fa fa-chevron-up').addClass('glyphicon-chevron-down fa fa-chevron-down');
            });

            /***********************************************/


            var $motorPanelBody = $motorPanel.find('#collapseOne .panel-body');
            var $motorDataContainer = $('<div id="motorDataContainer" class="row"></div>');
            $motorPanelBody.append($motorDataContainer);


            var $solutionInfoTitle = $('<div class="col-xs-12 col-12 solutionInfoTitle">Selected Motor: <div id="solutionTitle"></div>&nbsp;<div id="motorName"></div> <div class="statusContainer"><div class="solutionStatus motorPass" id="statusValueContainer">Pass</div></div></div>');
            $motorDataContainer.append($solutionInfoTitle);
            var $selectedMotorStatus = $('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');
            $solutionInfoTitle.append($selectedMotorStatus);


            var $solutionInfoRowOne = $('<div class="col-xs-12 col-12 solutionInfoContainer row"></div>');
            $motorDataContainer.append($solutionInfoRowOne);

            var $driveInfo = $('<div class="col-xs-6 col-6 padding-right-zero"><span class="maxSpeedTitle">Maximum Speed:&nbsp;</span><span class="maxSpeedValue" id="driveNameId">' + settings.motorData[settings.motorSelectedIndex - 1].maxSpeed + '</span><span class="unitStyle">&nbsp;rpm</span></div>');
            $solutionInfoRowOne.append($driveInfo);

            var $motorInfo = $('<div class="col-xs-6 col-6 padding-left-right-zero"><span class="inertiaTitle">Inertia:&nbsp;</span><span class="inertiaValue" id="voltageInfoId">' + settings.motorData[settings.motorSelectedIndex - 1].motorInertia + '</span><div class="display-inline unitStyle">&nbsp;kg-m<sup>2</sup></div></div>');
            $solutionInfoRowOne.append($motorInfo);

            var $solutionInfoRowthree = $('<div class="col-xs-12 col-12 solutionInfoContainer row"></div>');
            $motorDataContainer.append($solutionInfoRowthree);

            var $peakStallTorque = $('<div class="col-xs-6 col-6 padding-right-zero"><span class="pkStallTorqueTitle">Peak Stall Torque:&nbsp;</span><span class="peakStaTorqueVal" id="peakStallTorque">' + settings.motorData[settings.motorSelectedIndex - 1].peakStallTorque + '</span><span class="unitStyle">&nbsp;N-m</span></div>');
            $solutionInfoRowthree.append($peakStallTorque);

            var $contStallTorque = $('<div class="col-xs-6 col-6 padding-left-right-zero"><div class="contStallTorqueTitle">Continuous Stall Torque:&nbsp;</div><div class="continuousStaTorqueVal" id="continuousStallTorque">' + settings.motorData[settings.motorSelectedIndex - 1].continuousStallTorque + '</div><div class="unitStyle">&nbsp;N-m</div></div>');
            $solutionInfoRowthree.append($contStallTorque);




            $motorPanelHeading.find('#PaginationDiv').Folio({
                totalPages: settings.motorData.length,
                maxPages: 9,
                activePage: settings.motorSelectedIndex,
                previousClass: 'fa fa-chevron-left',
                nextClass: 'fa fa-chevron-right',
                onUpdate: function (index) {
                    settings.sequenceIndex = index;
                    updateMotorData(index);
                }
            })

        };
        function updateMotorData(motorIndex) {

            var motorIndex = (motorIndex - 1);


            //console.log(settings.motorData[motorIndex].drivePartNo);
            $container.find('#driveNameId').text(numberFormatter.format(settings.motorData[motorIndex].maxSpeed));
            $container.find('#motorNameId').text('(' + settings.motorData[motorIndex].motorPartNo + ')');
            $container.find('#voltageInfoId').text(numberFormatter.format(settings.motorData[motorIndex].motorInertia));
            $container.find('#peakStallTorque').text(numberFormatter.format(settings.motorData[motorIndex].peakStallTorque));
            $container.find('#continuousStallTorque').text(numberFormatter.format(settings.motorData[motorIndex].continuousStallTorque));
            $container.find('#solutionTitle').text('#' + (motorIndex + 1));
            $container.find('#motorName').text('(' + settings.motorData[motorIndex].motorPartNo + ')');
            $container.find('#tsMotorName').text('Motor T-S Curve : ' + settings.motorData[motorIndex].motorPartNo);



            settings.motorSelectedIndex = motorIndex;

            settings.motorInertia = settings.motorData[motorIndex].motorInertia;

            $container.find('#tempSlider').slider('setValue', settings.temperature);
            $container.find(".amount_TEMPERATURE").val(settings.temperature);

            $container.find('#altitudeSlider').slider('setValue', settings.altitude);
            $container.find(".amount_ALTITUDE").val(settings.altitude);

            //settings.defalutMotorContinuousStallTorque = settings.motorData[settings.motorSelectedIndex].continuousStallTorque;

            //settings.defalutMotorContinuosTorqueAtMaxSpeed = settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed;

            settings.defaultPeakStallTorque = settings.motorData[settings.motorSelectedIndex].peakStallTorque;
            settings.defaultRollOffPoint = settings.motorData[settings.motorSelectedIndex].rollOffPoint;
            settings.defaultRollOffSpeed = settings.motorData[settings.motorSelectedIndex].rollOffSpeed;
            settings.defaultPeakTorqueAtMaxSpeed = settings.motorData[settings.motorSelectedIndex].peakTorqueAtMaxSpeed;
            settings.defaultContinuousStallTorque = settings.motorData[settings.motorSelectedIndex].continuousStallTorque;
            settings.defaultContinuosTorqueAtMaxSpeed = settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed;

            if (settings.motorCheckedIndex.indexOf(settings.motorSelectedIndex) == -1) {
                settings.motorCheckedIndex.push(settings.motorSelectedIndex);
                settings.motorData[settings.motorSelectedIndex].defaultContinuousStallTorque = settings.motorData[settings.motorSelectedIndex].continuousStallTorque;
                settings.motorData[settings.motorSelectedIndex].defaultContinuosTorqueAtMaxSpeed = settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed;
            }

            settings.motorSelectedIndex = motorIndex;
            settings.peakMotorData = [];
            settings.rmsMotorData = [];

            if(settings.showAppPointsForm == false){
                settings.peakPoints[0] = COSMATT.UNITCONVERTER.getUnitConvertedValue("ANGULARVELOCITY", settings.peakPoints[0],  "radianpersecond", "revolutionsperminute");
                settings.peakMotorData[0] = (settings.peakPoints[0] * settings.transmissionRaioVal);
            }
            

            settings.peakAcceMotor = (settings.peakAcceData * settings.transmissionRaioVal);



            settings.peakMotorData[0] = (settings.peakPoints[0] * settings.transmissionRaioVal);

            settings.peakMotorData[1] = ((parseFloat(settings.peakPoints[1]) / settings.transmissionRaioVal) + (settings.peakAcceMotor * settings.motorInertia));


            settings.rmsAcceMotor = (settings.rmsAcceData * settings.transmissionRaioVal);

            settings.rmsMotorData[0] = settings.peakMotorData[0];
            settings.rmsMotorData[1] = ((parseFloat(settings.rmsPoints[1]) / settings.transmissionRaioVal) + (settings.rmsAcceMotor * settings.motorInertia));

            if ($container.find('.cosmatt-unitComboBox').length > 0) {

                if ($container.find('.peakTorqueMotorSide').find('.cosmatt-unitLabelControl').length > 0) {
                    $container.find('.peakTorqueMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakMotorData[1]);
                }
                if ($container.find('.rmsTorqueMotorSide').find('.cosmatt-unitLabelControl').length > 0) {
                    $container.find('.rmsTorqueMotorSide').data('unitsComboBox').setTextBoxValue(settings.rmsMotorData[1]);
                }
                if ($container.find('.peakSpeedMotorSide').find('.cosmatt-unitLabelControl').length > 0) {
                    $container.find('.peakSpeedMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakMotorData[0]);
                }
                if ($container.find('.rmsAccelerationMotorSide').find('.cosmatt-unitLabelControl').length > 0) {
                    $container.find('.rmsAccelerationMotorSide').data('unitsComboBox').setTextBoxValue(settings.rmsAcceMotor);
                }
                if ($container.find('.peakAccelerationMotorSide').find('.cosmatt-unitLabelControl').length > 0) {
                    $container.find('.peakAccelerationMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakAcceMotor);
                }
            }

            updateMotorStatus();

            if ($container.find(".altitude-unit-combobox").length > 0) {
                altitudeImpactOnTSCurve(settings.altitude);
            }


            calculateTSCurevePoints();

        }
        var checkContainerWidth = function () {

            var $containerWidth = $container.find('.tsCruveContainer');
            // console.log("$containerWidth.width()",$containerWidth.width())

            if ($containerWidth.width() <= 940) {
                $containerWidth.find('#servoMotorArea').addClass('resizeWidth');
                $containerWidth.find('#servoMotorTSCurve').addClass('resizeWidth');
            }
            else {
                $containerWidth.find('#servoMotorArea').removeClass('resizeWidth');
                $containerWidth.find('#servoMotorTSCurve').removeClass('resizeWidth');
            }
        };
        var updateMotorOperatingPoints = function (OperatingPointType, trnsRatio) {

            var tsPlotSeries = tsPlot.getData();
            settings.transmissionRaioVal = parseFloat(trnsRatio);

            switch (OperatingPointType) {

                case "PeakTorque":

                    settings.peakMotorData[1] = ((parseFloat(settings.peakPoints[1]) / settings.transmissionRaioVal) + (settings.peakAcceMotor * settings.motorInertia));
                    tsPlotSeries[1].data[0][1] = settings.peakMotorData[1];
                    $container.find('.peakTorqueMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakMotorData[1]);

                    break;
                case "RmsTorque":

                    settings.rmsMotorData[1] = ((parseFloat(settings.rmsPoints[1]) / settings.transmissionRaioVal) + (settings.rmsAcceMotor * settings.motorInertia));
                    tsPlotSeries[3].data[0][1] = settings.rmsMotorData[1];
                    $container.find('.rmsTorqueMotorSide').data('unitsComboBox').setTextBoxValue(settings.rmsMotorData[1]);

                    break;
                case "PeakSpeed":
                    settings.rmsMotorData[0] = settings.peakMotorData[0] = (settings.peakPoints[0] * settings.transmissionRaioVal);
                    $container.find('.peakSpeedMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakMotorData[0]);
                    tsPlotSeries[1].data[0][0] = tsPlotSeries[3].data[0][0] = settings.rmsMotorData[0] = settings.peakMotorData[0] = settings.peakSpeedRpm * settings.transmissionRaioVal;

                    break;
                case "RmsAcceleration":

                    settings.rmsAcceMotor = (settings.rmsAcceData * settings.transmissionRaioVal);
                    settings.rmsMotorData[1] = ((parseFloat(settings.rmsPoints[1]) / settings.transmissionRaioVal) + (settings.rmsAcceMotor * settings.motorInertia));
                    tsPlotSeries[3].data[0][1] = settings.rmsMotorData[1];
                    $container.find('.rmsTorqueMotorSide').data('unitsComboBox').setTextBoxValue(settings.rmsMotorData[1]);
                    $container.find('.rmsAccelerationMotorSide').data('unitsComboBox').setTextBoxValue(settings.rmsAcceMotor);

                    break;
                case "PeakAcceleration":

                    settings.peakAcceMotor = (settings.peakAcceData * settings.transmissionRaioVal);
                    settings.peakMotorData[1] = ((parseFloat(settings.peakPoints[1]) / settings.transmissionRaioVal) + (settings.peakAcceMotor * settings.motorInertia));
                    tsPlotSeries[1].data[0][1] = settings.peakMotorData[1];
                    $container.find('.peakTorqueMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakMotorData[1]);

                    $container.find('.peakAccelerationMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakAcceMotor);

                    break;
                case "TransmissionRatio":

                    settings.peakAcceMotor = (settings.peakAcceData * settings.transmissionRaioVal);
                    settings.rmsAcceMotor = (settings.rmsAcceData * settings.transmissionRaioVal);

                    tsPlotSeries[1].data[0][0] = tsPlotSeries[3].data[0][0] = settings.rmsMotorData[0] = settings.peakMotorData[0] = (settings.peakPoints[0] * settings.transmissionRaioVal);
                    tsPlotSeries[1].data[0][1] = settings.peakMotorData[1] = ((settings.peakPoints[1] / settings.transmissionRaioVal) + (settings.peakAcceMotor * settings.motorInertia));

                    tsPlotSeries[3].data[0][1] = settings.rmsMotorData[1] = ((settings.rmsPoints[1] / settings.transmissionRaioVal) + (settings.rmsAcceMotor * settings.motorInertia));

                    /*if(tsPlotSeries[1].data[0][0] > settings.xaxisMaxVale){                     
                        tsPlot.getOptions().grid.markings[2].xaxis.to = '#fff';                     
                    }*/


                    if ($container.find('.cosmatt-unitComboBox').length > 0) {

                        if ($container.find('.peakTorqueMotorSide').find('.cosmatt-unitComboBox')) {
                            $container.find('.peakTorqueMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakMotorData[1]);
                        }
                        if ($container.find('.rmsTorqueMotorSide').find('.cosmatt-unitComboBox')) {
                            $container.find('.rmsTorqueMotorSide').data('unitsComboBox').setTextBoxValue(settings.rmsMotorData[1]);
                        }
                        if ($container.find('.peakSpeedMotorSide').find('.cosmatt-unitComboBox')) {
                            $container.find('.peakSpeedMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakMotorData[0]);
                        }
                        if ($container.find('.rmsAccelerationMotorSide').find('.cosmatt-unitComboBox')) {
                            $container.find('.rmsAccelerationMotorSide').data('unitsComboBox').setTextBoxValue(settings.rmsAcceMotor);
                        }
                        if ($container.find('.peakAccelerationMotorSide').find('.cosmatt-unitComboBox')) {
                            $container.find('.peakAccelerationMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakAcceMotor);
                        }
                    }

                    break;

            }


            updateTSGraph(tsPlotSeries);
            updateMotorStatus();

        };


        var updateMotorStatus = function () {

            var motorStatus = checkMotorStatus(settings.motorData[settings.motorSelectedIndex]).status;
            settings.motorStatus = motorStatus;
            if (settings.showMotorSelForm) {
                var $motorRow = $container.find('#statusValueContainer');

                $motorRow.removeClass('motorPass');
                $motorRow.removeClass('motorFail');
                $motorRow.addClass(motorStatus ? 'motorPass' : 'motorFail');
                $motorRow.text(motorStatus ? 'Pass' : 'Fail');
                //$motorRow.find('.motorStatusIcon').removeClass('glyphicon-remove').removeClass('glyphicon-ok');
                //$motorRow.eq(settings.motorSelectedIndex).find('.motorStatusIcon').addClass(motorStatus ? 'glyphicon-ok' : 'glyphicon-remove');
            }

            if (settings.showAppPointsForm) {
                var $tsSliderMotorStatusContainer = $container.find('#servoMotorArea #tsPointsPanelContainer #statusValueContainer');
                $tsSliderMotorStatusContainer.find('.motorStatusIcon').removeClass('glyphicon-remove').removeClass('glyphicon-ok').addClass(motorStatus ? 'glyphicon-ok' : 'glyphicon-remove');
                $tsSliderMotorStatusContainer.find('#statusValueLabel').text(motorStatus ? 'Motor Pass' : 'Motor Fail');
            }
        };

        // generates TS points slider accordion
        var generateTSPointsAccordion = function ($containerEle) {
            var $tsPointsPanel = $('<div class="panel panel-default"></div>');
            $containerEle.append($tsPointsPanel);

            var $tsPointsPanelHeading = $('<div class="panel-heading" role="tab" id="headingTwo"> <h4 class="panel-title"> <a role="button"  data-toggle="collapse"  href="#collapseTwo' + settings.uniqeId + '" aria-controls="collapseTwo" aria-expanded="true"><span>Application Torque Speed Requirements </span><span class="accordion-plus-minus glyphicon pull-right glyphicon-chevron-down fa fa-chevron-down" aria-hidden="true" style="color: grey;"></span> </a> </h4> </div>');
            $tsPointsPanel.append($tsPointsPanelHeading);
            var openAppPanelDefault = '';
            if (settings.openAppReqPanel == true) {
                openAppPanelDefault = 'show'
            }

            var $tsPointsPanelBodyContainer = $('<div id="collapseTwo' + settings.uniqeId + '" class="panel-collapse collapse in ' + openAppPanelDefault + '" role="tabpanel" aria-labelledby="headingTwo"></div>');
            $tsPointsPanel.append($tsPointsPanelBodyContainer);

            $tsPointsPanel.on('show.bs.collapse', function (e) {
                $(this).find('.accordion-plus-minus').removeClass('glyphicon-chevron-down fa fa-chevron-down').addClass('glyphicon-chevron-up fa fa-chevron-up');
            });
            $tsPointsPanel.on('hide.bs.collapse', function (e) {
                $(this).find('.accordion-plus-minus').removeClass('glyphicon-chevron-up fa fa-chevron-up').addClass('glyphicon-chevron-down fa fa-chevron-down');
            });

            if (!settings.showMotorSelForm) {
                $tsPointsPanelBodyContainer.addClass('in');
            }

            generateTSPointsConfigPanel($tsPointsPanelBodyContainer);
        }
        var applicationRequPointsOntextChan = function (appPointType, value) {
            var tsPlotSeries = tsPlot.getData();

            switch (appPointType) {

                case "PeakSpeed":
                    tsPlotSeries[1].data[0][0] = settings.peakPoints[0] = value;
                    settings.defaultPeakSpeed = value;
                    // $container.find("#peakSpeedValue").val($('#peakSpeedSlider').slider('getValue'));
                    $container.find('#peakSpeedSlider').slider('setValue', value);
                    break;

                case "PeakTorque":
                    tsPlotSeries[1].data[0][1] = settings.peakPoints[1] = value;
                    settings.defaultPeakTorque = value;
                    //$container.find("#peakTorqueValue").val($('#peakTorqueSlider').slider('getValue'));
                    $container.find('#peakTorqueSlider').slider('setValue', value);
                    break;

                case "RmsSpeed":
                    tsPlotSeries[3].data[0][0] = settings.rmsPoints[0] = value;
                    settings.defaultRmsSpeed = value;
                    //$container.find("#rmsSpeedValue").val($('#rmsSpeedSlider').slider('getValue'));
                    $container.find('#rmsSpeedSlider').slider('setValue', value);
                    break;

                case "RmsTorque":
                    tsPlotSeries[3].data[0][1] = settings.rmsPoints[1] = value;
                    settings.defaultRmsTorque = value;
                    $container.find('#rmsTorqueSlider').slider('setValue', value);
                    //$container.find("#rmsTorqueValue").val($('#rmsTorqueSlider').slider('getValue'));
                    break;

                case "TransmissionRatio":

                    var tranRatio = value;
                    var tsPlotSeries = tsPlot.getData();

                    tsPlotSeries[1].data[0][0] = settings.peakPoints[0] = (settings.defaultPeakSpeed * tranRatio).toFixed(2);
                    tsPlotSeries[1].data[0][1] = settings.peakPoints[1] = ((settings.defaultPeakTorque / tranRatio).toFixed(2));

                    tsPlotSeries[3].data[0][0] = settings.rmsPoints[0] = (settings.defaultRmsSpeed * tranRatio).toFixed(2);
                    tsPlotSeries[3].data[0][1] = settings.rmsPoints[1] = ((settings.defaultRmsTorque / tranRatio).toFixed(2));


                    if (tsPlotSeries[1].data[0][0] > settings.sliderLimit.peakMaxSpeed) {
                        $container.find('#peakSpeedValue').attr('data-max', parseInt(tsPlotSeries[1].data[0][0]));
                    }
                    else {
                        $container.find('#peakSpeedValue').attr('data-max', settings.sliderLimit.peakMaxSpeed);
                    }


                    if (tsPlotSeries[3].data[0][0] > settings.sliderLimit.rmsMaxSpeed) {
                        $container.find('#rmsSpeedValue').attr('data-max', parseInt(tsPlotSeries[3].data[0][0]));
                    }
                    else {
                        $container.find('#rmsSpeedValue').attr('data-max', settings.sliderLimit.rmsMaxSpeed);
                    }

                    $container.find('#trRatioSlider').slider('setValue', value);
                    $container.find('#peakSpeedSlider').slider('setValue', tsPlotSeries[1].data[0][0]);
                    $container.find('#peakTorqueSlider').slider('setValue', tsPlotSeries[1].data[0][1]);

                    $container.find('#rmsSpeedSlider').slider('setValue', tsPlotSeries[3].data[0][0]);
                    $container.find('#rmsTorqueSlider').slider('setValue', tsPlotSeries[3].data[0][1]);

                    //$container.find('#trRatioValue').val(tranRatio);
                    $container.find("#peakSpeedValue").val(tsPlotSeries[1].data[0][0]);
                    $container.find("#peakTorqueValue").val((tsPlotSeries[1].data[0][1]));
                    $container.find("#rmsSpeedValue").val(tsPlotSeries[3].data[0][0]);
                    $container.find("#rmsTorqueValue").val((tsPlotSeries[3].data[0][1]));

                    break;

            }
            updateTSGraph(tsPlotSeries);
            updateMotorStatus();

        };
        /* call back function of Peak Speed, Peak Torque, RMS Speed, RMS Torque, Transmission Ratio */
        var updateApplicationRequPoints = function (appPointType) {
            var tsPlotSeries = tsPlot.getData();
            switch (appPointType) {

                case "PeakSpeed":
                    tsPlotSeries[1].data[0][0] = settings.peakPoints[0] = $container.find('#peakSpeedSlider').slider('getValue');
                    settings.defaultPeakSpeed = $container.find('#peakSpeedSlider').slider('getValue');
                    $container.find("#peakSpeedValue").val($('#peakSpeedSlider').slider('getValue'));
                    break;

                case "PeakTorque":
                    tsPlotSeries[1].data[0][1] = settings.peakPoints[1] = $container.find('#peakTorqueSlider').slider('getValue');
                    settings.defaultPeakTorque = $container.find('#peakTorqueSlider').slider('getValue');
                    $container.find("#peakTorqueValue").val($('#peakTorqueSlider').slider('getValue'));

                    break;

                case "RmsSpeed":
                    tsPlotSeries[3].data[0][0] = settings.rmsPoints[0] = $container.find('#rmsSpeedSlider').slider('getValue');
                    settings.defaultRmsSpeed = $container.find('#rmsSpeedSlider').slider('getValue');
                    $container.find("#rmsSpeedValue").val($('#rmsSpeedSlider').slider('getValue'));
                    break;

                case "RmsTorque":
                    tsPlotSeries[3].data[0][1] = settings.rmsPoints[1] = $container.find('#rmsTorqueSlider').slider('getValue');
                    settings.defaultRmsTorque = $container.find('#rmsTorqueSlider').slider('getValue');
                    $container.find("#rmsTorqueValue").val($('#rmsTorqueSlider').slider('getValue'));

                    break;

                case "TransmissionRatio":

                    var tranRatio = $container.find('#trRatioSlider').slider('getValue');
                    var tsPlotSeries = tsPlot.getData();

                    tsPlotSeries[1].data[0][0] = settings.peakPoints[0] = (settings.defaultPeakSpeed * tranRatio).toFixed(2);
                    tsPlotSeries[1].data[0][1] = settings.peakPoints[1] = ((settings.defaultPeakTorque / tranRatio).toFixed(2));

                    tsPlotSeries[3].data[0][0] = settings.rmsPoints[0] = (settings.defaultRmsSpeed * tranRatio).toFixed(2);
                    tsPlotSeries[3].data[0][1] = settings.rmsPoints[1] = ((settings.defaultRmsTorque / tranRatio).toFixed(2));


                    if (tsPlotSeries[1].data[0][0] > settings.sliderLimit.peakMaxSpeed) {
                        $container.find('#peakSpeedSlider').slider('setAttribute', 'max', parseInt(tsPlotSeries[1].data[0][0]));
                    }
                    else {
                        $container.find('#peakSpeedSlider').slider('setAttribute', 'max', settings.sliderLimit.peakMaxSpeed);
                    }


                    if (tsPlotSeries[3].data[0][0] > settings.sliderLimit.rmsMaxSpeed) {
                        $container.find('#rmsSpeedSlider').slider('setAttribute', 'max', parseInt(tsPlotSeries[3].data[0][0]));
                    }
                    else {
                        $container.find('#rmsSpeedSlider').slider('setAttribute', 'max', settings.sliderLimit.rmsMaxSpeed);
                    }


                    $container.find('#peakSpeedSlider').slider('setValue', tsPlotSeries[1].data[0][0]);
                    $container.find('#peakTorqueSlider').slider('setValue', tsPlotSeries[1].data[0][1]);

                    $container.find('#rmsSpeedSlider').slider('setValue', tsPlotSeries[3].data[0][0]);
                    $container.find('#rmsTorqueSlider').slider('setValue', tsPlotSeries[3].data[0][1]);

                    $container.find('#trRatioValue').val(tranRatio);
                    $container.find("#peakSpeedValue").val(tsPlotSeries[1].data[0][0]);
                    $container.find("#peakTorqueValue").val((tsPlotSeries[1].data[0][1]));
                    $container.find("#rmsSpeedValue").val(tsPlotSeries[3].data[0][0]);
                    $container.find("#rmsTorqueValue").val((tsPlotSeries[3].data[0][1]));

                    break;

            }
            updateTSGraph(tsPlotSeries);
            updateMotorStatus();

        };
        // generates TS points slider accordion body
        var generateTSPointsConfigPanel = function ($containerEle) {
            var $tsPointsPanelBody = $('<div class="panel-body"></div>')
            $containerEle.append($tsPointsPanelBody);

            var $tsPointsPanelContainer = $('<div id="tsPointsPanelContainer"></div>');
            $tsPointsPanelBody.append($tsPointsPanelContainer);

            var $operatingPointTitle = $('<div class="row vertical-divider" ></div>');
            $tsPointsPanelContainer.append($operatingPointTitle);

            var $operatingPointLevel = $('<div class="col-xs-3 col-3 title"></div>');
            $operatingPointTitle.append($operatingPointLevel);

            var $operatingPointTitle1 = $('<div class="col-xs-5 col-5"><div class="titleTextLoad ">Load Side</div><div class="loadSideImg"></div></div>');
            $operatingPointTitle.append($operatingPointTitle1);

            var $operatingPointTitle2 = $('<div class="col-xs-4 col-4 padding-right-zero"><div class="titleTextMotor">Motor Side</div><div class="motorSideImg"></div></div>');
            $operatingPointTitle.append($operatingPointTitle2);


            var $peakTorqueSliderContainer = $('<div  class="row greyClass vertical-divider"></div>');
            $tsPointsPanelContainer.append($peakTorqueSliderContainer);

            var $peakTorqueTitle = $('<div class="col-xs-3 col-3 title">Peak Torque:</div>');
            $peakTorqueSliderContainer.append($peakTorqueTitle);


            var $peakTorqueDataSide = $('<div class="col-xs-5 col-5  peakTorqueDataSide appComboBox"></div>');
            $peakTorqueSliderContainer.append($peakTorqueDataSide);

            var $peakTorqueMotorSide = $('<div class="col-xs-4 col-4  peakTorqueMotorSide"> </div>')
            $peakTorqueSliderContainer.append($peakTorqueMotorSide);

            var pkTextboxEnable = 'true';
            var pkComboBoxEnable = 'true';

            if (settings.disableControls && settings.disableControls.peakTorqueTextBox) {
                pkTextboxEnable = 'false';
                pkComboBoxEnable = 'false';
            }


            $peakTorqueDataSide.unitsComboBox({
                "unitType": "TORQUE",
                "unit": 'newtonmeter',
                "mode": 'spin',
                "step": '.1',
                "dataRule": "currency",
                "min": 0,
                "enable": { "textbox": pkTextboxEnable, "comboBox": pkComboBoxEnable },
                "value": settings.peakPoints[1],
                "comboBoxWidthRatio": {
                    "textBox": "50%",
                    "comboBox": "50%"
                },
                callBackFn: function () {

                    if (this.type == 'dropdown') {
                        $container.find('.peakTorqueMotorSide').data('unitsComboBox').setDropBoxItem(this.unit);
                    }

                    if (this.type != undefined && this.type != 'dropdown') {

                        if (this.value < settings.rmsPoints[1]) {
                            $container.find('.peakTorqueDataSide').data('unitsComboBox').setTextBoxValue(settings.peakPoints[1]);
                            setAlertMessage("Peak Torque can not be less than RMS Torque.");
                            return false;
                        }
                        setAlertMessage("");
                        settings.peakPoints[1] = this.SIValue;
                        updateMotorOperatingPoints('PeakTorque', settings.transmissionRaioVal);
                    }
                }
            });

            $peakTorqueDataSide.setSIValue(settings.peakPoints[1]);
            $peakTorqueMotorSide.unitsLabelControl({
                "unitType": "TORQUE",
                "unit": 'newtonmeter',
                "value": settings.peakMotorData[1],
                "comboBoxWidthRatio": {
                    "textBox": "50%",
                    "comboBox": "50%"
                }
            });
            $peakTorqueMotorSide.setSIValue(settings.peakMotorData[1]);
            $peakTorqueDataSide.find('.cosmatt-unitComboBox').append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');

            //$peakTorqueMotorSide.find('.cosmatt-unitLabelControl').append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');
            /* var peakTorqueSlider = $peakTorqueSlider.find('#peakTorqueSlider').slider({
                 min: 0,
                 max: settings.sliderLimit.peakMaxTorque,
                 step: 0.1
             }).on('change', function() {
                 if ($peakTorqueSlider.find('#peakTorqueSlider').slider('getValue') < settings.rmsPoints[1]) {
                     $peakTorqueSlider.find('#peakTorqueSlider').slider('setValue', peakTorqueOldValue);
                     setAlertMessage("Peak Torque can not be less than RMS Torque.");
                     return false;
                 }
                 setAlertMessage("");
 
                 updateApplicationRequPoints("PeakTorque");
 
                 peakTorqueOldValue = $peakTorqueSlider.find('#peakTorqueSlider').slider('getValue');
                 //$container.find("#peakTorqueValue").val($peakTorqueSlider.find('#peakTorqueSlider').slider('getValue'));
             });
             if(settings.disableControls && settings.disableControls.peakTorqueSlider){
                 peakTorqueSlider.slider("disable");
             }
             var peakTorqueOldValue = $peakTorqueSlider.find('#peakTorqueSlider').slider('getValue');
 
             
             $container.find('#peakTorqueSpinner').spinner('changed',function(e, newVal, oldVal){
                
 
                 $(this).data('oldValue', oldVal);
               
                  if (newVal < settings.rmsPoints[1]) {                    
                     $container.find('#peakTorqueValue').val($(this).data('oldValue'));
                     setAlertMessage("Peak Torque can not be less than RMS Torque.");                    
                     return false;
                 }
                 
                 setAlertMessage("");
 
                 var minValue =  parseInt($(this).attr('data-min'));
                 var maxValue =  parseInt($(this).attr('data-max')); 
                 var valueCurrent = ($(this).val());   
 
                 if(valueCurrent >= minValue && valueCurrent <= maxValue) {
                     $(this).data('oldValue', $(this).val());
                     applicationRequPointsOntextChan("PeakTorque",newVal);
                 }             
                 else{
 
                     $(this).val($peakTorqueSlider.find('#peakTorqueSlider').slider('getValue'));
                     return;
                 } 
             });*/
            /*$container.find('#peakTorqueValue').on('focusin',function(e){
              $(this).data('oldValue', $(this).val());
            });
            $container.find('#peakTorqueValue').on('change',function(e){

                if (e.target.value < settings.rmsPoints[1]) {                    
                    $container.find('#peakTorqueValue').val($(this).data('oldValue'));
                    setAlertMessage("Peak Torque can not be less than RMS Torque.");                    
                    return false;
                }
                
                setAlertMessage("");

                var minValue =  parseInt($(this).attr('min'));
                var maxValue =  parseInt($(this).attr('max')); 
                var valueCurrent = ($(this).val());   

                if(valueCurrent >= minValue && valueCurrent <= maxValue) {
                    $(this).data('oldValue', $(this).val());
                    applicationRequPointsOntextChan("PeakTorque",e.target.value);
                }             
                else{

                    $(this).val($peakTorqueSlider.find('#peakTorqueSlider').slider('getValue'));
                    return;
                } 
               
            });
*/


            var $rmsTorqueSliderContainer = $('<div class="row vertical-divider"></div>');
            $tsPointsPanelContainer.append($rmsTorqueSliderContainer);

            var $rmsTorqueTitle = $('<div class="col-xs-3 col-3 title"><span id="rmsTorqueTitle" title="RMS Torque">RMS Torque: </sapn></div>');
            $rmsTorqueSliderContainer.append($rmsTorqueTitle);



            /*var $rmsTorqueSlider = $('<div class="col-xs-5 col-5  "><input id="rmsTorqueSlider" data-slider-value="' + settings.rmsPoints[1] + '" data-slider-id="sizeSlider" type="text" data-slider-tooltip="hide"/></div>');
            $rmsTorqueSliderContainer.append($rmsTorqueSlider);

            var $rmsTorqueInput = $('<div class="col-xs-5 col-5   display-flex margin-bottom"> <div class="input-group spinner" data-trigger="spinner" id="rmsTorqueSpinner"><input id="rmsTorqueValue" type="text" class="form-control text-center widget-textbox-height" data-max="'+settings.sliderLimit.rmsMaxTorque+'" data-min="0" data-step="0.1"  value="' + settings.rmsPoints[1] + '" data-rule="currency"><div class="input-group-addon"><a href="javascript:;" class="spin-up" data-spin="up"><i class="fa fa-caret-up"></i></a><a href="javascript:;" class="spin-down" data-spin="down"><i class="fa fa-caret-down"></i></a></div></div><label class="value"></label>&nbsp;&nbsp;Nm</div>');
            $rmsTorqueSliderContainer.append($rmsTorqueInput);*/

            var $rmsTorqueLoadSide = $('<div class="col-xs-5 col-5  rmsTorqueLoadSide appComboBox"></div>');
            $rmsTorqueSliderContainer.append($rmsTorqueLoadSide);

            var $rmsTorqueMotorSide = $('<div class="col-xs-4 col-4  rmsTorqueMotorSide"> </div>');
            $rmsTorqueSliderContainer.append($rmsTorqueMotorSide);

            var rmsTextboxEnable = 'true';
            var rmsComboBoxEnable = 'true';

            if (settings.disableControls && settings.disableControls.rmsTorqueTextBox) {
                rmsTextboxEnable = 'false';
                rmsComboBoxEnable = 'false';
            }
            $rmsTorqueLoadSide.unitsComboBox({
                "unitType": "TORQUE",
                "unit": 'newtonmeter',
                "mode": 'spin',
                "step": '.1',
                "dataRule": "currency",
                "enable": { "textbox": rmsTextboxEnable, "comboBox": rmsComboBoxEnable },
                "min": 0,
                "value": settings.rmsPoints[1],
                "comboBoxWidthRatio": {
                    "textBox": "50%",
                    "comboBox": "50%"
                },
                callBackFn: function () {
                    if (this.type != undefined && this.type != 'dropdown') {
                        if (this.value > settings.peakPoints[1]) {
                            $container.find('.rmsTorqueLoadSide').data('unitsComboBox').setTextBoxValue(settings.rmsPoints[1]);
                            setAlertMessage("RMS Torque can not be greater than Peak Torque.");
                            return false;
                        }
                        setAlertMessage("");
                        settings.rmsPoints[1] = this.SIValue;
                        updateMotorOperatingPoints('RmsTorque', settings.transmissionRaioVal);
                    }
                    if (this.type == 'dropdown') {
                        $container.find('.rmsTorqueMotorSide').data('unitsComboBox').setDropBoxItem(this.unit);
                    }

                }
            });

            $rmsTorqueLoadSide.setSIValue(settings.rmsPoints[1]);
            $rmsTorqueMotorSide.unitsLabelControl({
                "unitType": "TORQUE",
                "unit": 'newtonmeter',
                "value": settings.rmsMotorData[1],
                "comboBoxWidthRatio": {
                    "textBox": "50%",
                    "comboBox": "50%"
                }
            });
            $rmsTorqueMotorSide.setSIValue(settings.rmsMotorData[1]);
            $rmsTorqueLoadSide.find('.cosmatt-unitComboBox').append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');

            //$rmsTorqueMotorSide.find('.cosmatt-unitLabelControl').append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');
            /*var rmsTorqueSlider = $rmsTorqueSlider.find('#rmsTorqueSlider').slider({
                min: 0,
                max: settings.sliderLimit.rmsMaxTorque,
                step: 0.1
            }).on('change', function() {
                if ($rmsTorqueSlider.find('#rmsTorqueSlider').slider('getValue') > settings.peakPoints[1]) {
                    $rmsTorqueSlider.find('#rmsTorqueSlider').slider('setValue', settings.peakPoints[1]);
                    setAlertMessage("RMS Torque can not be greater than Peak Torque.");
                    return false;
                } else {
                    setAlertMessage("");
                    updateApplicationRequPoints("RmsTorque");

                }
            });

            if(settings.disableControls && settings.disableControls.rmsTorqueSlider){
                rmsTorqueSlider.slider("disable");
            }

            $container.find('#rmsTorqueSpinner').spinner('changed',function(e, newVal, oldVal){
       

                $(this).data('oldValue', oldVal);
              
                if (newVal > settings.peakPoints[1]) {
                        $container.find('#rmsTorqueValue').val($(this).data('oldValue'));
                        setAlertMessage("RMS Torque can not be greater than Peak Torque.");
                        return false;
                } else {
                        setAlertMessage("");

                        var minValue =  parseInt($(this).attr('data-min'));
                        var maxValue =  parseInt($(this).attr('data-max')); 
                        var valueCurrent = ($(this).val());                
                        if(valueCurrent >= minValue && valueCurrent <= maxValue) {
                            $(this).data('oldValue', $(this).val());
                            applicationRequPointsOntextChan("RmsTorque",e.target.value);
                        } 
                        else{

                            $(this).val($rmsTorqueSlider.find('#rmsTorqueSlider').slider('getValue'));
                            return;
                        } 
                    
                }
            });*/

            /* $container.find('#rmsTorqueValue').on('focusin',function(e){
               $(this).data('oldValue', $(this).val());
             });
             $container.find('#rmsTorqueValue').on('change',function(e){
 
                 if (e.target.value > settings.peakPoints[1]) {
                         $container.find('#rmsTorqueValue').val($(this).data('oldValue'));
                         setAlertMessage("RMS Torque can not be greater than Peak Torque.");
                         return false;
                 } else {
                         setAlertMessage("");
 
                         var minValue =  parseInt($(this).attr('min'));
                         var maxValue =  parseInt($(this).attr('max')); 
                         var valueCurrent = ($(this).val());                
                         if(valueCurrent >= minValue && valueCurrent <= maxValue) {
                             $(this).data('oldValue', $(this).val());
                             applicationRequPointsOntextChan("RmsTorque",e.target.value);
                         } 
                         else{
 
                             $(this).val($rmsTorqueSlider.find('#rmsTorqueSlider').slider('getValue'));
                             return;
                         } 
                     
                 }
 
                
             });*/


            var $peakSpeedSliderContainer = $('<div  class="row greyClass vertical-divider"></div>');
            $tsPointsPanelContainer.append($peakSpeedSliderContainer);

            var $peakSpeedTitle = $('<div class="col-xs-3 col-3 title"><span id="peakSpeedTitle" title="Peak Speed">Peak Speed: </sapn></div>');
            $peakSpeedSliderContainer.append($peakSpeedTitle);

            /*var $peakSpeedSlider = $('<div class="col-xs-5 col-5  "><input id="peakSpeedSlider" data-slider-value="' + settings.peakPoints[0] + '" data-slider-id="sizeSlider" type="text" data-slider-tooltip="hide"/></div>');
            $peakSpeedSliderContainer.append($peakSpeedSlider);

            var $peakSpeedInput = $('<div class="col-xs-5 col-5   display-flex margin-bottom"> <div class="input-group spinner" data-trigger="spinner" id="peakSpeedSpinner"><input id="peakSpeedValue" type="text" class="form-control text-center widget-textbox-height" data-max="'+settings.sliderLimit.peakMaxSpeed+'" data-min="0" data-step="1"  value="' + settings.peakPoints[0] + '" data-rule="currency"><div class="input-group-addon"><a href="javascript:;" class="spin-up" data-spin="up"><i class="fa fa-caret-up"></i></a><a href="javascript:;" class="spin-down" data-spin="down"><i class="fa fa-caret-down"></i></a></div></div><label class="value"></label>&nbsp;&nbsp;rad/sec</div>')
            $peakSpeedSliderContainer.append($peakSpeedInput);*/

            var $peakSpeedLoadSide = $('<div class="col-xs-5 col-5  peakSpeedLoadSide appComboBox"></div>');
            $peakSpeedSliderContainer.append($peakSpeedLoadSide);

            var $peakSpeedMotorSide = $('<div class="col-xs-4 col-4  peakSpeedMotorSide"></div>')
            $peakSpeedSliderContainer.append($peakSpeedMotorSide);

            var pksTextboxEnable = 'true';
            var pksComboBoxEnable = 'true';

            if (settings.disableControls && settings.disableControls.peakSpeedTextBox) {
                pksTextboxEnable = 'false';
                pksComboBoxEnable = 'false';
            }
            settings.peakPoints[0] = COSMATT.UNITCONVERTER.getUnitConvertedValue("ANGULARVELOCITY", settings.peakPoints[0],  "radianpersecond", "revolutionsperminute");
            settings.peakMotorData[0] = (settings.peakPoints[0] * settings.transmissionRaioVal);
            $peakSpeedLoadSide.unitsComboBox({
                "unitType": "ANGULARVELOCITY",
                "unit": 'revolutionsperminute',
                "mode": "spin",
                "step": '1',
                "dataRule": "currency",
                "min": 0,
                "enable": { "textbox": pksTextboxEnable, "comboBox": pksComboBoxEnable },
                "value": settings.peakPoints[0],
                "comboBoxWidthRatio": {
                    "textBox": "50%",
                    "comboBox": "50%"
                },
                callBackFn: function () {

                    if (this.type != undefined && this.type != 'dropdown') {

                        settings.peakPoints[0] = this.value;

                        settings.peakSpeedRpm = COSMATT.UNITCONVERTER.getUnitConvertedValue('ANGULARVELOCITY', this.value, this.unit, 'revolutionsperminute');

                        updateMotorOperatingPoints('PeakSpeed', settings.transmissionRaioVal);


                    }
                    if (this.type == 'dropdown') {

                        $container.find('.peakSpeedMotorSide').data('unitsComboBox').setDropBoxItem(this.unit);
                    }
                }
            });

            $peakSpeedMotorSide.unitsLabelControl({
                "unitType": "ANGULARVELOCITY",
                "unit": 'revolutionsperminute',
                "value": settings.peakMotorData[0],
                "comboBoxWidthRatio": {
                    "textBox": "50%",
                    "comboBox": "50%"
                },
                callBackFn: function () {

                }
            });

           // $peakSpeedMotorSide.setSIValue(settings.peakPoints[0]);
            $peakSpeedLoadSide.find('.cosmatt-unitComboBox').append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');

            //$peakSpeedMotorSide.find('.cosmatt-unitLabelControl').append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');
            /*var peakSpeedSlider = $peakSpeedSlider.find('#peakSpeedSlider').slider({
                min: 0,
                max: settings.sliderLimit.peakMaxSpeed,
                step: 1
            }).on('change', function() {
                if ($peakSpeedSlider.find('#peakSpeedSlider').slider('getValue') < settings.rmsPoints[0]) {
                    $peakSpeedSlider.find('#peakSpeedSlider').slider('setValue', settings.rmsPoints[0]);
                    setAlertMessage("Peak Speed can not be less than RMS Speed.");
                    return false;
                }
                setAlertMessage("");

                updateApplicationRequPoints("PeakSpeed");


            });

            if(settings.disableControls && settings.disableControls.peakSpeedSlider){
                peakSpeedSlider.slider("disable");
            }
            
            $container.find('#peakSpeedSpinner').spinner('changed',function(e, newVal, oldVal){
       

                $(this).data('oldValue', oldVal);
              
                if (newVal < settings.rmsPoints[0]) {
                    console.log("$(this).data('oldValue'): ",$(this).data('oldValue'));
                    $container.find('#peakSpeedValue').val($(this).data('oldValue'));
                    setAlertMessage("Peak Speed can not be less than RMS Speed.");
                    return false;
                }
                setAlertMessage("");
                 
                var minValue =  parseInt($(this).attr('data-min'));
                var maxValue =  parseInt($(this).attr('data-max')); 
                var valueCurrent = ($(this).val());                
                if(valueCurrent >= minValue && valueCurrent <= maxValue) {
                    $(this).data('oldValue', $(this).val()); 
                    applicationRequPointsOntextChan("PeakSpeed",e.target.value);
                } 
                else{

                    $(this).val($peakSpeedSlider.find('#peakSpeedSlider').slider('getValue'));
                    return;
                }     

            });*/
            /* $container.find('#peakSpeedValue').on('focusin',function(e){
               $(this).data('oldValue', $(this).val());
             });
             $container.find('#peakSpeedValue').on('change',function(e){
 
                 if (e.target.value < settings.rmsPoints[0]) {
                     console.log("$(this).data('oldValue'): ",$(this).data('oldValue'));
                     $container.find('#peakSpeedValue').val($(this).data('oldValue'));
                     setAlertMessage("Peak Speed can not be less than RMS Speed.");
                     return false;
                 }
                 setAlertMessage("");
                  
                 var minValue =  parseInt($(this).attr('min'));
                 var maxValue =  parseInt($(this).attr('max')); 
                 var valueCurrent = ($(this).val());                
                 if(valueCurrent >= minValue && valueCurrent <= maxValue) {
                     $(this).data('oldValue', $(this).val()); 
                     applicationRequPointsOntextChan("PeakSpeed",e.target.value);
                 } 
                 else{
 
                     $(this).val($peakSpeedSlider.find('#peakSpeedSlider').slider('getValue'));
                     return;
                 }     
 
                 
             });
 */

            /* if(settings.disableControls && settings.disableControls.peakSpeedTextBox){
                 $container.find('#peakSpeedValue').attr("disabled",true);
             }*/




            var $peakAccContainer = $('<div  class="row vertical-divider"></div>');
            $tsPointsPanelContainer.append($peakAccContainer);

            var $peakAccTitle = $('<div class="col-xs-3 col-3 title"><div title="Peak Acceleration" class="peakAccele">Peak Acceleration: </div></div>');
            $peakAccContainer.append($peakAccTitle);

            var $peakAccelerationLoadSide = $('<div class="col-xs-5 col-5  peakAccelerationLoadSide appComboBox"></div>');
            $peakAccContainer.append($peakAccelerationLoadSide);

            var $peakAccelerationMotorSide = $('<div class="col-xs-4 col-4  peakAccelerationMotorSide"></div>');
            $peakAccContainer.append($peakAccelerationMotorSide);

            var pkacTextboxEnable = 'true';
            var pkacComboBoxEnable = 'true';

            if (settings.disableControls && settings.disableControls.peakAcceleration) {
                pkacTextboxEnable = 'false';
                pkacComboBoxEnable = 'false';
            }

            $peakAccelerationLoadSide.unitsComboBox({
                "unitType": "ANGULARACCELERATION",
                "unit": 'radianpersecondsquare',
                "mode": 'spin',
                "step": '1',
                "dataRule": "currency",
                "enable": { "textbox": pkacTextboxEnable, "comboBox": pkacComboBoxEnable },
                "value": settings.peakAcceData,
                "min": 0,
                "comboBoxWidthRatio": {
                    "textBox": "50%",
                    "comboBox": "50%"
                },
                callBackFn: function () {
                    if (this.type != undefined && this.type != 'dropdown') {

                        if (this.value < settings.rmsAcceData) {
                            $container.find('.peakAccelerationLoadSide').data('unitsComboBox').setTextBoxValue(settings.peakAcceData);
                            setAlertMessage("Peak Acceleration can not be less than RMS Acceleration.");
                            return false;
                        }
                        setAlertMessage("");
                        settings.peakAcceData = this.SIValue;
                        updateMotorOperatingPoints('PeakAcceleration', settings.transmissionRaioVal);
                    }
                    if (this.type == 'dropdown') {
                        $container.find('.peakAccelerationMotorSide').data('unitsComboBox').setDropBoxItem(this.unit);
                    }

                }
            });
            $peakAccelerationLoadSide.setSIValue(settings.peakAcceData);
            $peakAccelerationMotorSide.unitsLabelControl({
                "unitType": "ANGULARACCELERATION",
                "unit": 'radianpersecondsquare',
                "value": settings.peakAcceMotor,
                "comboBoxWidthRatio": {
                    "textBox": "50%",
                    "comboBox": "50%"
                },
                callBackFn: function () {

                }
            });

            $peakAccelerationMotorSide.setSIValue(settings.peakAcceMotor);
            $peakAccelerationLoadSide.find('.cosmatt-unitComboBox').append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');

            //$peakAccelerationMotorSide.find('.cosmatt-unitLabelControl').append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');


            /* var rmsSpeedSlider = $rmsSpeedSlider.find('#rmsSpeedSlider').slider({
                 min: 0,
                 max: settings.sliderLimit.rmsMaxSpeed,
                 step: 1
             }).on('change', function() {
                 if ($rmsSpeedSlider.find('#rmsSpeedSlider').slider('getValue') > settings.peakPoints[0]) {
                     $rmsSpeedSlider.find('#rmsSpeedSlider').slider('setValue', settings.peakPoints[0]);
                     setAlertMessage("RMS Speed can not be greater than Peak Speed.");
                     return;
                 }
                 setAlertMessage("");
                 updateApplicationRequPoints("RmsSpeed");               
 
             });
 
             if(settings.disableControls && settings.disableControls.rmsSpeedSlider){
                 rmsSpeedSlider.slider("disable");
             }
 
             $container.find('#rmsSpeedSpinner').spinner('changed',function(e, newVal, oldVal){
        
 
                 $(this).data('oldValue', oldVal);
               
                 if (newVal > settings.peakPoints[0]) {
                     $container.find('#rmsSpeedValue').val($(this).data('oldValue'));
                     setAlertMessage("RMS Speed can not be greater than Peak Speed.");
                     return;
                 }
                 setAlertMessage("");
 
                 var minValue =  parseInt($(this).attr('data-min'));
                 var maxValue =  parseInt($(this).attr('data-max')); 
                 var valueCurrent = ($(this).val());                
                 if(valueCurrent >= minValue && valueCurrent <= maxValue) {
                     $(this).data('oldValue', $(this).val());
                     applicationRequPointsOntextChan("RmsSpeed",newVal);
                 } 
                 else{
 
                     $(this).val($rmsSpeedSlider.find('#rmsSpeedSlider').slider('getValue'));
                     return;
                 } 
             });*/
            /*$container.find('#rmsSpeedValue').on('focusin',function(e){
              $(this).data('oldValue', $(this).val());
            });
            $container.find('#rmsSpeedValue').on('change',function(e){
                if (e.target.value > settings.peakPoints[0]) {
                    $container.find('#rmsSpeedValue').val($(this).data('oldValue'));
                    setAlertMessage("RMS Speed can not be greater than Peak Speed.");
                    return;
                }
                setAlertMessage("");

                var minValue =  parseInt($(this).attr('min'));
                var maxValue =  parseInt($(this).attr('max')); 
                var valueCurrent = ($(this).val());                
                if(valueCurrent >= minValue && valueCurrent <= maxValue) {
                    $(this).data('oldValue', $(this).val());
                    applicationRequPointsOntextChan("RmsSpeed",e.target.value);
                } 
                else{

                    $(this).val($rmsSpeedSlider.find('#rmsSpeedSlider').slider('getValue'));
                    return;
                } 

                
                
            });*/
            var $rmsAccContainer = $('<div  class="row greyClass vertical-divider"></div>');
            $tsPointsPanelContainer.append($rmsAccContainer);

            var $rmsSpeedTitle = $('<div class="col-xs-3 col-3 title"><div id="rmsSpeedTitle" title="RMS Acceleration" class="rmsAccele">RMS Acceleration: </div></div>');
            $rmsAccContainer.append($rmsSpeedTitle);


            var $rmsAccelerationLoadSide = $('<div class="col-xs-5 col-5  rmsAccelerationLoadSide appComboBox"></div>');
            $rmsAccContainer.append($rmsAccelerationLoadSide);

            var $rmsAccelerationMotorSide = $('<div class="col-xs-4 col-4  rmsAccelerationMotorSide"></div>');
            $rmsAccContainer.append($rmsAccelerationMotorSide);

            var rmsacTextboxEnable = 'true';
            var rmsacComboBoxEnable = 'true';

            if (settings.disableControls && settings.disableControls.rmsAcceleration) {
                rmsacTextboxEnable = 'false';
                rmsacComboBoxEnable = 'false';
            }

            $rmsAccelerationLoadSide.unitsComboBox({
                "unitType": "ANGULARACCELERATION",
                "unit": 'radianpersecondsquare',
                "mode": 'spin',
                "step": '1',
                "dataRule": "currency",
                "enable": { "textbox": rmsacTextboxEnable, "comboBox": rmsacComboBoxEnable },
                "min": 0,
                "value": settings.rmsAcceData,
                "comboBoxWidthRatio": {
                    "textBox": "50%",
                    "comboBox": "50%"
                },
                callBackFn: function () {
                    if (this.type != undefined && this.type != 'dropdown') {

                        if (this.value > settings.peakAcceData) {
                            $container.find('.rmsAccelerationLoadSide').data('unitsComboBox').setTextBoxValue(settings.rmsAcceData);
                            setAlertMessage("RMS Acceleration can not be greater than Peak Acceleration.");
                            return false;
                        }
                        setAlertMessage("");
                        settings.rmsAcceData = this.SIValue;
                        updateMotorOperatingPoints('RmsAcceleration', settings.transmissionRaioVal);
                    }

                    if (this.type == 'dropdown') {
                        $container.find('.rmsAccelerationMotorSide').data('unitsComboBox').setDropBoxItem(this.unit);
                    }
                }
            });
            $rmsAccelerationLoadSide.setSIValue(settings.rmsAcceData);
            $rmsAccelerationMotorSide.unitsLabelControl({
                "unitType": "ANGULARACCELERATION",
                "unit": 'radianpersecondsquare',
                "value": settings.rmsAcceMotor,
                "comboBoxWidthRatio": {
                    "textBox": "50%",
                    "comboBox": "50%"
                },
                callBackFn: function () {

                }
            });
            $rmsAccelerationMotorSide.setSIValue(settings.rmsAcceMotor);
            $rmsAccelerationLoadSide.find('.cosmatt-unitComboBox').append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');

            //$rmsAccelerationMotorSide.find('.cosmatt-unitLabelControl').append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');
            if (settings.disableControls && settings.disableControls.rmsSpeedTextBox) {
                $container.find('#rmsSpeedValue').attr("disabled", true);
            }

            if (settings.showMotorTsCurve) {
                var $statusContainer = $('<div  class="row"></div>');
                $tsPointsPanelContainer.append($statusContainer);
            }

            $tsPointsPanelContainer.append('<div id="alertMessageContainer" class="alert alert-warning"><strong>Warning:-&nbsp;&nbsp;</strong><span></span></div>');

            var setAlertMessage = function (alertText) {
                if (alertText === "") {
                    $tsPointsPanelContainer.find('#alertMessageContainer').hide();
                    return;
                }

                $tsPointsPanelContainer.find('#alertMessageContainer span').text(alertText);

                $tsPointsPanelContainer.find('#alertMessageContainer').show();

                setTimeout(function () {
                    $tsPointsPanelContainer.find('#alertMessageContainer').fadeOut("slow");
                }, 3000)
            };
        };

        // generates Environmental factors slider accordion
        var generateEnvFactorsAccordion = function ($containerEle) {
            var $envFactorsPanel = $('<div class="panel panel-default"></div>');
            $containerEle.append($envFactorsPanel);

            var $envFactorsPanelHeading = $('<div class="panel-heading" role="tab" id="headingThree"> <h4 class="panel-title"> <a role="button"   data-toggle="collapse"  href="#collapseThree' + settings.uniqeId + '" aria-controls="collapseThree" aria-expanded="false"><span> Environmental Factors</span> <span class="accordion-plus-minus glyphicon pull-right glyphicon-chevron-down fa fa-chevron-down" aria-hidden="true" style="color: grey;"></span> </a> </h4> </div>');
            $envFactorsPanel.append($envFactorsPanelHeading);

            var $envFactorsPanelBodyContainer = $('<div id="collapseThree' + settings.uniqeId + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree"></div>');
            $envFactorsPanel.append($envFactorsPanelBodyContainer);

            var $envFactorsPanelBody = $('<div class="panel-body"></div>')
            $envFactorsPanelBodyContainer.append($envFactorsPanelBody);

            $envFactorsPanel.on('show.bs.collapse', function (e) {
                $(this).find('.accordion-plus-minus').removeClass('glyphicon-chevron-down fa fa-chevron-down').addClass('glyphicon-chevron-up fa fa-chevron-up');
            });
            $envFactorsPanel.on('hide.bs.collapse', function (e) {
                $(this).find('.accordion-plus-minus').removeClass('glyphicon-chevron-up fa fa-chevron-up').addClass('glyphicon-chevron-down fa fa-chevron-down');
            });

            generateEnvFactorsConfigPanel($envFactorsPanelBody);
        };

        // generates Environmental factors slider accordion body
        var generateEnvFactorsConfigPanel = function ($containerEle) {
            var $envFactorsPanelContainer = $('<div id="envFactorsPanelContainer"></div>');
            $containerEle.append($envFactorsPanelContainer);

            var $tempSliderContainer = $('<div  class="row"></div>');
            $envFactorsPanelContainer.append($tempSliderContainer);

            var $tempTitle = $('<div class="col-xs-3 col-3 title"><span id="tempTitle">Temperature: </span></div>');
            $tempSliderContainer.append($tempTitle);

            var $tempSlider = $('<div class="col-xs-3 col-3  "><input id="tempSlider" data-slider-id="sizeSlider" type="text" data-slider-tooltip="hide"/></div>');
            $tempSliderContainer.append($tempSlider);

            /*var $tempInput = $('<div class="col-sm-5  "><input type="number" id="tempValue" name="quantity" min="0" value="' + settings.motorData[settings.motorSelectedIndex].temp + '" class="widgetNumberInput form-control bfh-number"><lable class="value">&nbsp;&deg;C</label></div>');
            $tempSliderContainer.append($tempInput);*/
            var sliderMax = settings.sliderLimit.maxTemp || defaults.sliderLimit.maxTemp;

            var $tempInput = $('<div class="col-xs-6 col-6  temp-unit-dropdown display-flex margin-bottom"></label></div>');
            $tempSliderContainer.append($tempInput);

            //var $tempValue = $('<div class="col-sm-3"><label class="value" id="tempValue">' + settings.motorData[settings.motorSelectedIndex].temp + '</label><label class="value">&deg;C</label></div>');
            //$tempSliderContainer.append($tempValue);



            settings.defaultPeakStallTorque = settings.motorData[settings.motorSelectedIndex].peakStallTorque;
            settings.defaultRollOffPoint = settings.motorData[settings.motorSelectedIndex].rollOffPoint;
            settings.defaultRollOffSpeed = settings.motorData[settings.motorSelectedIndex].rollOffSpeed;
            settings.defaultPeakTorqueAtMaxSpeed = settings.motorData[settings.motorSelectedIndex].peakTorqueAtMaxSpeed;
            settings.defaultContinuousStallTorque = settings.motorData[settings.motorSelectedIndex].continuousStallTorque;
            settings.defaultContinuosTorqueAtMaxSpeed = settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed;


            $tempSliderContainer.find('#tempSlider').slider({
                value: settings.temperature,
                min: 0,
                max: sliderMax,
                step: 1,
            }).on('change', function (slideEvt) {

                $(".temp-unit-dropdown").data('unitsComboBox').setTextBoxValue(slideEvt.value.newValue);
                settings.temperature = slideEvt.value.newValue;
                var deltaTemp = (slideEvt.value.newValue - slideEvt.value.oldValue);

                if (deltaTemp !== 0) {
                    tempImpactOnTScurve(slideEvt.value.newValue);
                }

            });

            if (settings.disableControls && settings.disableControls.tempSlider) {
                $tempSliderContainer.find('#tempSlider').slider("disable");
            }


            $tempInput.unitsComboBox({
                "unitType": "TEMPERATURE",
                "unit": 'celsius',
                "mode": 'spin',
                "step": '1',
                "dataRule": "currency",
                "min": 0,
                "value": settings.temperature,
                "comboBoxWidthRatio": {
                    "textBox": "45%",
                    "comboBox": "35%"
                },
                callBackFn: function () {

                    if (this.type != undefined && this.type != 'dropdown' ) {
                        settings.temperature = this.SIValue;
                        $container.find('#tempSlider').slider('setValue', parseInt(this.value));
                        tempImpactOnTScurve(this.value);
                    }

                }
            });
            $tempInput.find('.cosmatt-unitComboBox').append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');


            if (settings.disableControls && settings.disableControls.tempTextBox) {
                $container.find('.amount_TEMPERATURE').attr("disabled", true);
            }

            var tempImpactOnTScurve = function (changedValue) {
                updatePlotDataOnTempChange("peakPlot", parseInt(changedValue));
                updatePlotDataOnTempChange("rmsPlot", parseInt(changedValue));
            }

            var updatePlotDataOnTempChange = function (plotType, currentTemp) {

                var tsPlotSeries = tsPlot.getData();


                var ta = currentTemp; // Application temperature
                var tr = 40 // Rating ambient (the ambient at which the motor is rated - default 40 degrees)
                var twl = 155 // Limiting winding temperature in degree celcius
                var ts = 25 //Motor specification Temperature
                // var tw = ta + (0.6 * (twl - ta)); //Winding temperature
                var tm = ta + (0.6 * (twl - ta)); //Actual Magnet Temperature
                var tmr = tr + (0.6 * (twl - tr)); //Rating Magnet Temperature
                var Km = -0.0015; // is the temperature coefficient of the rotor magnets


                var K1 = (1 - (ta - tr) / (twl - tr));
                var K2 = ((ts + 234.5) / (tmr + 234.5));
                var K3 = (1 + (tm - tmr) * Km);

                switch (plotType) {
                    case "peakPlot":
                        var peakPlotData = tsPlotSeries[0].data;

                        for (var i = 0; i < peakPlotData.length; i++) {

                            //peakPlotData[i][0] = peakPlotData[i][0] * K3;

                            if (settings.motorData[settings.motorSelectedIndex] != undefined) {
                                if (i == 0 || i == 12 || i == 6) {

                                    peakPlotData[i][1] = settings.defaultPeakStallTorque * K3;
                                    if (i == 0) {
                                        settings.motorData[settings.motorSelectedIndex].peakStallTorque = peakPlotData[i][1];
                                    }
                                    if (i == 6) {
                                        peakPlotData[i][1] = -(peakPlotData[i][1]);
                                    }

                                }
                                if (i == 1 || i == 7) {

                                    peakPlotData[i][1] = settings.defaultRollOffPoint * K3;
                                    peakPlotData[i][0] = settings.defaultRollOffSpeed / K3;
                                    settings.motorData[settings.motorSelectedIndex].rollOffPoint = peakPlotData[i][1];
                                    settings.motorData[settings.motorSelectedIndex].rollOffSpeed = peakPlotData[i][0];
                                    if (i == 7) {
                                        peakPlotData[i][0] = -(peakPlotData[i][0]);
                                        peakPlotData[i][1] = -(peakPlotData[i][1]);
                                    }
                                }
                                if (i == 2 || i == 8) {

                                    peakPlotData[i][1] = settings.defaultPeakTorqueAtMaxSpeed * K3;
                                    settings.motorData[settings.motorSelectedIndex].peakTorqueAtMaxSpeed = peakPlotData[i][1];
                                    if (i == 8) {
                                        peakPlotData[i][1] = -(peakPlotData[i][1]);
                                    }

                                }

                            }
                        }
                        tsPlotSeries[0].data = peakPlotData;
                        break;

                    case "rmsPlot":
                        var rmsPlotData = tsPlotSeries[2].data;

                        for (var i = 0; i < rmsPlotData.length; i++) {



                            if (settings.motorData[settings.motorSelectedIndex] != undefined) {

                                if (i == 0 || i == 10 || i == 5) {
                                    rmsPlotData[i][1] = settings.defaultContinuousStallTorque * (K3 * Math.sqrt(K1 / K2));
                                    settings.motorData[settings.motorSelectedIndex].continuousStallTorque = rmsPlotData[i][1];
                                    //settings.defaultContinuousStallTorque = rmsPlotData[i][1];
                                    if (i == 5) {
                                        rmsPlotData[i][1] = -(rmsPlotData[i][1]);
                                    }
                                }
                                if (i == 1 || i == 6) {
                                    rmsPlotData[i][1] = settings.defaultContinuosTorqueAtMaxSpeed * (K3 * Math.sqrt(K1 / K2));
                                    settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed = rmsPlotData[i][1];
                                    //settings.defalutMotorContinuosTorqueAtMaxSpeed = rmsPlotData[i][1];
                                    if (i == 6) {
                                        rmsPlotData[i][1] = -(rmsPlotData[i][1]);
                                    }
                                }
                            }
                        }
                        tsPlotSeries[2].data = rmsPlotData;
                        break;


                }
                updateTSGraph(tsPlotSeries);
                updateMotorStatus();

            }
            var updatePlotDataOnTempChange_copy = function (plotType, delta) {

                var tsPlotSeries = tsPlot.getData();

                var tempContsFactor = '0.2'; // for every 1 degree increase we reduce the curve by 0.2%

                switch (plotType) {

                    case "peakPlot":
                        var peakPlotData = tsPlotSeries[0].data;
                        for (var i = 0; i < peakPlotData.length; i++) {

                            var reducedTorqVal = ((peakPlotData[i][1] * delta * tempContsFactor) / 100);
                            peakPlotData[i][1] = ((peakPlotData[i][1] - reducedTorqVal)).toFixed(2);

                            //var reducedSpeedVal = ((peakPlotData[i][0] * delta * tempContsFactor) / 100); 
                            // peakPlotData[i][0] = ((peakPlotData[i][0] - reducedSpeedVal)).toFixed(2); 

                            if (settings.motorData[settings.motorSelectedIndex] != undefined) {
                                if (i == 0) {
                                    settings.motorData[settings.motorSelectedIndex].peakStallTorque = peakPlotData[i][1];
                                }
                                if (i == 1) {
                                    settings.motorData[settings.motorSelectedIndex].rollOffPoint = peakPlotData[i][1];
                                    //settings.motorData[settings.motorSelectedIndex].rollOffSpeed = peakPlotData[i][0];
                                }
                                if (i == 2) {
                                    settings.motorData[settings.motorSelectedIndex].peakTorqueAtMaxSpeed = peakPlotData[i][1];
                                }
                                if (i == 3) {
                                    //settings.motorData[settings.motorSelectedIndex].maxSpeed = peakPlotData[i][0];
                                }


                            }
                        }
                        tsPlotSeries[0].data = peakPlotData;
                        break;

                    case "rmsPlot":
                        var rmsPlotData = tsPlotSeries[2].data;

                        for (var i = 0; i < rmsPlotData.length; i++) {

                            var reducedTorqVal = ((rmsPlotData[i][1] * delta * tempContsFactor) / 100);
                            rmsPlotData[i][1] = ((rmsPlotData[i][1] - reducedTorqVal)).toFixed(2);

                            // var reducedSpeedVal = ((rmsPlotData[i][0] * delta * tempContsFactor) / 100); 
                            //rmsPlotData[i][0] = ((rmsPlotData[i][0] - reducedSpeedVal)).toFixed(2); 

                            if (settings.motorData[settings.motorSelectedIndex] != undefined) {
                                if (i == 0) {
                                    settings.motorData[settings.motorSelectedIndex].continuousStallTorque = rmsPlotData[i][1];
                                    //settings.defalutMotorContinuousStallTorque = rmsPlotData[i][1];
                                }
                                if (i == 1) {
                                    settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed = rmsPlotData[i][1];
                                    //settings.defalutMotorContinuosTorqueAtMaxSpeed = rmsPlotData[i][1];
                                }
                            }
                        }
                        tsPlotSeries[2].data = rmsPlotData;
                        break;

                }

                updateTSGraph(tsPlotSeries);
                updateMotorStatus();

            };


            var $altitudeSliderContainer = $('<div  class="row"></div>');
            $envFactorsPanelContainer.append($altitudeSliderContainer);

            var $altitudeTitle = $('<div class="col-xs-3 col-3 title"><span id="altitudeTitle">Altitude: </span></div>');
            $altitudeSliderContainer.append($altitudeTitle);

            var $altitudeSlider = $('<div class="col-xs-3 col-3  "><input id="altitudeSlider" data-slider-id="sizeSlider" type="text" data-slider-tooltip="hide"/></div>');
            $altitudeSliderContainer.append($altitudeSlider);

            /*var $altitudeInput = $('<div class="col-sm-5  "><input type="number" id="altitudeValue" name="quantity" min="0" value="' + settings.motorData[settings.motorSelectedIndex].altitude + '" class="widgetNumberInput form-control bfh-number"><label class="value">&nbsp;&nbsp;m</label></div>');
            $altitudeSliderContainer.append($altitudeInput);*/
            var sliderMax = settings.sliderLimit.maxAltitude || defaults.sliderLimit.maxAltitude;

            var $altitudeInput = $('<div class="col-xs-6 col-6 altitude-unit-combobox display-flex margin-bottom"> </div>');
            $altitudeSliderContainer.append($altitudeInput);

            settings.defaultContinuousStallTorque = settings.motorData[settings.motorSelectedIndex].continuousStallTorque;

            settings.defaultContinuosTorqueAtMaxSpeed = settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed;

            $altitudeSlider.find('#altitudeSlider').slider({
                value: settings.altitude,
                min: 0,
                max: 10000,
                step: 1,
            }).on('change', function (slideEvt) {
                altitudeImpactOnTSCurve(slideEvt.value.newValue);
            });

            if (settings.disableControls && settings.disableControls.altitudeSlider) {
                $altitudeSlider.find('#altitudeSlider').slider("disable");
            }

            $altitudeInput.unitsComboBox({

                "unitType": "ALTITUDE",
                "unit": 'meter',
                "mode": 'spin',
                "step": '1',
                "dataRule": "currency",
                "min": 0,
                "value": settings.altitude,
                "comboBoxWidthRatio": {
                    "textBox": "45%",
                    "comboBox": "35%"

                },
                callBackFn: function () {
                    if (this.type != undefined && this.type != 'dropdown') {
                        settings.altitude = this.value;
                        $container.find('#altitudeSlider').slider('setValue', this.value);
                        altitudeImpactOnTSCurve(parseInt(this.value));
                    }
                }
            });

            /*$container.find('#altitudeSpinner').spinner('changed', function (e, newVal, oldVal) {

                var currentTextBoxVal = parseInt(newVal);

                var tsPlotSeries = tsPlot.getData();
                var rmsPlotData = tsPlotSeries[2].data;
                $container.find('#altitudeSlider').slider('setValue', currentTextBoxVal);
                if (currentTextBoxVal > 1500) {

                    var altitConstant = [1 - (currentTextBoxVal - 1500) / 10000];

                    rmsPlotData[0][1] = rmsPlotData[10][1] = (settings.defaultContinuousStallTorque * altitConstant).toFixed(3);

                    rmsPlotData[1][1] = (settings.defaultContinuosTorqueAtMaxSpeed * altitConstant).toFixed(3);

                    tsPlotSeries[2].data = rmsPlotData;
                    settings.motorData[settings.motorSelectedIndex].continuousStallTorque = rmsPlotData[0][1];
                    settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed = rmsPlotData[1][1];

                }
                else {

                    var altitConstant = 1;

                    rmsPlotData[0][1] = rmsPlotData[10][1] = (settings.defaultContinuousStallTorque * altitConstant).toFixed(3);

                    rmsPlotData[1][1] = (settings.defaultContinuosTorqueAtMaxSpeed * altitConstant).toFixed(3);

                    tsPlotSeries[2].data = rmsPlotData;
                    settings.motorData[settings.motorSelectedIndex].continuousStallTorque = rmsPlotData[0][1];
                    settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed = rmsPlotData[1][1];
                }
                updateTSGraph(tsPlotSeries);
                updateMotorStatus();

            });*/

            $altitudeInput.find('.cosmatt-unitComboBox').append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');

            /*$container.find('#altitudeValue').on('change',function(e){
                    var currentTextBoxVal = parseInt(e.target.value);
                    //updatePlotDataOnTempChange("peakPlot", parseInt(e.target.value));
                    //updatePlotDataOnTempChange("rmsPlot", parseInt(e.target.value));
                var tsPlotSeries = tsPlot.getData();
                var rmsPlotData = tsPlotSeries[2].data;
                $container.find('#altitudeSlider').slider('setValue', currentTextBoxVal);
                if (currentTextBoxVal > 1500) {

                    var altitConstant = [1 - (currentTextBoxVal - 1500) / 10000];

                    rmsPlotData[0][1] = rmsPlotData[10][1] = (settings.defaultContinuousStallTorque * altitConstant).toFixed(3);

                    rmsPlotData[1][1] = (settings.defaultContinuosTorqueAtMaxSpeed * altitConstant).toFixed(3);

                    tsPlotSeries[2].data = rmsPlotData;
                    settings.motorData[settings.motorSelectedIndex].continuousStallTorque = rmsPlotData[0][1];
                    settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed = rmsPlotData[1][1];

                }
                else{

                    var altitConstant = 1;

                    rmsPlotData[0][1] = rmsPlotData[10][1] = (settings.defaultContinuousStallTorque * altitConstant).toFixed(3);

                    rmsPlotData[1][1] = (settings.defaultContinuosTorqueAtMaxSpeed * altitConstant).toFixed(3);

                    tsPlotSeries[2].data = rmsPlotData;
                    settings.motorData[settings.motorSelectedIndex].continuousStallTorque = rmsPlotData[0][1];
                    settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed = rmsPlotData[1][1];
                }
                updateTSGraph(tsPlotSeries);
                updateMotorStatus();

                  
            });*/



            if (settings.disableControls && settings.disableControls.altitudeTextBox) {
                $container.find('.amount_ALTITUDE').attr("disabled", true);
            }


        };

        var altitudeImpactOnTSCurve = function (changedValue) {

            if (tsPlot == undefined) {
                return;
            }
            $container.find(".altitude-unit-combobox").data('unitsComboBox').setTextBoxValue(changedValue);
            var tsPlotSeries = tsPlot.getData();
            var rmsPlotData = tsPlotSeries[2].data;
            settings.altitude = changedValue;

            if (changedValue > 1500) {

                var altitConstant = [1 - (changedValue - 1500) / 10000];

                rmsPlotData[0][1] = rmsPlotData[10][1] = (settings.motorData[settings.motorSelectedIndex].defaultContinuousStallTorque * altitConstant).toFixed(3);

                rmsPlotData[1][1] = (settings.motorData[settings.motorSelectedIndex].defaultContinuosTorqueAtMaxSpeed * altitConstant).toFixed(3);

                tsPlotSeries[2].data = rmsPlotData;
                settings.motorData[settings.motorSelectedIndex].continuousStallTorque = rmsPlotData[0][1];
                settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed = rmsPlotData[1][1];

            }
            else {

                var altitConstant = 1;

                rmsPlotData[0][1] = rmsPlotData[10][1] = (settings.defaultContinuousStallTorque * altitConstant).toFixed(3);

                rmsPlotData[1][1] = (settings.defaultContinuosTorqueAtMaxSpeed * altitConstant).toFixed(3);

                tsPlotSeries[2].data = rmsPlotData;
                settings.motorData[settings.motorSelectedIndex].continuousStallTorque = rmsPlotData[0][1];
                settings.motorData[settings.motorSelectedIndex].continuosTorqueAtMaxSpeed = rmsPlotData[1][1];
            }
            updateTSGraph(tsPlotSeries);
            updateMotorStatus();

        }
        // generates Transmission Ratio slider accordion
        var generateTransmissionRatioAccordion = function ($containerEle) {
            var $trRatioPanel = $('<div class="panel panel-default"></div>');
            $containerEle.append($trRatioPanel);

            var $trRatioPanelHeading = $('<div class="panel-heading" role="tab" id="headingFour"> <h4 class="panel-title"> <a role="button"  data-toggle="collapse"  href="#collapseFour' + settings.uniqeId + '" aria-controls="collapseFour" aria-expanded="false"><span> Transmission Ratio</span> <span class="accordion-plus-minus glyphicon pull-right glyphicon-chevron-down fa fa-chevron-down" aria-hidden="true" style="color: grey;"></span> </a> </h4> </div>');
            $trRatioPanel.append($trRatioPanelHeading);
            var transmissionPane = 'show';
            if (settings.openTransmPanel == false) {
                transmissionPane = 'in';
            }

            var $trRatioPanelBodyContainer = $('<div id="collapseFour' + settings.uniqeId + '" class="panel-collapse collapse in ' + transmissionPane + '" role="tabpanel" aria-labelledby="headingFour"></div>');
            $trRatioPanel.append($trRatioPanelBodyContainer);

            var $trRatioPanelBody = $('<div class="panel-body"></div>')
            $trRatioPanelBodyContainer.append($trRatioPanelBody);

            $trRatioPanel.on('show.bs.collapse', function (e) {
                $(this).find('.accordion-plus-minus').removeClass('glyphicon-chevron-down fa fa-chevron-down').addClass('glyphicon-chevron-up fa fa-chevron-up');
            });
            $trRatioPanel.on('hide.bs.collapse', function (e) {
                $(this).find('.accordion-plus-minus').removeClass('glyphicon-chevron-up fa fa-chevron-up').addClass('glyphicon-chevron-down fa fa-chevron-down');
            });

            generateTransmissionRatioConfigPanel($trRatioPanelBody);
        }

        // generates Transmission Ratio slider accordion body
        var generateTransmissionRatioConfigPanel = function ($containerEle) {
            var $transmissionRatioPanelContainer = $('<div id="transmissionRatioPanelContainer"></div>');
            $containerEle.append($transmissionRatioPanelContainer);

            var $trRatioSliderContainer = $('<div  class="row"></div>');
            $transmissionRatioPanelContainer.append($trRatioSliderContainer);

            var $trRatioTitle = $('<div class="col-xs-3 col-3 title"><span id="trRatioTitle">Transmission Ratio: </span></div>');
            $trRatioSliderContainer.append($trRatioTitle);

            /*var $trRatioSlider = $('<div class="col-xs-4 col-4  " ><input id="trRatioSlider" data-slider-id="sizeSlider" type="text" data-slider-tooltip="hide"/></div>');
            $trRatioSliderContainer.append($trRatioSlider);*/

            var $trRatioslider = $('<div class="col-xs-6 col-6 trRatioSlider"></div>');
            $trRatioSliderContainer.append($trRatioslider);

            var $transmContainer = $('<div class="transmContainer"><div class="transmInnerContainer"></div></div>');
            $trRatioslider.append($transmContainer);

            var $transmLabel = $('<div class="transmLabel"><ul><li class="firstLi">1:1</li><li class="secondLi">10:1</li><li class="thirdLi">100:1</li><li class="fourthLi">1000:1</li></ul></div>');
            $trRatioslider.append($transmLabel);

            var $trRatioInput = $('<div class="col-xs-3 col-3 trRatioValue"><input type="text" value="' + settings.transmissionRaioVal + '" class="transInputBox form-control text-left input-control" id="transInputBox"/> </div>');
            $trRatioSliderContainer.append($trRatioInput);

            settings.defaultRmsTorque = settings.rmsMotorData[1];
            settings.defaultRmsSpeed = settings.rmsMotorData[0];
            settings.defaultPeakTorque = settings.peakMotorData[1];
            settings.defaultPeakSpeed = settings.peakMotorData[0];


            var transmissionTxtEnable = 'true';
            var transmissionComboBoxEnable = 'true';

            var setTransmSliderPointer = function (value) {
                settings.transmTextChange = true;
                settings.sliderVal = Math.log(value) / Math.log('1.071519305');
                $trRatioslider.find(".transmContainer").mCustomScrollbar('scrollTo', settings.sliderVal + '%');

            };

            if (settings.disableControls && settings.disableControls.transmission) {
                transmissionTxtEnable = 'false';
                transmissionComboBoxEnable = 'false';
            }

            var $containerWidth = $container.find('.tsCruveContainer').find('#transmissionRatioPanelContainer');

            if ($containerWidth.width() <= 502) {
                $containerWidth.find(".transmContainer").css('width', '210px');
                $containerWidth.find(".transmInnerContainer").css('width', '2310px');
                $containerWidth.find(".transmLabel").find('li.firstLi').css('left', '35px');
                $containerWidth.find(".transmLabel").find('li.secondLi').css('left', '83px');
                $containerWidth.find(".transmLabel").find('li.thirdLi').css('left', '132px');
                $containerWidth.find(".transmLabel").find('li.fourthLi').css('left', '182px');
                setTimeout(function () {
                    generateTransmSlider('21', '21');
                }, 500);

            } else {
                setTimeout(function () {
                    generateTransmSlider('26', '26');
                }, 50);
            }

            var timerId = 0;
            var formatTextBoxValue = function (value) {

                if ($container.find("input.transInputBox").is(":focus")) {

                    console.log("input has focus, don't format")
                    return;
                }

                if (numberFormatter) {
                    value = numberFormatter.format(value, true);
                }
                $container.find("input.transInputBox").val(value);

            }

            var transmTextboxEventHandler = function () {
                $container.find("input.transInputBox").on('focus', function () {

                    $(this).val(settings.transmissionRaioVal);
                });

                $container.find("input.transInputBox").on('blur', function () {

                    formatTextBoxValue(this.value);
                });
                $container.find("input.transInputBox").on('input', function () {

                    var self = this;
                    settings.value = $(self).val();
                    if (timerId > 0) {
                        clearTimeout(timerId);
                    }

                    timerId = setTimeout((function () {

                        if (self.value > 1000) {
                            $(self).val(settings.transmissionRaioVal);
                            setAlertMessage("Transmission ratio value can not be greater than 1000.");
                            return false;
                        }

                        if (self.value <= 0) {
                            $(self).val(settings.transmissionRaioVal);
                            setAlertMessage("Transmission ratio value can not be less than 1.");
                            return false;
                        }
                        setAlertMessage("");
                        settings.transmissionRaioVal = $(self).val();
                        setTransmSliderPointer($(self).val());
                        updateMotorOperatingPoints('TransmissionRatio', $(self).val());

                    }), 800);


                });
            }
            transmTextboxEventHandler();

            var $traioLabel = $('<div class="transmissionRaioVal">&nbsp;: 1</div>');
            $trRatioInput.append($traioLabel);

            $trRatioInput.append('<div class="response-status"><span class="fa"></span><span class="correct-answer"></span></div>');

            if (settings.disableControls && settings.disableControls.transmRatioSlider) {
             
                $container.find(".trRatioSlider").addClass('pointer-events-none');
                
            }         

            if (settings.disableControls && settings.disableControls.transmRatioTextBox) {
                $container.find('.trRatioValue').find('.transInputBox ').attr("disabled", true);
            }

            $transmissionRatioPanelContainer.append('<div id="alertMessageContainer" class="alert alert-warning"><strong>Warning:-&nbsp;&nbsp;</strong><span></span></div>');
            $(".mCSB_buttonRight, .mCSB_buttonLeft, .mCSB_draggerContainer, #mCSB_1_dragger_horizontal").click(function (e) {

                settings.transmTextChange = false;

            });
            $("#mCSB_1_dragger_horizontal").mouseenter(function () {
                settings.transmTextChange = false;
            });

            var setAlertMessage = function (alertText) {
                if (alertText === "") {
                    $transmissionRatioPanelContainer.find('#alertMessageContainer').hide();
                    return;
                }

                $transmissionRatioPanelContainer.find('#alertMessageContainer span').text(alertText);

                $transmissionRatioPanelContainer.find('#alertMessageContainer').show();

                setTimeout(function () {
                    $transmissionRatioPanelContainer.find('#alertMessageContainer').fadeOut("slow");
                }, 5000)
            };

        };


        var generateTransmSlider = function (scrollAmount, snapAmount) {

            var timerId = 0;
            $container.find(".transmContainer").mCustomScrollbar({
                axis: "x",
                theme: "rounded-dark",
                scrollButtons: { enable: true, scrollAmount: scrollAmount, scrollType: "stepped" },
                keyboard: { enable: false },
                mouseWheel: { enable: false },
                scrollInertia: 10,
                snapAmount: snapAmount,
                snapOffset: 0,
                advanced: { autoExpandHorizontalScroll: 2, updateOnContentResize: true },
                callbacks: {
                    whileScrolling: function () {
                        console.log('onScroll', this.mcs.leftPct);
                        if (settings.transmTextChange == false) {
                            calculteSliderLogVal(this.mcs.leftPct);
                        }
                    }
                }
            });

            settings.transmTextChange = true;
            settings.sliderVal = Math.log(settings.transmissionRaioVal) / Math.log('1.071519305');
            $container.find(".transmContainer").mCustomScrollbar('scrollTo', settings.sliderVal + '%', {
                timeout: 1000
            });


            var calculteSliderLogVal = function (value) {

                var logVal = Math.pow(1.07151930525057, (value));
                logVal = numberFormatter.format(logVal);
                if (logVal > 12) {
                    logVal = Math.round(logVal);
                }
                settings.transmissionRaioVal = logVal;
                $container.find('.transInputBox').val(logVal);
                updateMotorOperatingPoints('TransmissionRatio', logVal);

            };
            $(".mCSB_buttonRight, .mCSB_buttonLeft, .mCSB_draggerContainer, #mCSB_1_dragger_horizontal").click(function (e) {

                settings.transmTextChange = false;

            });
            $("#mCSB_1_dragger_horizontal, .mCSB_dragger").mouseenter(function () {

                settings.transmTextChange = false;
            });

        };

        var generateSlider = function ($containerEle, params) {
            $containerEle.slider(params);
        };

        // generates TS Curve grapgh plot area
        var generateTSCurvePlotArea = function ($containerEle) {

            var $titleSection = $('<div class="titleSection" id="tsMotorName">Motor T-S Curve : ' + settings.motorData[settings.motorSelectedIndex].motorPartNo + '</div>');
            $containerEle.append($titleSection);

            var $tsCurveContainer = $('<div class="tsPlotContainer"></div>');
            $containerEle.append($tsCurveContainer);
            var $tsCurvePlotArea = $('<div class="tsPlotArea"></div>');
            $tsCurveContainer.append($tsCurvePlotArea);

            /*var $curveConfigContainer = $('<div class="curveConfigContainer row"></div>');
            $containerEle.append($curveConfigContainer);

            if (settings.showQuadrantToggle) {
                generatePlotModeToggleSwitch($curveConfigContainer);
            }*/

            updateMotorData(settings.motorSelectedIndex + 1);
            calculateTSCurevePoints();
        };

        // generates quadrant toggle switch
        var generatePlotModeToggleSwitch = function ($containerEle) {
            var $plotModeRadio = $('<div class="plotModeContainer"> <label id="quadrantTitle">Quadrant: &nbsp;&nbsp;&nbsp;</label> <div class="btn-group" id="plotModeToggle"> <button id="1quad" value="1" class="btn btn-default">Single</button> <button id="4quad" value="4" class="btn btn-default">Four</button> </div></div>');
            if (settings.quadrant) {
                $plotModeRadio.find('#' + settings.quadrant + 'quad').addClass('selectedQuad');
            }
            $containerEle.append($plotModeRadio);

            $plotModeRadio.find('#plotModeToggle .btn').click(function () {
                if (!$(this).hasClass('selectedQuad')) {
                    $plotModeRadio.find('.selectedQuad').removeClass('selectedQuad');
                    $(this).addClass('selectedQuad');
                    settings.quadrant = parseInt($(this).val());

                    calculateTSCurevePoints();
                }
            });
        };

        // generates motor spec table container
        var generateServoMotorSpec = function ($containerEle) {
            var $motorInfoContainer = $container.find('.tsCruveContainer');
            var $servoMotorInfoContainer = $('<div id="servoMotorInfoContainer" class="tsModal"></div>');
            $motorInfoContainer.append($servoMotorInfoContainer);
            var $servoMotorSpecPanelData = $('<div class="motorSpecTable"></div>');
            updateMotorSpecTable(settings.motorSelectedIndex, $servoMotorSpecPanelData);
            $servoMotorInfoContainer.append($servoMotorSpecPanelData);
        };

        // generates selected motor spec table data 
        var updateMotorSpecTable = function (selectedIndex) {

            var $tableContainer = $container.find('#servoMotorInfoContainer').find('.motorSpecTable');

            var $tableEle = $tableContainer.find('table');
            if ($tableEle.length > 0) {
                $tableEle.remove();
            }
            var $tableEle = $('<table class="table table-striped"></table>');
            var $tableTitle = $('<caption class="motorTableTitle">Motor Specifications - ' + settings.motorData[selectedIndex].motorPartNo + '<div class="closeButtonStyle">X</div></caption>');
            var $tableHead = $('<thead><tr><th class="leftCol tableTitle">Parameters</th><th class="rightCol tableTitle">Value</th></tr></thead>');
            var $tableBody = $('<tbody></tbody>');

            $tableContainer.append($tableEle);
            $tableEle.append($tableTitle);
            $tableEle.append($tableHead);
            $tableEle.append($tableBody);

            $tableBody.append('<tr> <td class="leftCol"> Frame Size </td><td class="rightCol">' + settings.motorData[selectedIndex].FrameSize + '</td></tr>');
            $tableBody.append('<tr> <td class="leftCol"> Peak Stall Torque </td><td class="rightCol">' + settings.motorData[selectedIndex].peakStallTorque + ' N-m</td></tr>');
            $tableBody.append('<tr> <td class="leftCol"> Roll Off Point </td><td class="rightCol">' + settings.motorData[selectedIndex].rollOffPoint + ' N-m</td></tr>');
            $tableBody.append('<tr> <td class="leftCol"> Roll Off Speed </td><td class="rightCol">' + settings.motorData[selectedIndex].rollOffSpeed + ' rpm</td></tr>');
            $tableBody.append('<tr> <td class="leftCol"> Max Speed </td><td class="rightCol">' + settings.motorData[selectedIndex].maxSpeed + ' rpm</td></tr>');
            $tableBody.append('<tr> <td class="leftCol"> Peak Torque at Max Speed </td><td class="rightCol">' + settings.motorData[selectedIndex].peakTorqueAtMaxSpeed + ' N-m</td></tr>');
            $tableBody.append('<tr> <td class="leftCol"> Continuous Stall Torque </td><td class="rightCol">' + settings.motorData[selectedIndex].continuousStallTorque + ' N-m</td></tr>');
            $tableBody.append('<tr> <td class="leftCol"> Continuos Torque at Max Speed </td><td class="rightCol">' + settings.motorData[selectedIndex].continuosTorqueAtMaxSpeed + ' N-m</td></tr>');
        };

        // graph points calculations
        var calculateTSCurevePoints = function () {
            var TSCurveData = [];
            var TSCurveOptions = {
                colors: [settings.graphLineColor.peakTSCurve, settings.graphLineColor.peakTSCurve, settings.graphLineColor.contionusTSCurve, settings.graphLineColor.contionusTSCurve],
                series: {
                    points: {
                        show: true
                    }
                },
                legend: {
                    backgroundOpacity: 0,
                },
                coordinate: {
                    type: 'rectangular'
                },
                axisLabels: {
                    show: true
                },
                xaxis: {
                    axisLabel: "Speed (rpm)",
                    tickFormatter: tickFormatter


                },
                yaxis: {
                    axisLabel: "Torque (N-m)",
                    tickFormatter: tickFormatter

                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    // borderWidth: 1, Removed duplicate property.
                    borderColor: '#333',
                    borderWidth: {
                        top: 0,
                        right: 0,
                        bottom: 1,
                        left: 1
                    },
                    margin: 0,
                    markings: [{
                        yaxis: {
                            from: 0,
                            to: 0,
                            tickFormatter: tickFormatter
                        },
                        color: "#333"
                    },
                    { xaxis: { from: 0, to: 0 }, color: "#333" },
                    { xaxis: { from: 0, to: settings.xaxisMaxVale, tickFormatter: tickFormatter }, color: "#fff", }
                    ],
                },
                tooltip: true,
                tooltipOpts: {
                    cssClass: "tsCurveFlotTip",
                    content: function (label, xval, yval, flotItem) {
                        var title = "";
                        switch (flotItem.seriesIndex) {
                            case 0:
                                switch (flotItem.dataIndex) {
                                    case 0:
                                        title = "Peak Stall Torque <br />";
                                        break;
                                    case 1:
                                        title = "Roll Off Point<br />";
                                        break;
                                    case 2:
                                        title = "Peak Torque at Max Speed <br />";
                                        break;
                                    case 3:
                                        title = "Max Speed at Zero Torque <br />";
                                        break;
                                }
                                break;
                            case 1:
                                title = "Peak T/S Point <br />";
                                break;
                            case 2:
                                switch (flotItem.dataIndex) {
                                    case 0:
                                        title = "Continuous Stall Torque <br />";
                                        break;
                                    case 1:
                                        title = "Continuous Stall Torque at Max Speed <br />";
                                        break;
                                    case 2:
                                        title = "Max Speed Point <br />";
                                        break;
                                }
                                break;
                            case 3:
                                title = "RMS T/S Point <br />";
                                break;
                        }
                        return title + "Speed: " + numberFormatter.format(xval, true) + ", Torque: " + numberFormatter.format(yval, true);
                    },
                    defaultTheme: false,
                    shifts: {
                        x: 0,
                        y: 20
                    }
                }
            };

            if (settings.quadrant == 1) {
                TSCurveOptions.xaxis.min = 0;
                TSCurveOptions.yaxis.min = 0;
            }

            var peakTorqueGraphData = [];
            var contTorqueGraphData = [];

            var applicationElementGraphData = [];
            var applicationRMSGraphData = [];

            var positiveVelocityPointsPeakTorque = [];
            var negativeVelocityPointsPeakTorque = [];

            var positiveVelocityPointsContTorque = [];
            var negativeVelocityPointsContTorque = []

            var resetData = function () {
                peakTorqueGraphData = [];
                contTorqueGraphData = [];
                applicationElementGraphData = [];
                applicationRMSGraphData = [];

                positiveVelocityPointsPeakTorque = [];
                negativeVelocityPointsPeakTorque = [];

                positiveVelocityPointsContTorque = [];
                negativeVelocityPointsContTorque = [];
            };

            var interpolatePositiveVelocityDataPoints = function (motorPoints) {
                var maxPositiveVelocity = motorPoints.maxSpeed;
                positiveVelocityPointsPeakTorque = [
                    [0, motorPoints.peakStallTorque],
                    [motorPoints.rollOffSpeed, motorPoints.rollOffPoint],
                    [maxPositiveVelocity, motorPoints.peakTorqueAtMaxSpeed],
                    [maxPositiveVelocity, 0]
                ];

                positiveVelocityPointsContTorque = [
                    [0, motorPoints.continuousStallTorque],
                    [maxPositiveVelocity, motorPoints.continuosTorqueAtMaxSpeed],
                    [maxPositiveVelocity, 0]
                ];
            };

            var interpolateNegativeVelocityDataPoints = function (motorPoints) {
                var maxNegativeVelocity = -1 * motorPoints.maxSpeed;
                negativeVelocityPointsPeakTorque = [
                    [maxNegativeVelocity, 0],
                    [maxNegativeVelocity + 1, motorPoints.peakStallTorque]
                ];

                negativeVelocityPointsContTorque = [
                    [maxNegativeVelocity, 0],
                    [maxNegativeVelocity + 1, motorPoints.continuousStallTorque]
                ];
            };

            var updatefirstQadrant = function (motorPoints) {

                peakTorqueGraphData = peakTorqueGraphData.concat(positiveVelocityPointsPeakTorque);

                contTorqueGraphData = contTorqueGraphData.concat(positiveVelocityPointsContTorque);
            };

            var updatefourthQuadrant = function (motorPoints) {
                var fourthQuadPointsPeakTorque = [];
                var fourthQuadPointsContTorque = [];

                if (negativeVelocityPointsPeakTorque.length > 0) {
                    negativeVelocityPointsPeakTorque.forEach(function (element, index, array) {
                        var currentElement = [];
                        currentElement[0] = -1 * element[0];
                        currentElement[1] = -1 * element[1];
                        fourthQuadPointsPeakTorque[index] = currentElement;
                    });
                }
                peakTorqueGraphData = peakTorqueGraphData.concat(fourthQuadPointsPeakTorque);

                if (negativeVelocityPointsContTorque.length > 0) {
                    negativeVelocityPointsContTorque.forEach(function (element, index, array) {
                        var currentElement = [];
                        currentElement[0] = -1 * element[0];
                        currentElement[1] = -1 * element[1];
                        fourthQuadPointsContTorque[index] = currentElement;
                    });
                }

                contTorqueGraphData = contTorqueGraphData.concat(fourthQuadPointsContTorque);
            };

            var updateThirdQuadrant = function (motorPoints) {
                var thirdQuadPointsPeakTorque = [];
                var thirdQuadPointsContTorque = [];

                if (positiveVelocityPointsPeakTorque.length > 0) {
                    positiveVelocityPointsPeakTorque.forEach(function (element, index, array) {
                        var currentElement = [];
                        currentElement[0] = -1 * element[0];
                        currentElement[1] = -1 * element[1];
                        thirdQuadPointsPeakTorque[index] = currentElement;
                    });
                }
                peakTorqueGraphData = peakTorqueGraphData.concat(thirdQuadPointsPeakTorque);

                if (positiveVelocityPointsContTorque.length > 0) {
                    positiveVelocityPointsContTorque.forEach(function (element, index, array) {
                        var currentElement = [];
                        currentElement[0] = -1 * element[0];
                        currentElement[1] = -1 * element[1];
                        thirdQuadPointsContTorque[index] = currentElement;
                    });
                }
                contTorqueGraphData = contTorqueGraphData.concat(thirdQuadPointsContTorque);
            };

            var updateSecondQuadrant = function (motorPoints) {
                peakTorqueGraphData = peakTorqueGraphData.concat(negativeVelocityPointsPeakTorque);

                contTorqueGraphData = contTorqueGraphData.concat(negativeVelocityPointsContTorque);
            };

            var coCOMPeteCycle = function (motorPoints) {

                peakTorqueGraphData.push([0, (motorPoints.peakStallTorque)]);

                contTorqueGraphData.push([0, motorPoints.continuousStallTorque]);
            };
            var addTempEffectOnMotorData = function (motorPoints) {
                var ta = motorPoints.temp; // Application temperature
                var tr = 40 // Rating ambient (the ambient at which the motor is rated - default 40 degrees)
                var twl = 155 // Limiting winding temperature in degree celcius
                var ts = 25 //Motor specification Temperature

                var tm = ta + (0.6 * (twl - ta)); //Actual Magnet Temperature
                var tmr = tr + (0.6 * (twl - tr)); //Rating Magnet Temperature
                var Km = -0.0015; // is the temperature coefficient of the rotor magnets


                var K1 = (1 - (ta - tr) / (twl - tr));
                var K2 = ((ts + 234.5) / (tmr + 234.5));
                var K3 = (1 + (tm - tmr) * Km);


                motorPoints.peakStallTorque = (motorPoints.peakStallTorque * K3).toFixed(2);
                motorPoints.rollOffPoint = (motorPoints.rollOffPoint * K3).toFixed(2);
                motorPoints.rollOffSpeed = (motorPoints.rollOffSpeed / K3).toFixed(2);
                motorPoints.continuousStallTorque = (motorPoints.continuousStallTorque * (K3 * Math.sqrt(K1 / K2))).toFixed(2);
                motorPoints.continuosTorqueAtMaxSpeed = (motorPoints.continuosTorqueAtMaxSpeed * (K3 * Math.sqrt(K1 / K2))).toFixed(2);


                //settings.defaultPeakStallTorque =  motorPoints.peakStallTorque;
                //settings.defaultRollOffPoint =  motorPoints.rollOffPoint;
                //settings.defaultRollOffSpeed =  motorPoints.rollOffSpeed;
                //settings.defaultPeakTorqueAtMaxSpeed =  motorPoints.peakTorqueAtMaxSpeed;
                //settings.defaultContinuousStallTorque =  motorPoints.continuousStallTorque;
                //settings.defaultContinuosTorqueAtMaxSpeed =  motorPoints.continuosTorqueAtMaxSpeed;


                return motorPoints;

            }

            var updateFourQuadrantData = function (motorPoints) {
                // 1st Quadrant, starting from (0,0)
                updatefirstQadrant(motorPoints);
                updatefourthQuadrant(motorPoints);
                updateThirdQuadrant(motorPoints);
                updateSecondQuadrant(motorPoints);
                coCOMPeteCycle(motorPoints);
            };

            var updateDataforTorqueGraph = function (motorPoints) {

                resetData();
                interpolatePositiveVelocityDataPoints(motorPoints);
                interpolateNegativeVelocityDataPoints(motorPoints);
                updateFourQuadrantData(motorPoints);

            };

            if (settings.showMotorTsCurve) {
                updateDataforTorqueGraph(settings.motorData[settings.motorSelectedIndex]);
            }

            if (settings.showApplicationPoints) {
               
                settings.peakMotorData[0] = (settings.peakMotorData[0]);
                settings.peakMotorData[1] = (settings.peakMotorData[1]);
                settings.rmsMotorData[0] = (settings.rmsMotorData[0]);
                settings.rmsMotorData[1] = (settings.rmsMotorData[1]);
                applicationElementGraphData.push(settings.peakMotorData);
                applicationRMSGraphData.push(settings.rmsMotorData);
            }

            TSCurveData.push({
                data: peakTorqueGraphData,
                label: 'Peak',
                lines: {
                    lineWidth: 2,
                    show: true,
                },
            }, {
                    data: applicationElementGraphData,
                    label: '',
                    points: {
                        show: true,
                        fillColor: settings.graphLineColor.peakTSCurve,
                        radius: 4
                    }
                }, {
                    data: contTorqueGraphData,
                    label: 'Continous',
                    lines: {
                        lineWidth: 2,
                        show: true,
                    },
                }, {
                    data: applicationRMSGraphData,
                    label: '',
                    points: {
                        show: true,
                        fillColor: settings.graphLineColor.contionusTSCurve,
                        radius: 4
                    }
                });

            var inputData = {
                "peakTorque": settings.peakPoints[1],
                "peakSpeed": settings.peakPoints[0],
                "rmsTorque": settings.rmsPoints[1],
                "peakAcceleration": settings.peakAcceData,
                "rmsAcceleration": settings.rmsAcceData,
                "temperature":settings.temperature,
                "altitude": settings.altitude,
                "motorIndex": settings.motorSelectedIndex,
                "transmissionRatio": settings.transmissionRaioVal
            }

            var outputData = {
                "motorInertia": settings.motorInertia,
                "motorStatus": settings.motorStatus,
                "temperature":settings.temperature,
                "altitude": settings.altitude,
                "transmissionRatio": settings.transmissionRaioVal,
                "peakTorqueMotorSide":settings.peakMotorData[1],
                "rmsTorqueMotorSide":settings.rmsMotorData[1],
                "peakSpeedMotorSide": settings.peakMotorData[0],
                "peakAccelerationMotorSide": settings.peakAcceMotor,
                "rmsAccelerationMotorSide":settings.rmsAcceMotor,
                "selectedMotor": settings.motorData[settings.motorSelectedIndex].motorPartNo,
                "maxSpeed": settings.motorData[settings.motorSelectedIndex].maxSpeed,
                "contStallTorque": settings.motorData[settings.motorSelectedIndex].continuousStallTorque,
                "peakStallTorque": settings.motorData[settings.motorSelectedIndex].peakStallTorque
            };

            if (settings.notifyIOData && typeof settings.notifyIOData == "function") {
                settings.notifyIOData({ "inputs": inputData, "output": outputData });
            }

            if (!tsPlot) { // graph plotted already
                plotTSGraph(TSCurveData, TSCurveOptions);
            } else {
                updateTSGraph(TSCurveData, TSCurveOptions);
            }
        };

        // check for motor pass/fail status
        var checkMotorStatus = function (selectedMotorData) {

            var motorData = selectedMotorData;
            var elementData = settings.peakMotorData;
            var rmsData = settings.rmsMotorData;
            var motorPoints = {
                "PeakStallPoint": {
                    "x": 0,
                    "y": motorData.peakStallTorque
                },
                "RollOffPoint": {
                    "x": motorData.rollOffSpeed,
                    "y": motorData.rollOffPoint
                },
                "PeakTarqueAtMaxSpeedPoint": {
                    "x": motorData.maxSpeed,
                    "y": motorData.peakTorqueAtMaxSpeed
                },
                "ContinuousStallTorquePoint": {
                    "x": 0,
                    "y": motorData.continuousStallTorque
                },
                "ContinuousStallTorqueMaxSpeedPoint": {
                    "x": motorData.maxSpeed,
                    "y": motorData.continuosTorqueAtMaxSpeed
                }
            };

            var passStatus = 0; // 0 for nutral, 1 for pass, -1 for fail.
            var status = null;
            var torqueUtilizationArray = [];
            var speedUtilizationArray = [];
            var averagePowerArray = [];
            var torqueUtilization = null;
            var speedUtilization = null;
            var avgPower = null;
            var obj = {
                "status": status,
                "torqueUtilization": torqueUtilization,
                "speedUtilization": speedUtilization,
                "avgPower": avgPower
            };

            // RMS torque point
            var rmsVelocity = rmsData[0];
            var rmsTorque = rmsData[1];

            var peakVelocity = elementData[0];
            var peakTorque = elementData[1];
            var initialVelocity = 0;
            var initialTorque = 0;

            var peakTSPointCheck = false;
            var rmsTorquePointCheck = false;

            var pointA = null;
            var pointB = null;
            var pointC = null;


            // for continuous torque.
            if (rmsVelocity <= motorData.maxSpeed /* && rmsTorque <= motorData.continuousStallTorque*/) {
                pointA = [motorPoints.ContinuousStallTorquePoint.x, motorPoints.ContinuousStallTorquePoint.y];
                pointB = [motorPoints.ContinuousStallTorqueMaxSpeedPoint.x, motorPoints.ContinuousStallTorqueMaxSpeedPoint.y];
                pointC = [rmsVelocity, rmsTorque];
                rmsTorquePointCheck = drawLine(pointA, pointB, pointC, true); // boolean variable is passed as true which tells that we have to calculate the power utilization when we are calling drawLine() function.
            } else {
                // Point is beyond the max speed point.
                passStatus = -1;
                calculatePowerUtilization([rmsVelocity, rmsTorque]);
            }

            // for peak values
            if (peakTorque <= motorData.peakStallTorque && peakVelocity <= motorData.maxSpeed) {
                if (peakVelocity <= motorPoints.RollOffPoint.x) {
                    pointA = [motorPoints.PeakStallPoint.x, motorPoints.PeakStallPoint.y];
                    pointB = [motorPoints.RollOffPoint.x, motorPoints.RollOffPoint.y];
                    pointC = [peakVelocity, peakTorque];
                    peakTSPointCheck = drawLine(pointA, pointB, pointC, false);
                } else {
                    pointA = [motorPoints.RollOffPoint.x, motorPoints.RollOffPoint.y];
                    pointB = [motorPoints.PeakTarqueAtMaxSpeedPoint.x, motorPoints.PeakTarqueAtMaxSpeedPoint.y];
                    pointC = [peakVelocity, peakTorque];
                    peakTSPointCheck = drawLine(pointA, pointB, pointC, false);
                }
            } else {
                // Point is beyond the max speed point.
                passStatus = -1;
                calculateTorqueSpeedUtilization([peakVelocity, peakTorque]);
            }

            if (passStatus == -1 || peakTSPointCheck == false || rmsTorquePointCheck == false) {
                passStatus = -1;
            }

            if (passStatus == -1) {
                obj.status = false
            } else if (passStatus == 0) {
                obj.status = true;
            }

            obj.torqueUtilization = Math.max.apply(Math, torqueUtilizationArray);
            obj.speedUtilization = Math.max.apply(Math, speedUtilizationArray);
            obj.avgPower = Math.max.apply(Math, averagePowerArray);

            // pointC is the point for which we are checking the value of equation of line.
            function drawLine(pointA, pointB, pointC, forPower) {

                var pointStatus = false;

                // equation of line "mx-y-(mx1-y1)" so m = y-y1/x-x1
                var m = (pointB[1] - pointA[1]) / (pointB[0] - pointA[0]);
                var c = pointA[1] - m * pointA[0];
                var b = -1;

                var valueAtPointC = m * pointC[0] - pointC[1] + c;
                if ((valueAtPointC == 0) || (valueAtPointC > 0 && b < 0) || (valueAtPointC < 0 && b > 0)) {
                    pointStatus = true;
                } else {
                    pointStatus = false;
                }

                if (!forPower) {
                    // calculation for Torque and Speed utilization.
                    var peakTorqueUtilization = (pointC[1] * 100) / (m * pointC[0] + c);
                    var peakSpeedUtilization = (pointC[0] * 100) / motorData.maxSpeed;
                    torqueUtilizationArray.push(peakTorqueUtilization);
                    speedUtilizationArray.push(peakSpeedUtilization);
                } else {
                    // calculation for average power utilization. formula: power = speed * torque.
                    var powerOfApp = pointC[0] * pointC[1];
                    var powerOfMotor = pointC[0] * (m * pointC[0] + c);
                    var avgPower = (powerOfApp * 100) / powerOfMotor;
                    averagePowerArray.push(avgPower);
                }

                return pointStatus;
            }

            function calculateTorqueSpeedUtilization(pointC) {
                var peakTorqueUtilization = (pointC[1] * 100) / motorData.peakStallTorque;
                var peakSpeedUtilization = (pointC[0] * 100) / motorData.maxSpeed;
                torqueUtilizationArray.push(peakTorqueUtilization);
                speedUtilizationArray.push(peakSpeedUtilization);
            }

            function calculatePowerUtilization(pointC) {
                var powerOfApp = pointC[0] * pointC[1];
                var powerOfMotor = pointC[0] * motorData.continuousStallTorque;
                var avgPower = (powerOfApp * 100) / powerOfMotor;
                averagePowerArray.push(avgPower);
            }

            return obj;
        };

        var updatePlotMaxMinValues = function () {
            var tsPlotAxes = tsPlot.getAxes();

            /* if (settings.showMotorTsCurve) {
                 var maxY = Math.max(settings.peakMotorData[1] + 1, settings.rmsMotorData[1] + 1, 35);
 
                 if (tsPlotAxes.yaxis.datamax < maxY) {
                     tsPlot.getOptions().yaxes[0].max = maxY;
                 } else {
 
                     tsPlot.getOptions().yaxes[0].max = (tsPlotAxes.yaxis.datamax + 30);
                 }
 
             }*/
            // var tsPlotAxes = tsPlot.getAxes();

            // if (settings.showMotorTsCurve) {
            //  var maxX = Math.max(settings.peakPoints[0] + 50, settings.rmsPoints[0] + 50, 600);
            //  var maxY = Math.max(settings.peakPoints[1] + 10, settings.rmsPoints[1] + 10, 200);

            //  if (tsPlotAxes.xaxis.datamax < maxX) {
            //      tsPlot.getOptions().xaxes[0].max = maxX;
            //  } else {
            //      tsPlot.getOptions().xaxes[0].max = tsPlotAxes.xaxis.datamax + 50;
            //  }

            //  if (tsPlotAxes.yaxis.datamax < maxY) {
            //      tsPlot.getOptions().yaxes[0].max = maxY;
            //  } else {
            //      tsPlot.getOptions().yaxes[0].max = tsPlotAxes.yaxis.datamax + 20;
            //  }


            //  if (settings.quadrant === 4) {
            //      // tsPlot.getOptions().yaxes[0].min = -1 * maxX;
            //      // tsPlot.getOptions().xaxes[0].min = -1 * maxY;

            //      // if (tsPlotAxes.xaxis.min < -1 * maxX) {
            //      //  tsPlot.getOptions().xaxes[0].min = -1 * maxX;
            //      // }

            //      // if (tsPlotAxes.yaxis.min < -1 * maxY) {
            //      //  tsPlot.getOptions().yaxes[0].min = -1 * maxY;
            //      // }

            //      if (tsPlotAxes.xaxis.datamin < -1*maxX) {
            //          tsPlot.getOptions().xaxes[0].min = -1*maxX;
            //      } else {
            //          tsPlot.getOptions().xaxes[0].min = tsPlotAxes.xaxis.datamin - 50;
            //      }

            //      if (tsPlotAxes.yaxis.datamin < -1*maxY) {
            //          tsPlot.getOptions().yaxes[0].min = -1*maxY;
            //      } else {
            //          tsPlot.getOptions().yaxes[0].min = tsPlotAxes.yaxis.datamin - 20;
            //      }
            //  }
            // }

            if (!settings.showMotorTsCurve) {
                var maxX = Math.max(settings.peakMotorData[0] + 50, settings.rmsMotorData[0] + 50, 200);
                var maxY = Math.max(settings.peakMotorData[1] + 10, settings.rmsMotorData[1] + 10, 150);
                tsPlot.getOptions().yaxes[0].max = maxY;
                tsPlot.getOptions().xaxes[0].max = maxX;
                if (settings.quadrant === 4) {
                    tsPlot.getOptions().yaxes[0].min = -1 * maxY;
                    tsPlot.getOptions().xaxes[0].min = -1 * maxX;
                }
            }
        };

        var modifyTSPlot = function () {

            if (settings.quadrant == 4) {
                tsPlot.getOptions().grid.markings[0].color = "#bdbdbd";
                tsPlot.getOptions().grid.markings[1].color = "#bdbdbd"
            } else {
                tsPlot.getOptions().grid.markings[0].color = "#333";
                tsPlot.getOptions().grid.markings[1].color = "#333"
            }
            updatePlotMaxMinValues();
            tsPlot.setupGrid();
            tsPlot.draw();
        };

        var plotTSGraph = function (data, options) {



            setTimeout(function () {
                tsPlot = $.plot($container.find(".tsPlotArea"), data, options);
                modifyTSPlot();
                attachResizeToPlots();
                checkContainerWidth();
            }, 0);


        };

        var attachResizeToPlots = function () {

            $container.find('.tsCruveContainer').resize(function (e) {
                var ele = $(this);
                //console.log("ele.width()", ele.width())

                if (ele.find('#transmissionRatioPanelContainer').width() <= 502) {
                    ele.find(".transmContainer").css('width', '210px');
                    ele.find(".transmInnerContainer").css('width', '2310px');
                    // $container.find(".transmContainer").mCustomScrollbar("destroy");

                    setTimeout(function () {
                        generateTransmSlider('21', '21');
                    }, 500);
                    // $container.find(".transmContainer").mCustomScrollbar("update");


                    ele.find(".transmLabel").find('li.firstLi').css('left', '35px');
                    ele.find(".transmLabel").find('li.secondLi').css('left', '83px');
                    ele.find(".transmLabel").find('li.thirdLi').css('left', '132px');
                    ele.find(".transmLabel").find('li.fourthLi').css('left', '182px');
                }
                else {

                    ele.find(".transmContainer").css('width', '260px');
                    ele.find(".transmInnerContainer").css('width', '2860px');
                    //$container.find(".transmContainer").mCustomScrollbar("destroy");

                    setTimeout(function () {
                        generateTransmSlider('26', '26');
                    }, 500);

                    //$container.find(".transmContainer").mCustomScrollbar("update");


                    ele.find(".transmLabel").find('li.firstLi').css('left', '28px');
                    ele.find(".transmLabel").find('li.secondLi').css('left', '94px');
                    ele.find(".transmLabel").find('li.thirdLi').css('left', '160px');
                    ele.find(".transmLabel").find('li.fourthLi').css('left', '230px');

                }

                if (ele.width() <= 940) {
                    ele.find('#servoMotorArea').addClass('resizeWidth');
                    ele.find('#servoMotorTSCurve').addClass('resizeWidth');
                    ele.find('.tsPlotArea').css('min-height', ele.find('.tsPlotArea').width());
                    ele.find('#servoMotorArea').find('.response-status').find('.correct-answer').css('width', '88%');
                }
                else if (ele.width() > 940 && ele.width() < 1280) {

                    ele.find('#servoMotorArea').removeClass('resizeWidth');
                    ele.find('#servoMotorTSCurve').removeClass('resizeWidth');
                    ele.find('.tsPlotArea').css('min-height', ele.find('.tsPlotArea').width());
                    ele.find('#servoMotorArea').find('#envFactorsPanelContainer').find('.response-status').find('.correct-answer').css('width', 'auto');
                    ele.find('#servoMotorArea').find('.response-status').attr('title', $container.find('#envFactorsPanelContainer').find('.response-status').find('.correct-answer').text());


                }
                else {
                    ele.find('#servoMotorArea').removeClass('resizeWidth');
                    ele.find('#servoMotorTSCurve').removeClass('resizeWidth');
                    ele.find('.tsPlotArea').css('min-height', ele.find('.tsPlotArea').width());
                    ele.find('#servoMotorArea').find('.response-status').find('.correct-answer').css('width', '88%');
                }

                if (settings.autoResizer) {
                    settings.autoResizer();
                }



            });

        };

        var updateTSGraph = function (data, options) {
            var inputData = {
                "peakTorque": settings.peakPoints[1],
                "peakSpeed": settings.peakPoints[0],
                "rmsTorque": settings.rmsPoints[1],
                "peakAcceleration": settings.peakAcceData,
                "rmsAcceleration": settings.rmsAcceData,
                "temperature":settings.temperature,
                "altitude": settings.altitude,
                "motorIndex": settings.motorSelectedIndex,
                "transmissionRatio": settings.transmissionRaioVal
            }
            var outputData = {
                "motorInertia": settings.motorInertia,
                "motorStatus": settings.motorStatus,
                "temperature":settings.temperature,
                "altitude": settings.altitude,
                "transmissionRatio": settings.transmissionRaioVal,
                "peakTorqueMotorSide":settings.peakMotorData[1],
                "rmsTorqueMotorSide":settings.rmsMotorData[1],
                "peakSpeedMotorSide": settings.peakMotorData[0],
                "peakAccelerationMotorSide": settings.peakAcceMotor,
                "rmsAccelerationMotorSide":settings.rmsAcceMotor,
                "selectedMotor": settings.motorData[settings.motorSelectedIndex].motorPartNo,
                "maxSpeed": settings.motorData[settings.motorSelectedIndex].maxSpeed,
                "contStallTorque": settings.motorData[settings.motorSelectedIndex].continuousStallTorque,
                "peakStallTorque": settings.motorData[settings.motorSelectedIndex].peakStallTorque
            };

            if (settings.notifyIOData && typeof settings.notifyIOData == "function") {
                settings.notifyIOData({ "inputs": inputData, "output": outputData });
            }
            if (options) {

                if (options.xaxis.min != undefined && options.yaxis.min != undefined) {
                    tsPlot.getOptions().yaxes[0].min = options.yaxis.min;
                    tsPlot.getOptions().xaxes[0].min = options.xaxis.min;
                } else {
                    tsPlot.getOptions().yaxes[0].min = null;
                    tsPlot.getOptions().xaxes[0].min = null;
                }
            }

            tsPlot.setData(data);
            modifyTSPlot();
            assessmentNotifier();
        };

        var assessmentNotifier = function () {
            if (settings.assessmentMode && settings.assessmentCallback) {
                settings.assessmentCallback({
                    "peakTorque": {
                        "value": settings.peakPoints[1],
                        "unit": "Nm"
                    },
                    "peakSpeed": {
                        "value": settings.peakPoints[0],
                        "unit": "rad/sec"
                    },
                    "rmsTorque": {
                        "value": settings.rmsPoints[1],
                        "unit": "Nm"
                    },
                    "peakAcceData": {
                        "value": settings.peakAcceData,
                        "unit": "rad/sec2"
                    },
                    "rmsAcceData": {
                        "value": settings.rmsAcceData,
                        "unit": "rad/sec2"
                    },
                    "temperature": {
                        "value": settings.temperature,
                        "unit": "C"
                    },
                    "altitude": {
                        "value": settings.altitude,
                        "unit": "m"
                    },
                    "transmissionRatio": {
                        "value": settings.transmissionRaioVal,
                        "unit": ""
                    },
                    "motorSelectedIndex": {
                        "value": settings.motorSelectedIndex,
                        "unit": ""
                    }
                });
            }
        }


        var updateInputs = function (params) {
            if (params.peakTorque) {
                settings.peakPoints[1] = params.peakTorque.value;
                $container.find('.peakTorqueDataSide').data('unitsComboBox').setSIValue(params.peakTorque.value);
                $container.find('.peakTorqueMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakMotorData[1]);
               
            }
            if (params.peakSpeed) {
                settings.peakPoints[0] = params.peakSpeed.value;
                $container.find('.peakSpeedLoadSide').data('unitsComboBox').setTextBoxValue(params.peakSpeed.value);
                $container.find('.peakSpeedMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakMotorData[0]);
            }
            if (params.rmsTorque) {
                settings.rmsPoints[1] = params.rmsTorque.value;
                $container.find('.rmsTorqueLoadSide').data('unitsComboBox').setSIValue(params.rmsTorque.value);
                $container.find('.rmsTorqueMotorSide').data('unitsComboBox').setTextBoxValue(settings.rmsMotorData[1]);                
            }
            if (params.peakAcceData) {
                settings.peakAcceData = params.peakAcceData.value;
                $container.find('.peakAccelerationLoadSide').data('unitsComboBox').setSIValue(params.peakAcceData.value);
                $container.find('.peakTorqueMotorSide').data('unitsComboBox').setTextBoxValue(settings.peakMotorData[1]);
            }
            if (params.rmsAcceData) {
                settings.rmsAcceData = params.rmsAcceData.value;
                $container.find('.rmsAccelerationLoadSide').data('unitsComboBox').setSIValue(params.rmsAcceData.value);
                $container.find('.rmsAccelerationMotorSide').data('unitsComboBox').setTextBoxValue(settings.rmsAcceMotor);
            }
            if (params.temperature) {
                $container.find('#tempSlider').slider('setValue', params.temperature.value);
                $container.find(".temp-unit-dropdown").data('unitsComboBox').setTextBoxValue(params.temperature.value);
            }
            if (params.altitude) {
                $container.find('#altitudeSlider').slider('setValue', params.altitude.value);
                $container.find(".altitude-unit-combobox").data('unitsComboBox').setTextBoxValue(params.altitude.value);

            }
            if (params.transmissionRatio) {
                settings.sliderVal = Math.log(params.transmissionRatio.value) / Math.log('1.071519305');
                $container.find(".transmContainer").mCustomScrollbar('scrollTo', settings.sliderVal + '%');
                $container.find('.transInputBox').val(params.transmissionRatio.value);
                updateMotorOperatingPoints('TransmissionRatio', params.transmissionRatio.value);
            }
            if (params.motorSelectedIndex) {
                var selectedMotor = parseInt(parseInt(params.motorSelectedIndex.value) + 1);
                $container.find('#PaginationDiv').GetFolio().setActivePage(selectedMotor);
            }
        }

        var markAnswers = function (params) {
            var cssClass;

            if (params.peakTorque) {
                cssClass = params.peakTorque.status ? 'correct' : 'incorrect';
                $container.find('.peakTorqueDataSide').find('input.amount_TORQUE').addClass(cssClass);
                cssClass = params.peakTorque.status ? 'fa-check correct' : 'fa-times incorrect';
                $container.find('.peakTorqueDataSide').find('.response-status').css({
                    'display': 'inline',
                    'align-items': 'center'
                });
                $container.find('.peakTorqueDataSide').find('.response-status').find('span.fa').addClass(cssClass);
                var correctAns = params.peakTorque.status ? '' : '(' + params.peakTorque.correctAnswer + ')';
                $container.find('.peakTorqueDataSide').find('.response-status').find('.correct-answer').append(correctAns);
                $container.find('.peakTorqueDataSide').find('.response-status').find('.correct-answer').attr('title',correctAns);

                // disable slider and input
            }
            if (params.peakSpeed) {
                cssClass = params.peakSpeed.status ? 'correct' : 'incorrect';
                $container.find('.peakSpeedLoadSide').find('input.amount_ANGULARVELOCITY').addClass(cssClass);
                cssClass = params.peakSpeed.status ? 'fa-check correct' : 'fa-times incorrect';
                $container.find('.peakSpeedLoadSide').find('.response-status').css({
                    'display': 'inline',
                    'align-items': 'center'
                });
                $container.find('.peakSpeedLoadSide').find('.response-status').find('span.fa').addClass(cssClass);
                var correctAns = params.peakSpeed.status ? '' : '(' + params.peakSpeed.correctAnswer + ')';
                $container.find('.peakSpeedLoadSide').find('.response-status').find('.correct-answer').append(correctAns);
                $container.find('.peakSpeedLoadSide').find('.response-status').find('.correct-answer').attr('title',correctAns);
            }
            if (params.rmsTorque) {
                cssClass = params.rmsTorque.status ? 'correct' : 'incorrect';
                $container.find('.rmsTorqueLoadSide').find('input.amount_TORQUE').addClass(cssClass);
                cssClass = params.rmsTorque.status ? 'fa-check correct' : 'fa-times incorrect';
                $container.find('.rmsTorqueLoadSide').find('.response-status').css({
                    'display': 'inline',
                    'align-items': 'center'
                });

                $container.find('.rmsTorqueLoadSide').find('.response-status').find('span.fa').addClass(cssClass);
                var correctAns = params.rmsTorque.status ? '' : '(' + params.rmsTorque.correctAnswer + ')';
                $container.find('.rmsTorqueLoadSide').find('.response-status').find('.correct-answer').append(correctAns);
                $container.find('.rmsTorqueLoadSide').find('.response-status').find('.correct-answer').attr('title',correctAns);

                // disable slider and input
            }
            if (params.peakAcceData) {
                cssClass = params.peakAcceData.status ? 'correct' : 'incorrect';
                $container.find('.peakAccelerationLoadSide').find('input.amount_ANGULARACCELERATION').addClass(cssClass);
                cssClass = params.peakAcceData.status ? 'fa-check correct' : 'fa-times incorrect';
                $container.find('.peakAccelerationLoadSide').find('.response-status').css({
                    'display': 'inline',
                    'align-items': 'center'
                });
                $container.find('.peakAccelerationLoadSide').find('.response-status').find('span.fa').addClass(cssClass);

                var correctAns = params.peakAcceData.status ? '' : '(' + params.peakAcceData.correctAnswer + ')';
                $container.find('.peakAccelerationLoadSide').find('.response-status').find('.correct-answer').append(correctAns);
                $container.find('.peakAccelerationLoadSide').find('.response-status').find('.correct-answer').attr('title',correctAns);

                // disable slider and input
            }
            if (params.rmsAcceData) {
                cssClass = params.rmsAcceData.status ? 'correct' : 'incorrect';
                $container.find('.rmsAccelerationLoadSide').find('input.amount_ANGULARACCELERATION').addClass(cssClass);
                cssClass = params.rmsAcceData.status ? 'fa-check correct' : 'fa-times incorrect';
                $container.find('.rmsAccelerationLoadSide').find('.response-status').css({
                    'display': 'inline',
                    'align-items': 'center'
                });
                $container.find('.rmsAccelerationLoadSide').find('.response-status').find('span.fa').addClass(cssClass);
                var correctAns = params.rmsAcceData.status ? '' : '(' + params.rmsAcceData.correctAnswer + ')';
                $container.find('.rmsAccelerationLoadSide').find('.response-status').find('.correct-answer').append(correctAns);
                $container.find('.rmsAccelerationLoadSide').find('.response-status').find('.correct-answer').attr('title',correctAns);
            }
            if (params.temperature) {

                cssClass = params.temperature.status ? 'correct' : 'incorrect';
                $container.find('.amount_TEMPERATURE').addClass(cssClass);
                cssClass = params.temperature.status ? 'fa-check correct' : 'fa-times incorrect';
                $container.find('#envFactorsPanelContainer').find('.temp-unit-dropdown').find('.response-status').css({
                    'display': 'flex',
                    'align-items': 'center'
                });
                $container.find('#envFactorsPanelContainer').find('.temp-unit-dropdown').find('.response-status').find('span.fa').addClass(cssClass);
                var correctAns = params.temperature.status ? '' : '(' + params.temperature.correctAnswer + ' &#176;C' + ')';
                $container.find('#envFactorsPanelContainer').find('.temp-unit-dropdown').find('.response-status').find('.correct-answer').append(correctAns);
                $container.find('#envFactorsPanelContainer').find('#tempSlider').slider("disable");
                $container.find('#envFactorsPanelContainer').find('.amount_TEMPERATURE').attr("disabled", true);
            }
            if (params.altitude) {

                cssClass = params.altitude.status ? 'correct' : 'incorrect';
                $container.find('.amount_ALTITUDE').addClass(cssClass)
                cssClass = params.altitude.status ? 'fa-check correct' : 'fa-times incorrect';

                $container.find('#envFactorsPanelContainer').find('.altitude-unit-combobox').find('.response-status').css({
                    'display': 'flex',
                    'align-items': 'center'
                });
                $container.find('#envFactorsPanelContainer').find('.altitude-unit-combobox').find('.response-status').find('span.fa').addClass(cssClass);
                var correctAns = params.altitude.status ? '' : '(' + params.altitude.correctAnswer + ' m)';
                $container.find('#envFactorsPanelContainer').find('.altitude-unit-combobox').find('.response-status').find('.correct-answer').append(correctAns);
                $container.find('#envFactorsPanelContainer').find('#altitudeSlider').slider("disable");
                $container.find('#envFactorsPanelContainer').find('.amount_ALTITUDE').attr("disabled", true);
                // disable slider and input
            }
            if (params.transmissionRatio) {
                cssClass = params.transmissionRatio.status ? 'correct' : 'incorrect';
                $container.find('.transInputBox').addClass(cssClass);
                cssClass = params.transmissionRatio.status ? 'fa-check correct' : 'fa-times incorrect';
                $container.find('#transmissionRatioPanelContainer').find('.trRatioValue').find('.response-status').css({
                    'display': 'inline',
                    'align-items': 'center'
                });
                $container.find(".trRatioSlider").addClass('pointer-events-none');
                $container.find('.transInputBox').css('width', '40%');
                $container.find('.transInputBox').attr('disabled', 'disabled');
                $container.find('#transmissionRatioPanelContainer').find('.trRatioValue').find('.response-status').find('span.fa').addClass(cssClass);

                var correctAns = params.transmissionRatio.status ? '' : '(' + params.transmissionRatio.correctAnswer + ' : 1)';
                $container.find('#transmissionRatioPanelContainer').find('.trRatioValue').find('.response-status').find('.correct-answer').append(correctAns);
            }
            if (params.motorSelectedIndex) {

                cssClass = params.motorSelectedIndex.status ? 'fa-check correct' : 'fa-times incorrect';
                $container.find('.solutionInfoTitle').find('.response-status').css({
                    'display': 'inline',
                    'align-items': 'center'
                });
                $container.find('.solutionInfoTitle').find('.response-status').find('span.fa').addClass(cssClass);
                $container.find('#PaginationDiv .Folio').addClass('pointer-events-none');
                $container.find('#PaginationDiv .Folio .FolioPages, #PaginationDiv .Folio span.FolioPage').addClass('gray-background');

                var correctAns = params.motorSelectedIndex.status ? '' : '(#' + (params.motorSelectedIndex.correctAnswer + 1) + ' : ' + settings.motorData[params.motorSelectedIndex.correctAnswer].motorPartNo + ')';
                $container.find('.solutionInfoTitle').find('.response-status').find('.correct-answer').append(correctAns);

            }
        };

        generateTSCurveArea();

        return {
            ref: this,
            updateInputs: updateInputs,
            markAnswers: markAnswers
        };
    }

})(jQuery);