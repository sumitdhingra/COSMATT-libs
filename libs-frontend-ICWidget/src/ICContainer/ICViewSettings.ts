import {Mode} from './../Components/Constants/data';

export class ICViewSettings {

    private mode = Mode.Basic;
    private displayShapeSelector: boolean = false;

    constructor(viewSettings) {
        this.setViewSettings(viewSettings);
    }

    private setViewSettings(viewSettings) {
        this.mode = viewSettings.Mode || this.mode;
        this.displayShapeSelector = viewSettings.displayShapeSelector || this.displayShapeSelector; // state
    }

    public get DisplayShapeSelector() {
        return this.displayShapeSelector;
    }

    public set DisplayShapeSelector(displayShapeSelector) {
        this.displayShapeSelector = displayShapeSelector;
    }

    public get Mode() {
        return this.mode;
    }

    public set Mode(mode) {
        this.mode = mode;
    }


}  