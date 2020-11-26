<script lang="ts">
declare var $: any;
export default {
  props:['label','idName','unitType','unit','value','enableTextBox', 'enableComboBox','showComboBoxOnly'],
  data () {
    return {
    }
  },
  methods:{
    updateValues(){
      var $comboBoxContainer =  $(".combo-container#"+this.idName+"combo");
      var self = this;
      $comboBoxContainer.data("unitsComboBox").update({
      "enable": {
          "textbox": this.enableTextBox.toString(),
          "comboBox": this.enableComboBox.toString()
      }
    });
    }
  },
  mounted : function() {
    var $comboBoxContainer =  $(".combo-container#"+this.idName+"combo");
    var self = this;
    $comboBoxContainer.unitsComboBox({
            "unitType":this.unitType,
            "unit": this.unit,
            "roundOfNumber": "2",
            "min":"0",
            "value": this.value,
            "comboBoxWidthRatio": {
                "textBox": "50%",
                "comboBox": "50%"
            },
            "showComboBoxOnly":this.showComboBoxOnly.toString(),
            callBackFn: function () {
                self.$emit('valueUpdated',this);
            }
        });

        $comboBoxContainer.data("unitsComboBox").update({
              "enable": {
                  "textbox": this.enableTextBox.toString(),
                  "comboBox": this.enableComboBox.toString()
              }
          });
  }
}
</script>

<template>
  <div class='form-group input-container' v-bind:id="idName"> 
    <label for="label" class="control-label">{{label}}</label>
    <div class= combo-container v-bind:id="idName + 'combo'" v-bind:data-name="label" > 
    </div>
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
