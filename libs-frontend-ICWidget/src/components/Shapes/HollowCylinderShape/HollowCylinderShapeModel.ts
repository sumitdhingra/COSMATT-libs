import {SimpleShapeModel} from './../../BaseClasses/SimpleShapeModel';

export class HollowCylinderShapeModel extends SimpleShapeModel {
    height: number = 0;
    innerRadius: number = 0;
    outerRadius: number = 0;
    innerRadiusUnit: string = "meter";
    outerRadiusUnit: string = "meter";
    heightUnit: string = "meter";
    formulaStringMass: string = "I = \\frac{1}{2}{M \\left(\\left(\\frac{D_{1}}{2} \\right)^2 + \\left(\\frac{D_{2}}{2} \\right)^2\\right)}";
    formulaStringDensity: string = "I = \\frac{\\pi}{2}{L P \\left(\\left(\\frac{D_{1}}{2} \\right)^4 - \\left(\\frac{D_{2}}{2} \\right)^4\\right)}";

    constructor(hollowCylinderModel) {
        super(hollowCylinderModel);
        this.height = hollowCylinderModel.Height || this.height;
        this.innerRadius = hollowCylinderModel.InnerRadius || this.innerRadius;
        this.outerRadius = hollowCylinderModel.OuterRadius || this.outerRadius;
        this.heightUnit = hollowCylinderModel.HeightUnit || this.heightUnit;
        this.innerRadiusUnit = hollowCylinderModel.InnerRadiusUnit || this.innerRadiusUnit;
        this.outerRadiusUnit = hollowCylinderModel.OuterRadiusUnit || this.outerRadiusUnit;
        this.formulaStringMass = hollowCylinderModel.FormulaStringMass || this.formulaStringMass;
        this.formulaStringDensity = hollowCylinderModel.formulaStringDensity || this.formulaStringDensity;

    }

    get InnerRadius() {
        return this.innerRadius;
    }
    set InnerRadius(innerRadius) {
        this.innerRadius = innerRadius;
    }

    get InnerRadiusUnit() {
        return this.innerRadiusUnit;
    }
    set InnerRadiusUnit(innerRadiusUnit) {
        this.innerRadiusUnit = innerRadiusUnit;
    }

    get OuterRadius() {
        return this.outerRadius;
    }
    set OuterRadius(outerRadius) {
        this.outerRadius = outerRadius;
    }

    get OuterRadiusUnit() {
        return this.outerRadiusUnit;
    }
    set OuterRadiusUnit(outerRadiusUnit) {
        this.outerRadiusUnit = outerRadiusUnit;
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