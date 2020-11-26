<script lang="ts">
import {Densities, MassOrDensity} from './../Constants/data';
export default{
  props:['label','id','material'],
  data () {
    return {
      materials: Object.keys(Densities) 
    }
  },
  methods:{
    updateSelectedMaterial: function($event){
      this.$emit('optionselected',$event.target.text);  
    }
  },
  created(){
  }
}
</script>
<template>
  <div :id="'material'+id" class="form-group input-container materialContainer">
    <label for="label" class="control-label">{{label}}</label>
    <div :id="'material'+id+'combo'" data-name="Material" class="combo-container materialCombo">
      <div class="cosmatt-unitComboBox">
        <div class="unitComboBox">
          <div class="btn-group"><button type="button" data-toggle="dropdown" class="btn btn-default" id="comboBoxMaterial">{{material}}</button>
            <button type="button" data-toggle="dropdown" class="btn btn-default dropdown-toggle">
              <span class="caret"></span>
              </button>
            <ul class="dropdown-menu">
              <li v-for="item in materials"><a class="dropdown-item selected" @click="updateSelectedMaterial">{{item}}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #inertia-calculator .materialContainer {
    top: 6px;
    position: relative;
    min-width: 100px;
    width: 100%;
    .control-label {
      padding-top: 0px;
    }
    .materialCombo {
      padding-left: 22px!important;
      .unitComboBox {
        width: 100%!important;
        max-width: none;
        /*min-width: 319px!important;*/
        margin-left: 0px;
        #comboBoxMaterial {
          max-width: none!important;
          color: #555;
          overflow: hidden;
        }
      }
      .unitTextBox {
        width: 0%!important;
        margin-right: 0px;
        max-width: none;
      }
    }
  }
  
  #inertia-calculator .materialCombo .open>.dropdown-menu {
    width: 100%;
  }
  
  #inertia-calculator .materialCombo .btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle) {
    width: 100%;
    max-width: 100%;
    color: #555;
  }
  /*#inertia-calculator.lowerResolution .containerDiv.complex-shape .materialContainer .materialCombo .unitComboBox #comboBoxMaterial{
  max-width: 179px!important;
}*/
  
  #inertia-calculator.lowerResolution .materialContainer {
    .materialCombo {
      padding-left: 13px!important;
    }
    .unitComboBox {
      /*min-width: 200px!important;*/
    }
  }
  
  #inertia-calculator.mediumResolution .materialContainer {
    .materialCombo {
      padding-left: 13px!important;
    }
    .unitComboBox {
      min-width: 271px!important;
      .btn-group {
        max-width: 282px!important;
      }
    }
  }

</style>
