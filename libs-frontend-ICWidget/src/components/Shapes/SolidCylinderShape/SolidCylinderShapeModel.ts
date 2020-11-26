import {SimpleShapeModel} from './../../BaseClasses/SimpleShapeModel';

export class SolidCylinderShapeModel extends SimpleShapeModel {
    height: number = 0;
    radius: number = 0;
    heightUnit: string = "meter";
    radiusUnit: string = "meter";
    formulaStringMass: string = "I = \\frac{1}{2}{M \\left(\\frac{D}{2} \\right)^2}";
    formulaStringDensity: string = "I = \\frac{\\pi}{2}{L P \\left(\\frac{D}{2} \\right)^4}";

    constructor(solidCylinderModel) {
        super(solidCylinderModel);
        this.height = solidCylinderModel.Height || this.height; 
        this.radius = solidCylinderModel.Radius || this.radius;
        this.heightUnit = solidCylinderModel.HeightUnit || this.heightUnit;
        this.radiusUnit = solidCylinderModel.RadiusUnit || this.radiusUnit;
        this.formulaStringMass = solidCylinderModel.FormulaStringMass || this.formulaStringMass;
        this.formulaStringDensity = solidCylinderModel.formulaStringDensity || this.formulaStringDensity;
    }

    get Radius() {
        return this.radius;
    }
    set Radius(radius) {
        this.radius = radius;
    }

    get RadiusUnit() {
        return this.radiusUnit;
    }
    set RadiusUnit(radiusUnit) {
        this.radiusUnit = radiusUnit;
    }

    get Height() {
        return this.height;
    }

    set Height(height) {
        this.height = height;
    }

    get HeightUnit() {
        return this.heightUnit;
    }

    set HeightUnit(heightUnit) {
        this.heightUnit = heightUnit;
    }
    
    get FormulaStringMass() {
        return this.formulaStringMass;
    }
    set FormulaStringMass(formulaStringMass) {
        this.formulaStringMass = formulaStringMass;
    }

    get FormulaStringDensity() {
        return this.formulaStringDensity;
    }
    set FormulaStringDensity(formulaStringDensity) {
        this.formulaStringDensity = formulaStringDensity;
    }
}  