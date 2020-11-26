<script lang="ts">
declare var $: any;
export default {
  props:['totalInertiaValue','id'],
  data () {
    return {
    }
  },
  methods:{
    updateLabelControl: function(){
        $("#"+this.id).data('unitsComboBox').setTextBoxValue(this.totalInertiaValue);
    }
  },
  mounted(){
    var self = this;
      $("#"+this.id).unitsLabelControl({
      "unitType" : "INERTIA",
      "unit" : "kilogrammetersquare",
      "value" : self.totalInertiaValue,     
      });
  },
  watch:{
    totalInertiaValue: function(){
      this.updateLabelControl();
    }
  }
}
</script>
<template>
  <span :id="id">
  </span>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
