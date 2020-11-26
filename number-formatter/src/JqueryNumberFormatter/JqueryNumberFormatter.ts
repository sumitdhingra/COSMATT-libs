import { NumberFormatter } from "../NumberFormatter/NumberFormatter"
import { INumberFormatterOptions } from "../NumberFormatter/INumberFormatterOptions"

declare var jQuery: any;

(function($) {
    $.fn.numberFormatter = function(options: INumberFormatterOptions)  {
        var numberFormatter = new NumberFormatter(options);
        if( this.is('input') || this.is('textarea') ) {
            this.val(numberFormatter.format(this.val()));
        } else {
            this.text(numberFormatter.format(this.text()));
        }
        return this;
    };

})(jQuery);