<script lang="ts">

import UnitComboBox from './../../UnitComboBoxView/UnitComboBox';
import HollowCylinderImageView from './../../ImageView/ImageView';
import HollowCylinderFormulaView from './../../FormulaeView/FormulaView';
import HollowCylinderOutputView from './../../OutputView/OutputView';
import {HollowCylinderShapeModel} from './HollowCylinderShapeModel';
import CustomDropdown from './../../CustomDropdown/CustomDropdown'; 
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
              let imgPath = "./src/Assets/img/inertia-calculator/HCylinder_Mass.svg";
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
            let imgPath = "./src/Assets/img/inertia-calculator/HCylinder_Density.svg";
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
      this.shapeModel = new HollowCylinderShapeModel(shapeJson);
      this.inputJson.Shapes[this.id].ShapeInfo = this.shapeModel;
    },

    innerRadiusUpdated(value){
      var $innerRadiusComboBox = $(this.$el).find(".combo-container#innerRadius"+this.id+"combo").data('unitsComboBox');

      if(isNaN(parseFloat(value.value)) || isNaN(value.SIValue) || value.SIValue < 0){
        if($innerRadiusComboBox){
          $innerRadiusComboBox.setTextBoxValue(0);
          this.shapeModel.InnerRadius = 0;
        } 
      }
      else{
        this.shapeModel.InnerRadius = value.SIValue;
      }
      if( this.shapeModel.OuterRadius <  this.shapeModel.InnerRadius){
        $innerRadiusComboBox.find(".unitTextBox").addClass("has-error");
      } 
      else{
        $(this.$el).find(".unitTextBox").removeClass("has-error");
      }

      this.calculateMass();
    },

    outerRadiusUpdated(value){
      
      var $outerRadiusComboBox =  $(this.$el).find(".combo-container#outerRadius"+this.id+"combo").data('unitsComboBox');

      if(isNaN(parseFloat(value.value)) || isNaN(value.SIValue) || value.SIValue < 0){
        if($outerRadiusComboBox){
          $outerRadiusComboBox.setTextBoxValue(0);
          this.shapeModel.OuterRadius = 0;
        } 
      }
      else{
        this.shapeModel.OuterRadius = value.SIValue;
      }

      if( this.shapeModel.OuterRadius <  this.shapeModel.InnerRadius){
        $outerRadiusComboBox.find(".unitTextBox").addClass("has-error");
      } 
      else{
        $(this.$el).find(".unitTextBox").removeClass("has-error");
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
      if( isNaN(value.SIValue)  || value.SIValue < 0){
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

      var $totalInertiaComboBox = $(this.$el).find(".combo-container#Momentofinertia"+this.id+"combo").data('unitsComboBox');
      if( this.shapeModel.OuterRadius <  this.shapeModel.InnerRadius){
         this.shapeModel.TotalInertia = 0;
         $totalInertiaComboBox.setTextBoxValue(this.shapeModel.TotalInertia);
      }
      else{
        this.shapeModel.TotalInertia = (0.5) * this.shapeModel.Mass * ( ((this.shapeModel.OuterRadius * this.shapeModel.OuterRadius)*0.25) + ((this.shapeModel.InnerRadius * this.shapeModel.InnerRadius)*0.25) );      
        if($totalInertiaComboBox){
          var requiredValueinSelectedUnit = $totalInertiaComboBox.getValueInSelectedUnit(this.shapeModel.TotalInertia);
          $totalInertiaComboBox.setTextBoxValue(requiredValueinSelectedUnit);
        }
      }
       
      this.$emit('totalInertiaValueChanged', this.shapeModel.TotalInertia);
    },
    calculateMass(){
      if(this.shapeModel.MassOrDensity == "Density"){
        this.shapeModel.Mass = this.shapeModel.Density * 3.14159 * this.shapeModel.Height * (((this.shapeModel.OuterRadius * this.shapeModel.OuterRadius)*0.25) - ((this.shapeModel.InnerRadius * this.shapeModel.InnerRadius)*0.25) );
        var $massComboBox = $(this.$el).find(".combo-container#mass"+this.id+"combo").data('unitsComboBox');
        if($massComboBox){
          var requiredValueinSelectedUnit = $massComboBox.getValueInSelectedUnit(this.shapeModel.Mass);
          if(requiredValueinSelectedUnit<0){
           $massComboBox.setTextBoxValue("");  
          }
          else{
             $massComboBox.setTextBoxValue(requiredValueinSelectedUnit);
          }
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

  mounted(){
    this.updateMassDensityTabSelection();
    this.calculateMass();
    this.calculateInertia();
    $("#material"+this.id+"combo.combo-container").css({"max-width":"100%", "top":"3px","position":"relative"});
  },

  destroyed(){
    this.shapeModel = null;
    //this.$emit('shapeModelUpdated', this.shapeModel);
  },
  components:{
    hollowCylinderFormulaView: HollowCylinderFormulaView,
    HollowCylinderImageView: HollowCylinderImageView,
    unitComboBox: UnitComboBox,
    customDropdown: CustomDropdown,
    HollowCylinderOutputView: HollowCylinderOutputView,
    modeView: ModeView,
  }
});
</script>
<template>
  <div :id="id" class="hollowCylinderShape" :class="'shape'+id">
    <!--hollow cylinder Image View-->
    <div id="imageInfo">
      <HollowCylinderImageView></HollowCylinderImageView>
      <hollowCylinderFormulaView :formulaString="formulaString"></hollowCylinderFormulaView>
    </div>
    <!--hollow cylinder Form view-->
    <form class="form-horizontal">
      <div class="calcModeDiv">
        <form class='calcModeDivOptions'>
          <div class='textDiv'>Calculate Using:</div>
          <ul class="nav nav-tabs tabs-top">
            <li :class="{active:(shapeModel.MassOrDensity == 'Density' ? true: false)}" class="tabControl densityList" @click="massDensityEventHandler">
              <a data-toggle="tab" class="tabDiv"> Density</a>
            </li>
            <span class="verticalDiv"></span>
            <li :class="{active:(shapeModel.MassOrDensity == 'Mass'? true: false)}" class="tabControl massList" @click="massDensityEventHandler">
              <a data-toggle="tab" class="tabDiv"> Mass</a>
            </li>
          </ul>
          <!--<span class="calcModeSpan" v-on:click="massDensityEventHandler"> <label for="Density"> Density </label><input type='radio' name='calcMode' value='Mass' id='Mass' > <label for="Mass"> Mass </label></span></form>-->
        </form>
      </div>
      <div class="input-entries inputs">
        <div class="hollowCyinderInputs">
          <unitComboBox label="Outside Diameter: (D1)" :idName="'outerRadius'+id" unitType="DIAMETER" :unit="shapeModel.OuterRadiusUnit"
            :value="shapeModel.OuterRadius" :enableTextBox="true" :enableComboBox="true" :showComboBoxOnly="false" v-on:valueUpdated="outerRadiusUpdated($event)"></unitComboBox>
          <unitComboBox label="Inside Diameter: (D2)" :idName="'innerRadius'+id" unitType="DIAMETER" :unit="shapeModel.InnerRadiusUnit"
            :value="shapeModel.InnerRadius" :enableTextBox="true" :enableComboBox="true" :showComboBoxOnly="false" v-on:valueUpdated="innerRadiusUpdated($event)"></unitComboBox>
          <unitComboBox label="Length: (L)" v-show="shapeModel.MassOrDensity == 'Density'" :idName="'height'+id" unitType="LINEARDISTANCE"
            :unit="shapeModel.HeightUnit" :value="shapeModel.Height" :enableTextBox="enableHeight" :enableComboBox="true" :showComboBoxOnly="false"
            v-on:valueUpdated="heightUpdated($event)"></unitComboBox>
          <!--<unitComboBox label="Mass" idName="mass" unitType="MASS"  :unit="shapeModel.MassUnit" :value="shapeModel.Mass" :enableTextBox="enableMass" :enableComboBox="true" :showComboBoxOnly="false" v-on:valueUpdated="massUpdated($event)"></unitComboBox>-->
          <!--<unitComboBox label="Material" idName="material" unitType="MATERIAL"  unit="Aluminium (1060 Alloy)" :value=10  :enableTextBox="enableMaterial" :enableComboBox="false" :showComboBoxOnly="true" v-on:valueUpdated="materialUpdated($event)"></unitComboBox>-->
          <customDropdown :label="'Material:'" v-show="shapeModel.MassOrDensity == 'Density'" :id="id" :material="shapeModel.Material"
            v-on:optionselected="updateMaterialType($event)"></customDropdown>
          <unitComboBox label="Density: (P)" v-show="shapeModel.MassOrDensity == 'Density'" :idName="'density'+id" unitType="DENSITY" :unit="shapeModel.DensityUnit"
            :value="shapeModel.Density" :enableTextBox="enableDensity" :enableComboBox="true" :showComboBoxOnly="false" v-on:valueUpdated="densityUpdated($event)"></unitComboBox>
          <unitComboBox label="Mass: (M)" :idName="'mass'+id" unitType="MASS" :unit="shapeModel.MassUnit" :value="shapeModel.Mass" :enableTextBox="enableMass"
            :enableComboBox="true" :showComboBoxOnly="false" v-on:valueUpdated="massUpdated($event)"></unitComboBox>
        </div>
        <!--<solidCylinderInputsView  :inputsObj="inputsObj" :massOrDensity="shapeModel.massOrDensity" :enableRadius="">-->
        <!--</solidCylinderInputsView>-->
      </div>
    </form>
    <form class="form-horizontal" id="inclusion-options">
      <modeView class="form-group input-container" :label="'Usage:'" :shape="shapeModel" :id="id" v-on:updateSelectedInclusionMode="updateSelectedInclusionMode($event)"
        :shapeInclusionMode="shapeModel.InclusionMode"></modeView>
    </form>
    <!--<hr class="horizontalRule">-->
    <!--hollow cylinder output view-->
    <form class="form-horizontal" id="form-outputSection">
      <HollowCylinderOutputView :label="this.label" :outputInertia="shapeModel.TotalInertia" :id="id" :outputInertiaUnit="shapeModel.TotalInertiaUnit"
        class="form-view"></HollowCylinderOutputView>
    </form>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #inertia-calculator .containerDiv.complex-shape .hollowCylinderShape {
    #imageInfo {
      width: 40%;
    }
    .form-horizontal {
      width: 53.7% !important;
      left: 43.5%;
      height: calc(100% - 196px);
    }
    .calcModeDiv {
      width: 99.99%;
    }
  }
  
  #inertia-calculator {
    .hollowCylinderShape {
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
            width: 350px;
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
          .hollowCyinderInputs {
            padding-left: 62px;
            .input-container {
              margin-bottom: 10px;
              margin-left: 0px;
              .unitTextBox {
                /*min-width: 156px;*/
                &.has-error {
                  .form-control {
                    border-color: indianred;
                  }
                  &:hover:after {
                    position: absolute;
                    width: 220px;
                    content: "Inside Diameter cannot be greater than Outside Diameter";
                    text-align: center;
                    font-size: 14px;
                    color: #343434;
                    background: #fffde7;
                    border-radius: 2px;
                    padding: 3px;
                    position: absolute;
                    z-index: 99999;
                    bottom: 120%;
                    left: 52%;
                    margin-left: -233px;
                    border: 3px soild #C2C2C2;
                  }
                }
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
  
  .form-horizontal .inputs .input-container .combo-container,
  .form-outputSection .inputs .combo-container {
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
      .hollowCylinderShape {
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
            .hollowCyinderInputs {
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
                width: 33%;
                top: 8px;
                position: relative;
              }
              .combo-container {
                width: 60%;
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
    .hollowCylinderShape {
      #imageInfo {
        margin-left: 12px;
        .formulaSection{
          width: 262px;
        }
      }
      .form-horizontal {
        .inputs {
          .hollowCyinderInputs {
            .input-container {
              .unitTextBox {
                 &.has-error {
                  &:hover:after {
                    position: absolute;
                    width: 220px;
                    font-size: 12px;
                    left: 75%;
                  }
                }
              }
              label {
                width: 33%;
              }
            }
          }
        }
        .output-entries {
          .unitTextBox {
            min-width: 130px;
          }
          .unitComboBox {
            min-width: 130px;
            position: relative;
            .btn-group .boxSelectedVal {
              min-width: 130px;
            }
          }
        }
      }
    }
  }
  
  #inertia-calculator.mediumResolution {
    .containerDiv {
      .hollowCylinderShape {
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
            .hollowCyinderInputs {
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
