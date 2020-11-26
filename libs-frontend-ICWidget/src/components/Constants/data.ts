
export const Mode = {
  Basic: "Basic",
  Advanced: "Advanced"
}
export const InclusionMode = {
  Additive: "Additive",
  Subtractive: "Subtractive"
}
export const MassOrDensity = {
  Mass: "Mass",
  Density: "Density"
}

export const UnitData = {
  Radius: "cm",
  Length: "cm",
  Mass: "gm",
  Density: "kg/m3"
}
export const ICModelData = {
  AppMode: Mode.Basic,
  DisplayShapeSelector: true,
  SelectedShape: 0,
  Shapes: ["SolidCylinder"]
};

export const ShapeType = {
  SolidCylinder: "SolidCylinder",
  HollowCylinder: "HollowCylinder"
};

export const Densities = {
  "ABS": 1020,
  "Acrylic (Medium-high Impact)": 1200,
  "Aluminium (1060 Alloy)": 2700,
  "Brass": 8500,
  "Steel (AISI 1020)": 7900,
  "Other": ""
}