import {IShapeModel} from './IShapeModel';

export interface IShape {
    iShapeModel: IShapeModel;
    initialize(shapeJson): void;
    calculateInertia(): number;
    getSerializedData(): IShapeModel;
    initializeShapeModel(shapeJson): IShapeModel;
}