import {IShapeModel} from './../Interfaces/IShapeModel';
import {Mode, InclusionMode, MassOrDensity} from './../Constants/data.ts';

export class SimpleShapeModel implements IShapeModel {

    density: number = 0;
    densityUnit: string = "kilogrampermetercube";
    material: string = "Steel (AISI 1020)";
    mass: number = 0;
    massUnit: string = "kilogram";
    formulaString: string = "";
    axisOfRotation: string = "X";
    massOrDensity = MassOrDensity.Density;
    inclusionMode = InclusionMode.Additive;
    totalInertia: number = 0;
    totalInertiaUnit: string = "kilogrammetersquare";
    type: string = "SolidCylinder";
    name: string = "";

    constructor(shapeParams) {
        //TODO: use undefined and null check
        // super(shapeParams);
        this.axisOfRotation = shapeParams.AxisofRotation || this.axisOfRotation;
        this.density = shapeParams.Density || this.density;
        this.densityUnit = shapeParams.DensityUnit || this.densityUnit;
        this.material = shapeParams.Material || this.material;
        this.mass = shapeParams.Mass || this.mass;
        this.massUnit = shapeParams.MassUnit || this.massUnit;
        this.formulaString = shapeParams.FormulaString || this.formulaString;
        this.inclusionMode = shapeParams.InclusionMode || this.inclusionMode;
        this.massOrDensity = shapeParams.MassOrDensity || this.massOrDensity;
        this.totalInertia = shapeParams.TotalInertia || this.totalInertia;
        this.totalInertiaUnit = shapeParams.TotalInertiaUnit || this.totalInertiaUnit;
        this.type = shapeParams.Type || this.type;
        this.name = shapeParams.Name || this.name;
    }

    public calculateInertia() {

    }

    //getters setters
    get AxisOfRotation() {
        return this.axisOfRotation;
    }
    set AxisOfRotation(axisOfRotation) {
        this.axisOfRotation = axisOfRotation;
    }

    get TotalInertia() {
        return this.totalInertia;
    }
    set TotalInertia(totalInertia) {
        this.totalInertia = totalInertia;
    }

    get TotalInertiaUnit() {
        return this.totalInertiaUnit;
    }
    set TotalInertiaUnit(totalInertiaUnit) {
        this.totalInertiaUnit = totalInertiaUnit;
    }

    get Type() {
        return this.type;
    }
    set Type(type) {
        this.type = type;
    }

    get Name() {
        return this.name;
    }
    set Name(name) {
        this.name = name;
    }

    get Density() {
        return this.density;
    }
    set Density(density) {
        this.density = density;
    }

    get DensityUnit() {
        return this.densityUnit;
    }
    set DensityUnit(densityUnit) {
        this.densityUnit = densityUnit;
    }

    get Material() {
        return this.material;
    }
    set Material(material) {
        this.material = material;
    }

    get FormulaString() {
        return this.formulaString;
    }
    set FormulaString(formulaString) {
        this.formulaString = formulaString;
    }

    get Mass() {
        return this.mass;
    }
    set Mass(mass) {
        this.mass = mass;
    }

    get MassUnit() {
        return this.massUnit;
    }
    set MassUnit(massUnit) {
        this.massUnit = massUnit;
    }

    get InclusionMode() {
        return this.inclusionMode;
    }
    set InclusionMode(inclusionMode) {
        this.inclusionMode = inclusionMode;
    }

    get MassOrDensity() {
        return this.massOrDensity;
    }
    set MassOrDensity(massOrDensity) {
        this.massOrDensity = massOrDensity;
    }

}  