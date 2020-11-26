<script lang="ts">

declare var  $: any;

export default {
  name:"imageView",
  props:[],
  data () {
      return {
    }
  },
  methods:{

  }
}
</script>
<template>
  <div id="imageContainer">
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #inertia-calculator #imageContainer {
    background-position-x: center;
    height: 442px;
    width: 100%;
    position: absolute;
    background-repeat: no-repeat;
    background-size: contain;
  }
  
  #inertia-calculator.mediumResolution #imageContainer {
    height: 68%;
    top: 15px;
  }
  
  #inertia-calculator.lowerResolution #imageContainer {
    height: 68%;
    top: 40px;
  }

</style>
