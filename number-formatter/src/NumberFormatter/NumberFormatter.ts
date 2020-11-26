import { INumberFormatterOptions } from "./INumberFormatterOptions"

const DEFAULT_SIGNIFICANT_DIGITS = 3;
const DEFAULT_MAX_POSITIVE_EXPONENT = 6;
const DEFAULT_MIN_NEGATIVE_EXPONENT = -4;

export class NumberFormatter {

    private superscripts = {
        "0": "⁰",
        "1": "¹",
        "2": "²",
        "3": "³",
        "4": "⁴",
        "5": "⁵",
        "6": "⁶",
        "7": "⁷",
        "8": "⁸",
        "9": "⁹",
        "-": "⁻"
    };
    private options: INumberFormatterOptions = <INumberFormatterOptions>{};

    constructor(settings: INumberFormatterOptions) {
        if (!settings) {
            settings = <INumberFormatterOptions>{};
        }
        this.options["significantDigits"] = settings.significantDigits || DEFAULT_SIGNIFICANT_DIGITS;
        this.options["maxPositiveExponent"] = settings.maxPositiveExponent || DEFAULT_MAX_POSITIVE_EXPONENT;
        this.options["minNegativeExponent"] = settings.minNegativeExponent || DEFAULT_MIN_NEGATIVE_EXPONENT;
        this.isNaNPolyfill();
        this.includesPolyFill();
    }

    format(originalInput: any, isEditable: boolean = false): string {
        // convert to number as input can be a number string
        let input: any = parseFloat(originalInput);
        if (Number.isNaN(input) || input === 0) {
            return originalInput;
        }
        // Rule #1: if absolute value of number is greater than 10^p
        if (Math.abs(input) >= Math.pow(10, this.options.maxPositiveExponent)) {
            const exponent = input.toExponential(this.options.significantDigits - 1);
            return this.toSuperscript(exponent);
        }
        // Rule #3: if absolute value of number is  between  10^p and 10^s and value is displayed in editable field, then on blur
        if (isEditable && Math.abs(input) < Math.pow(10, this.options.maxPositiveExponent) && Math.abs(input) >= Math.pow(10, this.options.significantDigits)) {
            return Math.round(input).toString();
        }
        // Rule #3: if absolute value of number is  between  10^p and 10^n
        if ((Math.abs(input) > Math.pow(10, this.options.minNegativeExponent))) {
            input = input.toPrecision(this.options.significantDigits);
            return parseFloat(input).toString();
        }
        // Rule #4: if absolute value of number is  less than 10^n
        const exponent = input.toExponential(this.options.significantDigits - 1);
        return this.toSuperscript(exponent);
    }

    toSuperscript(exponent: string) {
        let parts: string[];
        if (exponent.includes("e+")) {
            parts = exponent.split("e+");
        } else if (exponent.includes("e-")) {
            parts = exponent.split("e");
        } else {
            return exponent;
        }
        let superExponent = "";
        for (let char of parts[1]) {
            superExponent += (<any>this.superscripts)[char];
        }
        parts[1] = superExponent;
        return parts.join("x10");
    }

    isNaNPolyfill(){
      Number.isNaN = Number.isNaN || function(value) {     
          return value !== value;
      }
    }
    includesPolyFill(){
        if (!String.prototype.includes) {
            String.prototype.includes = function (search, start) {
                if (typeof start !== 'number') {
                    start = 0;
                }

                if (start + search.length > this.length) {
                    return false;
                } else {
                    return this.indexOf(search, start) !== -1;
                }
            };
        }
    }
}