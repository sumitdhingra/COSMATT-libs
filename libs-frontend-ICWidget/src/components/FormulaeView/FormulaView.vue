<script lang="ts">
declare var MathJax: any;
declare var $: any;
export default{
  props:['formulaString'],
  data () {
    return {
    }
  },
  methods:{
  },
  updated(){
 
  },
  mounted(){
  },
  watch:{
     formulaString: function () {
      var self = this;
      var el = self.$el;
      var $formulaDiv = $(el).find(".formula script");

      if($formulaDiv.length){
        if(MathJax){
           var jax = MathJax.Hub.getJaxByInputType("math/tex",el)[0]; // For COSMATT-1733; getting jax for the current element
           MathJax.Hub.Queue(["Text", jax, self.formulaString]);//updating jax to the current formulastring
         }
      }
      else{
        $formulaDiv = $(el).find(".formula");
        if($formulaDiv.length){
          $formulaDiv[0].textContent = "$$"+self.formulaString+"$$";
            MathJax.Hub.Queue(["Typeset",MathJax.Hub, $formulaDiv[0]]);
        }
      }

    }
  }
 
}
</script>
<template>
  <div class='formulaSection'>
    <div class="formula"> </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #inertia-calculator.mediumResolution .containerDiv:not(.complex-shape) .formulaSection .MathJax_Display {
    font-size: 18px;
  }
  
  #inertia-calculator .formulaSection {
    top: 77%;
    height: 98px;
    left: 50%;
    transform: translate(-50%);
    position: relative;
    .MathJax_Display, .MathJax_SVG_Display {
      font-size: 23px;
      margin-top: 5px;
      margin-bottom: 0px;
      display: inline-block!important;
      border: 1px solid #199ed5;
      border-radius: 10px;
      padding: 7px;
      background-color: #e2f4fd;
      font-family: "Times New Roman";
      font-weight: bold;
      font-style: italic;
      color: #4c4c4c;
    }
  }
  
  #inertia-calculator .containerDiv.complex-shape {
    .formulaSection {
      .MathJax_Display, .MathJax_SVG_Display {
        font-size: 19.5px;
      }
    }
  }
  
  #inertia-calculator.lowerResolution .formulaSection {
    top: 79%;
    .MathJax_Display, .MathJax_SVG_Display {
      padding: 5px;
      font-size: 21px
    }
  }
  
  #inertia-calculator.lowerResolution .containerDiv.complex-shape {
    .formulaSection {
      .MathJax_Display, .MathJax_SVG_Display {
        /*width: 200px;*/
        font-size: 13.5px;
      }
    }
  }
  
  #inertia-calculator.mediumResolution .formulaSection {
    .MathJax_Display, .MathJax_SVG_Display {
      padding: 6px;
      font-size: 23px;
    }
  }
  
  #inertia-calculator.mediumResolution .containerDiv.complex-shape {
    .formulaSection {
      .MathJax_Display , .MathJax_SVG_Display {
        /*width: 300px;*/
        font-size: 20px;
        text-align: center;
      }
    }
  }

</style>
