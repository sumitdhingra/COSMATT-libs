/*jshint esversion: 6 */
/* global Handsontable,jQuery, COSMATT, document, window */
'use strict';
(function($) {

    // add the plugin to the jQuery.fn object
    $.fn.spreadSheet = function(options) {

        const defaults = {
            showRowHeaders: true,
            showColHeaders: true,
            evaluateFormulas: false,
            showDropdownMenu: false,
            showFillHandle: false,
            showGraph: false,
            manualColumnResize: false,
            tableInput: null,
            height: '300px',
            width: '100%'
        };

        let settings = $.extend(defaults, options);
        $(this).append('<div id="spread-sheet-container"><div id="handsontable-container"></div></div>');

        let $container = $(this).find('#spread-sheet-container');
        let $handsontableContainer = $container.find('#handsontable-container');
        $handsontableContainer.css({
            height: settings.height,
            width: settings.width,
            overflow: 'hidden'
        });

        let $prevSelectedCell, vtPlot;
        let tableData = [];
        let SItableData = [];
        let columnOptions = [];
        let columnHeaders = [];

        if (settings.tableInput) {
            parseTableInputData(settings.tableInput);
        } else {
            tableData = Handsontable.helper.createEmptySpreadsheetData(4, 5);
        }

        let handsOnTableOptions = {
            data: tableData,
            // preventOverflow: 'horizontal',
            rowHeaders: settings.showRowHeaders,
            colHeaders: settings.showColHeaders,
            colHeaders: columnHeaders.length > 0 ? columnHeaders : settings.showColHeaders,
            dropdownMenu: settings.showDropdownMenu,
            formulas: settings.evaluateFormulas,
            fillHandle: settings.showFillHandle,
            columns: columnOptions.length > 0 ? columnOptions : null,
            manualColumnResize: settings.manualColumnResize,
            // stretchH: 'all',
            // hiddenColumns: {
            //   columns: [0, 1, 2, 3],
            //   indicators: true
            // },
            // comments: true,
            // cell: [
            //   { row: 1, col: 1, comment: 'Some comment' },
            //   { row: 2, col: 2, comment: 'More comments' }
            // ],

            afterChange: function(changes, source) {
                if (source === 'edit' && settings.showGraph) {
                    // update plot
                    vtPlot.setData([updateGraphData(tableData)]);
                    vtPlot.draw();
                }


            },

            beforeChange: function(changes, source) {
                if (source === 'edit') {
                    changes = changes[0];
                    console.log(changes)
                    settings.tableInput[parseInt(changes[1].slice(1))].colData[changes[0]].value = changes[3];
                    parseTableInputData(settings.tableInput);
                    // hot.destroy();
                    hot.render();
                }
            },

            afterSelection: function(changes, source) {
                let selectedCell = this.getCell(changes, source);
                $($prevSelectedCell).tooltip('hide');

                if ($prevSelectedCell !== selectedCell && (source === 2 || 4)) {
                    $prevSelectedCell = selectedCell;
                    $(selectedCell).tooltip('show');
                } else {
                    $prevSelectedCell = null;
                }
            },

            beforeRenderer: function(TD, row, col, prop, value, cellProp) {
                settings.tableInput[col].colData[row].SIVal = COSMATT.UNITCONVERTER.getSIValue(settings.tableInput[col].unitType, settings.tableInput[col].defSelectedUnit, value);
            },

            /*Similar to example in docs: http://jsfiddle.net/mpsingh2003/4u4gq5kc/ */
            afterGetColHeader: function(col, TH) {
                var instance = this;
                if (col >= 0 && col < settings.tableInput.length && (settings.tableInput[col].fieldType == "value" || (settings.tableInput[col].fieldType == "formula" && settings.evaluateFormulas))) {
                    var unitType = settings.tableInput[col].unitType;
                    var menu, button, defaultUnit;
                    if (unitType) {
                        menu = buildMenu(unitType, col);
                        defaultUnit = buildUnitSpan(col);
                        button = buildButton(col);
                        addButtonMenuEvent(button, menu);

                        Handsontable.Dom.addEvent(menu, 'click', function(event) {
                            if (event.target.nodeName == 'LI') {
                                if (TH.firstChild.querySelectorAll('.col-unitdropdown-label').length > 0) {
                                    TH.firstChild.querySelectorAll('.col-unitdropdown-label')[0].innerHTML = event.target.innerHTML;
                                }
                                let currentActiveEle = menu.getElementsByClassName('active')[0];
                                let currUnitType = currentActiveEle.dataset.unittype;
                                let fromUnitIndex = currentActiveEle.dataset.eleindex;
                                let toUnitIndex = event.target.dataset.eleindex;
                                let currColIndex = parseInt(currentActiveEle.dataset.colindex);

                                if (settings.tableInput[currColIndex].fieldType === 'value') {
                                    let convRatio = COSMATT.UNITCONVERTER.getConversionRatio(currUnitType, fromUnitIndex, toUnitIndex);
                                    for (let row in tableData) {
                                        tableData[row]['c' + currColIndex] *= convRatio;
                                    }
                                } else {
                                    let convRatio = COSMATT.UNITCONVERTER.getConversionRatio(currUnitType, fromUnitIndex, toUnitIndex);
                                    for (let row in tableData) {
                                        // This case will work only with formula columns as read only
                                        hot.setDataAtCell(parseInt(row), currColIndex, hot.getDataAtCell(parseInt(row), currColIndex) * convRatio);
                                    }
                                }
                                settings.tableInput[currColIndex].defSelectedUnit = toUnitIndex;
                                hot.render();

                                // recalculation after any change in sheet
                                // which is not required in this case

                                // hot.getPlugin('formulas').recalculateFull();
                            }
                        });
                        if (TH.firstChild.lastChild.nodeName === 'BUTTON') {
                            TH.firstChild.removeChild(TH.firstChild.lastChild);
                        }
                        if (TH.firstChild.lastChild.nodeName === 'SPAN' && TH.firstChild.lastChild.className !== 'col-unitdropdown-label') {
                            TH.firstChild.appendChild(defaultUnit);
                        }
                        TH.firstChild.appendChild(button);
                    }
                }
            },
            afterInit: function() {
                let actualHt = $(this.rootElement).find(".wtHider").eq(0).height();
                if (actualHt < parseInt(settings.height)) {
                    $(this.rootElement).css({
                        'height': ''
                    });
                    $(this.rootElement).find('.wtHolder').eq(0).css({
                        'height': ''
                    });
                    $handsontableContainer.css({
                        'height': ''
                    });
                }
                addToolTipToTable();
            }
        };

        let hot = new Handsontable($handsontableContainer[0], handsOnTableOptions);

        if (settings.showGraph) {
            $container.append('<div id="vtGraph" style="min-height:400px"></div>');
            let $graphContainer = $container.find('#vtGraph');
            vtPlot = plotVTGraph($graphContainer);
        }

        function plotVTGraph($graphContainer) {
            return $.plot($graphContainer, [updateGraphData(tableData)], {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    },
                    color: "#f7252a"
                },
                xaxis: {
                    axisLabel: 'Time (sec)',
                    position: 'bottom',
                    min: 0
                },
                yaxis: {
                    axisLabel: 'Velocity (rev/sec)',
                    position: 'left',
                    min: 0
                },
                grid: {
                    hoverable: true
                },
                tooltip: {
                    show: true,
                    content: "%s Time = %x (sec), Velocity = %y (rev/sec)",
                    cssClass: 'flotTipBlack'
                }
            });
        }

        function updateGraphData(pointsData) {
            let graphData = [];
            graphData.push([0, 0]);
            let time = 0;

            for (let point of pointsData) {
                // TODO
                time += point.c3;
                graphData.push([time, point.c1]);
            }
            return graphData;
        }

        function addToolTipToTable() {
            let tblRow = $container.find('.ht_master.handsontable table tr');
            for (let i = 1; i < tblRow.length; i++) {
                let tblData = $(tblRow[i]).find('td');
                for (let [i, ip] of settings.tableInput.entries()) {
                    if (ip.tooltip) {
                        setTooltipAttrs(tblData[i], ip.tooltip.text, ip.tooltip.position);
                    }
                }
            }
        }

        function setTooltipAttrs(ele, title, position) {
            ele.setAttribute('title', title);
            ele.setAttribute('data-placement', position);
            $(ele).tooltip({
                container: ele, // not working as excpected
                html: true,
                trigger: 'manual',
                delay: {
                    "show": 200,
                    "hide": 200
                }
            });
        }

        function parseTableInputData(tblData) {
            for (let [i, col] of tblData.entries()) {
                // for column headers
                let unitDropDown = '';
                let columnTitleStr = col.columnTitle + '<br/>&nbsp;';
                columnHeaders[i] = columnTitleStr;

                // for column options
                let option = {
                    data: 'c' + i,
                    readOnly: col.readOnly === undefined ? true : col.readOnly
                };
                if (col.dataType) {
                    option.type = col.dataType || '';
                }
                if (col.dataType === 'numeric' && col.decimalPlaces) {
                    option.format = '0.' + Array(col.decimalPlaces + 1).join("0");
                }
                columnOptions[i] = option;

                // for table data
                for (let [j, colVal] of col.colData.entries()) {
                    if (!tableData[j]) {
                        tableData[j] = {};
                    }
                    tableData[j]['c' + i] = colVal.value;
                }
            }
        }

        function buildMenu(unitType, col) {
            var menu = document.createElement('UL');
            var items = COSMATT.UNITCONVERTER.getUnits(unitType);
            var item;

            menu.className = 'changeTypeMenu';

            for (var i = 0, len = items.length; i < len; i++) {
                item = document.createElement('LI');
                if ('innerHTML' in item) {
                    item.innerHTML = items[i];
                } else {
                    item.textContent = items[i];
                }

                // update index
                if (settings.tableInput[col].defSelectedUnit == i) {
                    item.className = 'active';
                }

                item.setAttribute('data-unittype', unitType);
                item.setAttribute('data-colindex', col);
                item.setAttribute('data-eleindex', i);
                menu.appendChild(item);
            }
            return menu;
        }

        function buildButton(col) {
            var button = document.createElement('BUTTON');
            button.className = 'changeType';
            return button;
        }

        function addButtonMenuEvent(button, menu) {
            Handsontable.Dom.addEvent(button, 'click', function(event) {
                var changeTypeMenu, position, removeMenu;
                if (!menu.parentNode) {
                    document.body.appendChild(menu);
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    changeTypeMenu = document.querySelectorAll('.changeTypeMenu');

                    for (var i = 0, len = changeTypeMenu.length; i < len; i++) {
                        changeTypeMenu[i].style.display = 'none';
                    }
                    menu.style.display = 'block';
                    position = button.getBoundingClientRect();

                    menu.style.top = (position.top + (window.scrollY || window.pageYOffset)) + 2 + 'px';
                    menu.style.left = (position.left) + 'px';

                    removeMenu = function(event) {
                        if (event.target.nodeName == 'LI' && event.target.parentNode.className.indexOf('changeTypeMenu') !== -1) {
                            if (menu.parentNode) {
                                menu.parentNode.removeChild(menu);
                            }
                        }
                    };
                    Handsontable.Dom.removeEvent(document, 'click', removeMenu);
                    Handsontable.Dom.addEvent(document, 'click', removeMenu);
                } else {
                    menu.parentNode.removeChild(menu);
                }
            });

            Handsontable.Dom.addEvent(button, 'mousedown', function(event) {
                event.preventDefault();
                event.stopImmediatePropagation();
            });
        }

        function buildUnitSpan(col, selectedUnit) {
            var span = document.createElement('SPAN');
            span.innerHTML = selectedUnit || COSMATT.UNITCONVERTER.getUnits(settings.tableInput[col].unitType)[settings.tableInput[col].defSelectedUnit];
            span.className = 'col-unitdropdown-label';
            return span;
        }
    };

})(jQuery);