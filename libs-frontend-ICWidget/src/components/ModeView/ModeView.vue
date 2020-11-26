<script lang="ts">
declare var $: any;
export default {
  props:['shape','id','shapeInclusionMode','label'],
  data () {
    return {    
    }
  },
  methods:{
      updateSelectedInclusionMode: function(e){
        if($(e.target).hasClass("glyphicon")){
          this.$emit('updateSelectedInclusionMode', $(e.target).text().trim());
           e.preventDefault();
           e.stopPropagation();
        }
      },

      onInclusionModeChange: function(){
        $(this.$el).find("input").removeAttr("checked");
        if(this.shapeInclusionMode == "Subtractive"){
          $(this.$el).find(".inclusion-mode-radio-subtractive input").prop('checked','checked');
        }
        else{
          $(this.$el).find(".inclusion-mode-radio-additive input").prop('checked','checked');
        }
      }
  },
  created(){

  },
  mounted(){
    this.onInclusionModeChange();
  },
  watch:{
    shapeInclusionMode: function(){
      this.onInclusionModeChange();
    
    }
  },
   components:{
  }
}
</script>
<template>
  <div class="modeViewOuterDiv" >
    <!--<label class="title-label">{{label}}</label>-->
  <div class="modeViewDiv">
    <label class="mode-label">Mode:</label>
    <div class="inclusion-mode-radio inclusionMode combo-container" @click="updateSelectedInclusionMode">
      <div class="inclusion-mode-radio-additive">
        <input type='radio' :name="'inclusionMode'+id" :id="'Additive'+id" checked>
        <label :for="'Additive'+id" class="glyphicon glyphicon-plus">
              Additive
              <div class="check"></div>
        </label>
      </div>
      <div class="inclusion-mode-radio-subtractive">
        <input type='radio' :name="'inclusionMode'+id" :id="'Subtractive'+id">
        <label :for="'Subtractive'+id" class="glyphicon glyphicon-minus">
              Subtractive
              <div class="check"></div>
        </label>
      </div>
    </div>
  </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .modeViewOuterDiv{
    margin-bottom: 0px;
    label.title-label{
      font-weight: 700;
      font-size: 16px;
      margin-left: 26px;
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }
  .modeViewDiv {
    display: flex;
    flex-direction: row;
    padding-left: 40px;
    margin-bottom: 7px;
    margin-top: 16px;
    .inclusion-mode-radio.combo-container {
      display: inline-flex;
      top: -8px;
    }
    label {
      display: inline-flex!important;
      cursor: pointer;
      &.mode-label{
        width: 26%;
      }
      &.glyphicon-plus:before {
        font-size: 15px;
        margin-right: 10px;
        font-weight: bolder;
        content: "\002b";
        display: inline-flex;
      }
      &.glyphicon-minus:before {
        font-size: 15px;
        margin-right: 10px;
        font-weight: bolder;
        content: "\2212";
        display: inline-flex;
      }
    }
    .inclusion-mode-radio{
      width: 70%!important;
    }
    .inclusion-mode-radio-additive {
      display: inline-flex;
      width: 45%;
    }
    .inclusion-mode-radio-subtractive {
      display: inline-flex;
      width: 45%;
      .check{
        left: -130px;
      }
    }
    input[type=radio] {
      visibility: hidden;
      position: absolute;
    }
    .check {
      display: block;
      position: relative;
      border: 1px solid #2C68A4;
      border-radius: 100%;
      height: 18px;
      width: 18px;
      top: 2px;
      left: -107px;
      z-index: 5;
    }
    input::hover .check {
      border: 2px solid #2C68A4;
    }
    .check::before {
      display: block;
      position: absolute;
      content: '';
      border-radius: 100%;
      height: 10px;
      width: 10px;
      top: 2px;
      left: 2px;
      margin: auto;
    }
    input[type=radio]:checked+label>.check {
      border: 2px solid #205F9F;
    }
    input[type=radio]:checked+label>.check::before {
      background: #205F9F;
    }
    .inclusion-mode-radio-default {
      margin-right: 12px;
    }
    .inclusion-mode-radio-default input[type="radio"]:checked~label:before {
      color: #333;
      font-weight: bolder;
    }
  }

  #inertia-calculator.lowerResolution {
    .containerDiv {
    .modeViewOuterDiv{
      font-size: 14px;
      .modeViewDiv{
        padding-left: 21px;
      }
      label.title-label{
        font-size: 14px;
      }
      label.mode-label{
        width: 35%;
      }
     .inclusion-mode-radio{
        width: 60%;
        padding-left: 0px;
      }
      .inclusion-mode-radio-additive {
        width: 49%;
        .check {
          left: -95px;
        }
      }
      .inclusion-mode-radio-subtractive {
        width: 45%;
        .check {
          left: -114px;
         }
       }
     }
    }
  }
</style>
