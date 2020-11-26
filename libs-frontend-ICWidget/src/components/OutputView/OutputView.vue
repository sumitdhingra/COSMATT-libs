<script lang="ts">

declare var $: any;

import UnitComboBox from './../UnitComboBoxView/UnitComboBox';
export default {
  name:"OutputView",
  props:['outputInertia','outputInertiaUnit','id','label'],
  data () {
    return {}
  },
  methods:{
  },
  created(){
  
  },
  watch:{
    outputInertia: function () {
      var reqValue = $(this.$el).find(".combo-container").data("unitsComboBox").getValueInSelectedUnit(this.outputInertia);
      $(this.$el).find(".combo-container").data("unitsComboBox").setTextBoxValue(reqValue);
    }
  },
   components:{
    unitComboBox: UnitComboBox
  }
}
</script>
<template>
  <div class="output-entries inputs">
    <unitComboBox :label="label" :idName="'Momentofinertia'+id" unitType="INERTIA" :unit="outputInertiaUnit" :value="outputInertia"
      :enableTextBox="false" :enableComboBox="true" :showComboBoxOnly="false"></unitComboBox>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #inertia-calculator .output-entries {
    padding-top: 0px!important;
    margin-top: 11px;
    .input-container {
      margin-bottom: 8px;
        margin-right: 0px;
        margin-left: 0px;
        .control-label {
          display: block;
          margin-left: 15px;
          font-family: "Open sans", Arial, Tahoma;
          font-weight: 600;
          color: #343434;
          margin-bottom: 10px;
        }
        .combo-container {
          display: block;
          padding-left: 26px;
          width: 100%!important;
        }
    }
  }
  
  #inertia-calculator.lowerResolution .output-entries {
    .input-container {
        .control-label {
          margin-left: 13px;
          font-size: 14px!important;
        }
        .combo-container {
          padding-left: 13px;
          .cosmatt-unitComboBox {
            .unitTextBox {
              /*min-width: 125px;*/
              width: 90%!important;
              margin-bottom: 8px;
              input {
                font-size: 14px;
                height: 30px;
              }
            }
            .unitComboBox {
              /*min-width: 100px;*/
                .btn-group {
                  height: 30px;
                }
            }
            button.boxSelectedVal {
              min-width: 58px;
            }
          }
        }
        &#MomentofinertiatotalInertiaListView {
          .control-label{
            margin-bottom: 0px;
            font-size: 14px;
          }
          .cosmatt-unitComboBox{
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            .unitComboBox{
              margin-left: 0px;
              width: 90%!important;
            }
            .cosmatt-unitComboBox {
            .unitTextBox {
              min-width: 110px;
              input {
                font-size: 16px;
              }
            }
            button.boxSelectedVal {
              min-width: 87px;
            }
           }
          }
        }
    }
  }
  

  #inertia-calculator.mediumResolution .output-entries.form-view {
    .input-container {
        .combo-container {
          top: 2px!important;
        }
    }
  }


  #inertia-calculator.mediumResolution .output-entries {
    .input-container {
        .combo-container {
          .cosmatt-unitComboBox {
            .unitTextBox {
              min-width: 160px;
            }
            button.boxSelectedVal {
              min-width: 142px;
            }
          }
        }
      .control-label {
        font-size: 18px;
      }
      .cosmatt-unitComboBox .unitTextBox .input-group input.input-control {
        height: 36px;
      }
      .unitComboBox {
        .btn-group {
          height: 36px;
        }
      }
      &#MomentofinertiatotalInertiaListView{
        margin-top: 20px;
        .cosmatt-unitComboBox {
          .unitTextBox {
            min-width: 50px;
          }
           .unitComboBox{
              /*min-width: 125px;*/
              width: 90%!important;
            }
          button.boxSelectedVal {
            min-width: 102px;
          }
        }
      }
    }
  }
  
  #inertia-calculator .output-entries .input-container .control-label {
    top: 10px;
  }

</style>
