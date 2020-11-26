<script lang="ts">
import TotalInertiaImageView from './../Components/ImageView/ImageView';
import TotalInertiaFormulaView from './../Components/FormulaeView/FormulaView';
import UnitComboBoxView from './../Components/UnitComboBoxView/UnitComboBox';
import OutputView from './../Components/OutputView/OutputView';
import CustomTableView from './../Components/CustomTableView/CustomTableView';

declare var $: any;
declare var MathJax: any;
export default {
  name:'TotalInertia',
  props:['totalInertiaFormulaString','totalInertiaValue','totalInertia','shapeName','shapeInclusionMode','updateTotalInertiaView'],
  data () {
    return {
      totalInertiaUnit:"kilogrammetersquare",
      label:"Moment of Inertia"
    }
  },
  methods:{

    // Returns the serialized data of totalInertia of IC
    getSerializedData() {
      return JSON.stringify({
        totalInertia: this.totalInertia,
        totalInertiaValue: this.totalInertiaValue,
        totalInertiaUnit: this.totalInertiaUnit
      });
    }
  },

  components:{
    totalInertiaFormulaView:TotalInertiaFormulaView,
    unitComboBox:UnitComboBoxView,
    totalInertiaImageView:TotalInertiaImageView,
    OutputView: OutputView,
    customTableView: CustomTableView

  },

  created(){
    this.selectedShape = this.inputJson.SelectedShape;
    // if(MathJax!=undefined){
    //     MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    // }
  },
  mounted(){
    var imgPath = "./src/Assets/img/inertia-calculator/ComplexShape.png";
     $(this.$el).find("#imageContainer").css({"background-image": "url("+imgPath+")"});

    var topOffset = $(this.$el).find(".tableView").height();
     $(this.$el).find(".totalInertiaView  #form-outputSection").css({"top":topOffset+20});

  },

  updated(){
    var topOffset = $(this.$el).find(".tableView").height();
     $(this.$el).find(".totalInertiaView  #form-outputSection").css({"top":topOffset+20});
  },
  watch:{
    
    totalInertia: function() {
      this.$emit('totalInertiaValueChanged', this.getSerializedData());
    },
    updateTotalInertiaView: function(){
      var self = this;
      if(this.updateTotalInertiaView){
        setTimeout(function(){
            var topOffset = $(self.$el).find(".tableView").height();
          $(self.$el).find("#form-outputSection").css({"top":topOffset+20});
          
        },0);
      }
    }

  }
}
</script>
<template>
  <div class="totalInertiaView">
    <!--solid cylinder Image View-->
    <!--<div id="imageInfo" >
      <totalInertiaImageView></totalInertiaImageView>
      <totalInertiaFormulaView :formulaString="totalInertiaFormulaString"></totalInertiaFormulaView>
    </div>-->
    <customTableView :shapeName="shapeName" :totalInertiaValue="totalInertiaValue" :shapeInclusionMode="shapeInclusionMode" class="tableView"></customTableView>
    <form class="form-horizontal " id="form-outputSection">
      <totalInertiaFormulaView :formulaString="totalInertiaFormulaString"></totalInertiaFormulaView>
      <OutputView :label="this.label" :outputInertia="totalInertia" id="total" :outputInertiaUnit="totalInertiaUnit"></OutputView>
    </form>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .totalInertiaView {
    position: relative;
    height: 553px;
    border-left: none;
    border-bottom: none;
    #imageInfo {
      top: 0px;
      height: 666px;
      position: absolute;
      display: inline-block;
      border: 1px solid #E2E2E2;
      margin-left: 20px;
      width: 42%;
      #imageContainer {
        height: 550px;
        background-position-y: center;
        background-size: unset;
        left: 0px;
        top: 0px;
      }
      .formulaSection {
        top: 550px;
        height: 105px;
        .MathJax_Display, .MathJax_SVG_Display {
          width: 295px;
          max-width: unset;
          padding-top: 15px;
          padding-bottom: 15px;
          margin-left: 12px;
        }
      }
    }
    .tableView {
      top: 0px;
      position: absolute;
      display: inline-block;
      padding-left: 0px;
      left: 0px;
      margin-left: 20px;
      width: 96%;
    }
    #form-outputSection {
      position: absolute;
      display: inline-block;
      padding-left: 0px;
      border: 1px solid #E2E2E2;
      margin-left: 0px;
      margin-right: 0px;
      left: 0px;
      margin-left: 20px;
      width: 96%;
      height: 184px;
      .output-entries {
        margin-top: 37px;
        .form-group {
          margin-right: 0px;
          margin-left: 0px;
          .control-label {
            display: none!important;
            font-size: 22px;
            margin-bottom: 8px;
          }
          .combo-container {
            display: block;
            padding-left: 22px;
            .cosmatt-unitComboBox {
              .unitTextBox {
                min-width: 200px;
              }
              .unitComboBox {
                min-width: 200px;
              }
              button.boxSelectedVal {
                min-width: 200px;
              }
            }
          }
        }
      }
      .formulaSection {
        width: auto!important;
        text-align: initial!important;
        top: 18px;
        height: 74px;
        transform: none;
        left: 10px;
        .MathJax_Display , .MathJax_SVG_Display{
          font-size: 17px!important;
          width: auto!important;
        }
      }
    }
  }
  
  #inertia-calculator.lowerResolution .totalInertiaView {
    #imageInfo {
      height: 534px;
      #imageContainer {
        height: 405px;
      }
      .formulaSection {
        top: 397px;
      }
    }
    .tableView {
      margin-left: 10px;
    }
    #form-outputSection {
      margin-left: 10px;
      .output-entries {
        .form-group {
          .control-label {
            font-size: 16px;
          }
          .cosmatt-unitComboBox {
            .cosmatt-unitComboBox {
              input {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  
  #inertia-calculator.mediumResolution .totalInertiaView {
    #imageInfo {
      #imageContainer {
        height: 490px;
        top: 0px;
      }
      .formulaSection {
        top: 445px;
      }
    }
    #form-outputSection {
      .output-entries {
        .form-group {
          .control-label {
            font-size: 20px;
          }
        }
      }
    }
  }
  
  #inertia-calculator.lowerResolution .containerDiv.complex-shape {
    .totalInertiaView {
      #imageInfo {
        margin-left: 12px;
      }
      .form-horizontal#form-outputSection {
        top: 155px;
        .output-entries {
          .unitTextBox {
            min-width: 130px;
          }
          .unitComboBox {
            min-width: 130px;
            .btn-group .boxSelectedVal {
              min-width: 130px;
            }
          }
        }
      }
    }
  }

</style>
