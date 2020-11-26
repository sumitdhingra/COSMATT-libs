$(document).ready(function () {
    var options = {
        significantDigits: parseInt($('#significantDigits').val()),
        maxPositiveExponent: parseInt($('#maxPositiveExponent').val()),
        minNegativeExponent: parseInt($('#minNegativeExponent').val()),
    };
    function updateValue()
    {
        var numberFormatter = new Cosmatt.NumberFormatter(options);
        $('#result-view').text(numberFormatter.format($('#number').val()));
        $('#editable-result-view').text(numberFormatter.format($('#number').val(), true));
    }
    $('.form-control.option').change(function (value) {
        options = {
            significantDigits: parseInt($('#significantDigits').val()),
            maxPositiveExponent: parseInt($('#maxPositiveExponent').val()),
            minNegativeExponent: parseInt($('#minNegativeExponent').val()),
        };
        updateValue();
    });
    $('#number').keyup(function (value) {
        updateValue();
    });
    $('#result-view').text($('#number').val());
    $('#editable-result-view').text($('#number').val(), true);
});