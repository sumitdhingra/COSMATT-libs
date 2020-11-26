(function ($) {
    $.fn.assessment = function (options) {
        var settings = $.extend({
            type: 'radio',
            radioGroupName: 'optionsRadios',
            question: 'This is the assessment title',
            answers: [],
            showCheckAnswerButton: true
        }, options);

        function getRadioComponent(answer, index) {
            var colWidth = "col-sm-12";
            if (answer.image) {
                colWidth = "col-sm-6";
            }
            var domString = '<div class="abc-radio mb-sm abc-radio-primary form-check col ' + colWidth + '">';
            domString += '<input type="radio" class="form-check-input" name="' + settings.radioGroupName + '" id="' + settings.radioGroupName + index + '" value="' + answer.text + '"> ';
            domString += '<label for="' + settings.radioGroupName + index + '">';
            domString += '<span class="answer-text">' + answer.text + '</span>';
            if (answer.image) {
                domString += '<img class="shadow" src="' + answer.image.src + '" alt="...">';
            }
            domString += '</label>';
            domString += '</div>';
            return domString;
        }

        function getCheckboxComponent(answer, index) {
            var colWidth = "col-sm-12";
            if (answer.image) {
                colWidth = "col-sm-6";
            }
            var domString = '<div class="form-check col ' + colWidth + '">';
            domString += '<input type="checkbox" class="form-check-input" id="' + settings.radioGroupName + index + '" value="' + answer.text + '"> ';
            domString += '<label for="' + settings.radioGroupName + index + '"  class="form-check-label">';
            domString += answer.text;
            if (answer.image) {
                domString += '<img class="shadow" src="' + answer.image.src + '" alt="...">';
            }
            domString += '</label>';
            domString += '</div>';
            return domString;
        }

        var $container = this.append('<div class="row assessment-widget m-0"></div>');
        $container.find('.row').append('<div class="col col-xs-12"></div>');
        var $containerBody = $container.find('.col');
        $containerBody.append('<fieldset class="form-group"></fieldset>');

        $containerBody.find('fieldset').append('<div class="value5 question-text">' + settings.question.text + '</div>');
        if (settings.question.image) {
            var questionImage = '<div class="mb-3"><img class="shadow" src="' + settings.question.image.src + '"  alt="..."></div>';
            $containerBody.find('fieldset').append(questionImage);
        }
        $containerBody.find('fieldset').append('<div class="row m-0"></div>');
        if (settings.type === 'radio') {
            settings.answers.forEach(function (answer, index) {
                $containerBody.find('fieldset').find('.row').append(getRadioComponent(answer, index))
            });
        } else if (settings.type === 'checkbox') {
            settings.answers.forEach(function (value, index) {
                $containerBody.find('fieldset').find('.row').append(getCheckboxComponent(value, index))
            });
        }
        if (settings.showCheckAnswerButton) {
            //$containerBody.find('fieldset').append('<button type="button" class="btn float-right btn-primary pull-right">Check Answer</button>');
        }
        return this;
    };
}(jQuery));