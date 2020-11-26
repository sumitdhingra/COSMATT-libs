<script lang="ts">

import UnitComboBox from './../../UnitComboBoxView/UnitComboBox';
import SolidCylinderImageView from './../../ImageView/ImageView';
import SolidCylinderFormulaView from './../../FormulaeView/FormulaView';
// import SolidCylinderInputsView from './SolidCylinderInputsView';
import SolidCylinderOutputView from './../../OutputView/OutputView';
import CustomDropdown from './../../CustomDropdown/CustomDropdown';
import {SolidCylinderShapeModel} from './SolidCylinderShapeModel';
import {SimpleShape} from './../../BaseClasses/SimpleShape';
import {Densities, MassOrDensity} from './../../Constants/data';
import ModeView from './../../ModeView/ModeView'; 

declare var $: any;
declare var MathJax: any;

export default SimpleShape.extend({
  props:['shapeJson','id'],
  data () {
    return {  
    shapeModel:{},
    label:"Calculated Moment of Inertia:",
    enableMass: false,
    enableHeight: true,
    enableMaterial: false,
    enableDensity: true,
    materials: Object.keys(Densities),
    formulaString:""
    }
  },
  methods:{
    updateMaterialType($event){
      this.shapeModel.Material = $event;
      if(this.shapeModel.Material != "Other"){
        this.shapeModel.Density = Densities[$event];
      }    
      var $densityComboBox = $(this.$el).find(".combo-container#density"+this.id+"combo").data('unitsComboBox');
      if($densityComboBox){
        var requiredValueinSelectedUnit = $densityComboBox.getValueInSelectedUnit(this.shapeModel.Density);
        $densityComboBox.setTextBoxValue(requiredValueinSelectedUnit);
      }      
      this.calculateMass();

    },
    massDensityEventHandler(e){
      var btnChecked = e.target.value || e.target.innerText; 

        btnChecked = btnChecked.trim();

        if(btnChecked !== this.shapeModel.MassOrDensity){
           this.shapeModel.MassOrDensity = btnChecked; 
           this.updateMassDensityTabSelection();
       }
    },

    updateMassDensityTabSelection(){
        if(this.shapeModel.MassOrDensity == MassOrDensity.Mass){

            this.formulaString = this.shapeModel.FormulaStringMass;

            $(this.$el).find(".combo-container#mass"+this.id+"combo").data('unitsComboBox').update({
                "enable": {
                    "textbox": "true",
                    "comboBox": "true"
                }
            });
              let imgPath = "./src/Assets/img/inertia-calculator/SCylinder_Mass.svg";
              $(this.$el).find("#imageContainer").css({"background-image":"url("+imgPath+")"});
        } 
        else if(this.shapeModel.MassOrDensity == MassOrDensity.Density){

          this.formulaString = this.shapeModel.FormulaStringDensity;

            $(this.$el).find(".combo-container#mass"+this.id+"combo").data('unitsComboBox').update({
                "enable": {
                    "textbox": "false",
                    "comboBox": "true"
                }
            });
            let imgPath = "./src/Assets/img/inertia-calculator/SCylinder_Density.svg";
            $(this.$el).find("#imageContainer").css({"background-image":"url("+imgPath+")"});
            
            this.calculateMass();
        }
    },
    getSerializedData(){
      return JSON.stringify(this.shapeModel);
    },

    getInertiaValue(unit){
      return this.shapeModel.TotalInertia;
    },
    
    initializeShapeModel(shapeJson){
      this.shapeModel = new SolidCylinderShapeModel(shapeJson);
      this.inputJson.Shapes[this.id].ShapeInfo = this.shapeModel;
    },

    radiusUpdated(value){
      //parseInt converts ".5" to NaN whereas parseFloat converts ".5" to 0.5
      if(isNaN(parseFloat(value.value)) || isNaN(value.SIValue) || value.SIValue < 0){
        var $radiusComboBox = $(this.$el).find(".combo-container#radius"+this.id+"combo").data('unitsComboBox');
        if($radiusComboBox){
          $radiusComboBox.setTextBoxValue(0);
          this.shapeModel.Radius = 0;
        } 
      }
      else{
        this.shapeModel.Radius = value.SIValue;
      }
      this.calculateMass();
    },

    heightUpdated(value){
      if(isNaN(parseFloat(value.value)) || isNaN(value.SIValue)  || value.SIValue < 0){
        var $heightComboBox = $(this.$el).find(".combo-container#height"+this.id+"combo").data('unitsComboBox');
        if($heightComboBox){
          $heightComboBox.setTextBoxValue(0);
          this.shapeModel.Height = 0;
        } 
      }
      else{
        this.shapeModel.Height = value.SIValue;
      }
      
      this.calculateMass();
    },

    massUpdated(value){
      if(isNaN(parseFloat(value.value)) || isNaN(value.SIValue)  || value.SIValue < 0){
        var $massComboBox = $(this.$el).find(".combo-container#mass"+this.id+"combo").data('unitsComboBox');
        if($massComboBox){
          $massComboBox.setTextBoxValue(0);
           this.shapeModel.Mass = 0;
        } 
      }
      else{
        this.shapeModel.Mass = value.SIValue || this.shapeModel.Mass;
      }
      
      this.calculateInertia();
    },

    densityUpdated(value){

      if(isNaN(parseFloat(value.value)) || isNaN(value.SIValue)  || value.SIValue < 0){
        var $densityComboBox = $(this.$el).find(".combo-container#density"+this.id+"combo").data('unitsComboBox');
        if($densityComboBox){
          $densityComboBox.setTextBoxValue(0);
          this.shapeModel.Density = 0;
        } 
      }
      else{
        this.shapeModel.Density = value.SIValue;
      }
      
      if(Densities[this.shapeModel.Material] !== value.SIValue ){
        this.shapeModel.Material = "Other";
      }

      this.calculateMass();
    },
    calculateInertia(){
      this.shapeModel.TotalInertia = (0.5) * this.shapeModel.Mass * ((this.shapeModel.Radius * this.shapeModel.Radius)*0.25);

      var $totalInertiaComboBox = $(this.$el).find(".combo-container#Momentofinertia"+this.id+"combo").data('unitsComboBox');
      if($totalInertiaComboBox){
        var requiredValueinSelectedUnit = $totalInertiaComboBox.getValueInSelectedUnit(this.shapeModel.TotalInertia);
        $totalInertiaComboBox.setTextBoxValue(requiredValueinSelectedUnit);
      } 
      this.$emit('totalInertiaValueChanged', this.shapeModel.TotalInertia);
    },
    calculateMass(){
      if(this.shapeModel.MassOrDensity == "Density"){
        this.shapeModel.Mass = this.shapeModel.Density * 3.14159 * ((this.shapeModel.Radius * this.shapeModel.Radius)*0.25) * this.shapeModel.Height;
        var $massComboBox = $(this.$el).find(".combo-container#mass"+this.id+"combo").data('unitsComboBox');
        if($massComboBox){
          var requiredValueinSelectedUnit = $massComboBox.getValueInSelectedUnit(this.shapeModel.Mass);
          $massComboBox.setTextBoxValue(requiredValueinSelectedUnit);
          // $massComboBox.setTextBoxValue(this.shapeModel.Mass);
        }  
      }
   
      this.calculateInertia();
    },

    updateSelectedInclusionMode: function(value){
      this.$emit('updateSelectedInclusionMode', value,this.id);
    }
  },
  created(){
      this.initializeShapeModel(this.shapeJson);
      this.shapeModel.Density = Densities[this.shapeModel.Material];
      this.$emit('shapeModelUpdated', this.shapeModel);
  },
  destroyed(){
    this.shapeModel = null;
    //this.$emit('shapeModelUpdated', this.shapeModel);
  },
  mounted(){
    this.updateMassDensityTabSelection();
    this.calculateMass();
    this.calculateInertia();
    $("#material"+this.id+"combo.combo-container").css({"max-width":"100%", "top":"3px","position":"relative"});
  },

  components:{
    solidCylinderFormulaView: SolidCylinderFormulaView,
    solidCylinderImageView: SolidCylinderImageView,
    unitComboBox: UnitComboBox,
    customDropdown: CustomDropdown,
    solidCylinderOutputView: SolidCylinderOutputView,
    modeView: ModeView,
  }
});
</script>
<template>
  <div :id="id" class="solidCylinderShape" :class="'shape'+id">
    <!--solid cylinder Image View-->
    <div id="imageInfo">
      <solidCylinderImageView></solidCylinderImageView>
      <solidCylinderFormulaView :formulaString="formulaString"></solidCylinderFormulaView>
    </div>
    <!--solid cylinder Form view-->
    <form class="form-horizontal">
      <div class="calcModeDiv">
        <form class='calcModeDivOptions'>
          <div class='textDiv'>Calculate Using:</div>
          <ul class="nav nav-tabs tabs-top">
            <li :class="{active:(shapeModel.MassOrDensity == 'Density' ? true: false)}" class="tabControl densityList" @click="massDensityEventHandler">
              <a data-toggle="tab" class="tabDiv"> Density</a>
            </li>
            <div class="verticalDiv"></div>
            <li :class="{active:(shapeModel.MassOrDensity == 'Mass'? true: false)}" class="tabControl massList" @click="massDensityEventHandler">
              <a data-toggle="tab" class="tabDiv"> Mass</a>
            </li>
          </ul>
          <!--<span class="calcModeSpan" v-on:click="massDensityEventHandler"> <label for="Density"> Density </label><input type='radio' name='calcMode' value='Mass' id='Mass' > <label for="Mass"> Mass </label></span></form>-->
        </form>
      </div>
      <div class="input-entries inputs">
        <div class="solidCyinderInputs">
          <unitComboBox label="Diameter: (D)" :idName="'radius'+id" unitType="DIAMETER" :unit="shapeModel.RadiusUnit" :value="shapeModel.Radius"
            :enableTextBox="true" :enableComboBox="true" :showComboBoxOnly="false" v-on:valueUpdated="radiusUpdated($event)"></unitComboBox>
          <unitComboBox v-show="shapeModel.MassOrDensity == 'Density'" label="Length: (L)" :idName="'height'+id" unitType="LINEARDISTANCE"
            :unit="shapeModel.HeightUnit" :value="shapeModel.Height" :enableTextBox="enableHeight" :enableComboBox="true" :showComboBoxOnly="false"
            v-on:valueUpdated="heightUpdated($event)"></unitComboBox>
          <!--<unitComboBox label="Material" idName="material" unitType="MATERIAL"  unit="Aluminium (1060 Alloy)" :value=10  :enableTextBox="enableMaterial" :enableComboBox="false" :showComboBoxOnly="true" v-on:valueUpdated="materialUpdated($event)"></unitComboBox>-->
          <customDropdown v-show="shapeModel.MassOrDensity == 'Density'" :label="'Material:'" :id="id" :material="shapeModel.Material"
            v-on:optionselected="updateMaterialType($event)"></customDropdown>
          <unitComboBox v-show="shapeModel.MassOrDensity == 'Density'" label="Density: (P)" :idName="'density'+id" unitType="DENSITY" :unit="shapeModel.DensityUnit"
            :value="shapeModel.Density" :enableTextBox="enableDensity" :enableComboBox="true" :showComboBoxOnly="false" v-on:valueUpdated="densityUpdated($event)"></unitComboBox>
          <unitComboBox label="Mass: (M)" :idName="'mass'+id" unitType="MASS" :unit="shapeModel.MassUnit" :value="shapeModel.Mass" :enableTextBox="enableMass"
            :enableComboBox="true" :showComboBoxOnly="false" v-on:valueUpdated="massUpdated($event)"></unitComboBox>
        </div>
      </div>
    </form>
    <form class="form-horizontal" id="inclusion-options">
      <modeView class="form-group input-container" :label="'Usage:'" :shape="shapeModel" :id="id" v-on:updateSelectedInclusionMode="updateSelectedInclusionMode($event)"
        :shapeInclusionMode="shapeModel.InclusionMode"></modeView>
    </form>
    <!--<hr class="horizontalRule">-->
    <!--solid cylinder output view-->
    <form class="form-horizontal" id="form-outputSection">
      <solidCylinderOutputView :label="this.label" :outputInertia="shapeModel.TotalInertia" :id="id" :outputInertiaUnit="shapeModel.TotalInertiaUnit"
        class="form-view"></solidCylinderOutputView>
    </form>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #inertia-calculator .containerDiv.complex-shape .solidCylinderShape {
    #imageInfo {
      width: 40%;
    }
    .form-horizontal {
      width: 53.7%;
      left: 43.5%;
      height: calc(100% - 196px);
    }
    .calcModeDiv {
      width: 99.99%;
    }
  }
  
  #inertia-calculator {
    .containerDiv {
      .solidCylinderShape {
        position: relative;
        height: 553px;
        border-left: none;
        border-bottom: none;
        #imageInfo {
          top: 0px;
          height: 544px;
          position: absolute;
          display: inline-block;
          border: 1px solid #E2E2E2;
          margin-left: 20px;
          .formulaSection{
            width: 190px;
          }
        }
        .form-horizontal {
          height: 544px;
          top: 0px;
          position: absolute;
          display: inline-block;
          padding-left: 0px;
          border: 1px solid #E2E2E2;
          .calcModeDiv {
            height: 58px;
            .calcModeDivOptions {
              background-color: #f6f6f6;
              font-family: "Open sans", Arial, Tahoma;
              font-size: 16px;
              .textDiv {
                display: inline-block;
                color: #343434;
                margin-left: 28px;
                padding-top: 18px;
                font-weight: 700;
                padding-bottom: 18px;
              }
              .nav-tabs {
                display: inline-block;
                border: none;
                top: 8px;
                float: right;
                position: relative;
                .verticalDiv {
                  border-left: 1px solid #cbcbcb;
                  height: 28px;
                  position: absolute;
                  top: 8px;
                  margin-right: 26px;
                  float: left;
                  position: relative;
                }
                li {
                  border: none;
                  background-color: unset;
                  width: 80px;
                  margin-right: 26px;
                  float: left;
                  height: 34px;
                  top: 5px;
                  position: relative;
                  &:hover {
                    background-color: #E9E9E9;
                  }
                  &.active {
                    font-weight: 700;
                    border-bottom: 4px solid #0277bd;
                    a {
                      color: #0277bd;
                    }
                  }
                  a {
                    border: none;
                    background-color: unset;
                    color: #343434;
                    padding-left: 18px;
                    padding-right: 18px;
                    margin-right: 0px;
                    cursor: pointer;
                  }
                }
                .massList {
                  width: 71px;
                }
                .densityList {
                  width: 88px;
                }
              }
            }
          }
          .inputs {
            width: 100%;
            display: inline-block;
            vertical-align: top;
            padding-top: 15px;
            .solidCyinderInputs {
              padding-left: 62px;
              .input-container {
                margin-bottom: 10px;
                margin-left: 0px;
                .unitTextBox {
                  /*min-width: 156px;*/
                }
                .unitComboBox {
                  /*min-width: 156px;*/
                }
              }
              label {
                display: inline-block;
                max-width: 100%;
                margin-bottom: 5px;
                font-weight: normal;
                font-family: "Open sans", Arial, Tahoma;
                font-size: 16px;
                color: #343434;
                width: 26%;
                text-align: left;
              }
            }
          }
        }
        #form-outputSection {
          bottom: 10px;
          top: auto;
          height: 100px;
          .output-entries {
            .control-label {
              font-size: 16px;
            }
          }
        }
        #inclusion-options {
          bottom: 124px;
          position: absolute;
          height: 56px;
          top: auto;
        }
      }
    }
  }
  
  #inertia-calculator .form-horizontal .inputs .input-container .combo-container,
  #inertia-calculator .form-outputSection .inputs .combo-container {
    padding-left: 15px;
    width: 63%;
    display: inline-block;
    position: relative;
    top: 9px;
  }
  
  #inertia-calculator .form-horizontal .inclusionMode.combo-container {
    padding-left: 48px;
    width: 63%;
    display: inline-block;
    position: relative;
    top: 0px;
  }
  
  #inertia-calculator.lowerResolution {
    .containerDiv {
      .solidCylinderShape {
        .form-horizontal {
          .calcModeDiv {
            height: 45px;
            .calcModeDivOptions {
              font-size: 14px;
              .textDiv {
                margin-left: 20px;
              }
              .nav-tabs {
                .verticalDiv {
                  margin-right: 20px;
                }
                li {
                  margin-right: 20px;
                  float: left;
                  a {
                    padding-left: 10px;
                    padding-right: 10px;
                  }
                }
                .massList {
                  width: 48px;
                }
                .densityList {
                  width: 62px;
                }
              }
            }
          }
          .inputs {
            .solidCyinderInputs {
              padding-left: 21px;
              .input-container {
                .unitTextBox {
                  /*min-width: 90px;*/
                }
                .unitComboBox {
                  min-width: 85px;
                }
              }
              label {
                font-size: 14px;
                width: 28%;
                top: 8px;
                position: relative;
              }
              .materialContainer label {
                top: 3px;
              }
            }
          }
        }
        #form-outputSection {
          bottom: 9px;
        }
      }
    }
  }
  
  #inertia-calculator.lowerResolution .containerDiv.complex-shape {
    .solidCylinderShape {
      #imageInfo {
        margin-left: 12px;
        .formulaSection{
          width: 150px;
        }
      }
      .form-horizontal {
        .inputs {
          .solidCyinderInputs {
            .input-container {
              .unitTextBox {
                /*min-width: 90px;*/
              }
              label {
                width: 33%;
              }
              .combo-container {
                width: 60%;
              }
            }
          }
        }
      }
    }
  }
  
  #inertia-calculator.mediumResolution {
    .containerDiv {
      .solidCylinderShape {
        #imageInfo {}
        .form-horizontal {
          .calcModeDiv {
            height: 51px;
            .calcModeDivOptions {
              .textDiv {
                margin-left: 24px;
              }
              .nav-tabs {
                .verticalDiv {
                  margin-right: 23px;
                }
                li {
                  margin-right: 23px;
                  a {
                    padding-left: 10px;
                    padding-right: 10px;
                  }
                }
                .massList {
                  width: 59px;
                }
                .densityList {
                  width: 75px;
                }
              }
            }
          }
          .inputs {
            .solidCyinderInputs {
              padding-left: 41px;
              .input-container {
                .unitTextBox {
                  min-width: 135px;
                }
                .unitComboBox {
                  min-width: 127px;
                  /*top: -3px;*/
                  position: relative;
                }
              }
              label {
                font-size: 15px;
                width: 29%;
                top: 11px;
                position: relative;
              }
              .materialContainer label {
                top: 3px;
              }
            }
          }
        }
      }
    }
  }

</style>
