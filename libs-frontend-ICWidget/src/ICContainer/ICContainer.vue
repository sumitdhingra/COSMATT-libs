<script lang="ts">

import SolidCylinderShape from './../Components/Shapes/SolidCylinderShape/SolidCylinderShape.vue';
import HollowCylinderShape from './../Components/Shapes/HollowCylinderShape/HollowCylinderShape.vue';  
import TotalInertiaView from './../TotalinertiaContainer/TotalinertiaView.vue';  
import {ICViewSettings} from './ICViewSettings';
import {InclusionMode,ShapeType} from './../Components/Constants/data';
import OutputView from './../Components/OutputView/OutputView';
import ModeView from './../Components/ModeView/ModeView';
import { SimpleShape } from '../components/BaseClasses/SimpleShape';
import ModalView from './../Components/ModalView/ModalView.vue';  
// import './../../node_modules/bootstrap/dist/js/bootstrap.js';
declare var $: any
declare var MathJax: any; 
export default {
  name:'ICContainer',
  data () {
    return {
      viewSettings:{},
      shapes:[],
      selectedShape:0,
      component:"SolidCylinder",
      selectedShapeJson:{},
      totalInertiaFormulaString:"I_{total} =",
      totalInertiaValue:[],
      toatlInertiaUnit:"kilogrammetersquare",
      totalInertia:0,
      shapeInclusionMode:[],
      shapeModel:[],
      shapeName:[],
      showModal: false,
      modalMode:"add",
      shapeTypeToBeDeleted:"",
      shapeNumberToBeDeleted:"",
      updateTotalInertiaView: false,
      imageMap : {"SolidCylinder":"./src/Assets/img/inertia-calculator/solid_Cylinder_thumb.svg","HollowCylinder":"./src/Assets/img/inertia-calculator/hollow_Cylinder_thumb.svg"}
    }
  },
  methods:{
   initializeICViewSettings: function(viewsettings){
        this.viewSettings = new ICViewSettings(viewsettings);
    },
    getSerializedData(){
      //returns ICJson
      var shapesData = [];
      for ( var shapeKey in this.$refs ) {
        if ( this.$refs[shapeKey][0] ) {
          shapesData.push(this.$refs[shapeKey][0].getSerializedData());
        }
      }
      return shapesData;
    },

    inertiaValueChanged: function(value, index){

      this.$set(this.totalInertiaValue,index,value);
      this.updateTotalInertiaValue();
      this.updateComplexShapeMode();
    },

    onTotalInertiaValueChanged: function(value) {
      this.$emit('totalInertiaValueChanged', value);
    },

    shapeModelUpdated: function(value, index){
        this.$set(this.shapeModel,index, value);
        //this.shapeModel[index] = value;
        this.$set(this.shapeName,index, this.shapeModel[index].Name);
        //this.shapeName[index] =  this.shapeModel[index].Name;
        this.$set(this.shapeInclusionMode,index,this.shapeModel[index].InclusionMode);
        //this.shapeInclusionMode[index] =  this.shapeModel[index].InclusionMode
        this.updateTotalInertiaFormulaString();

       // this.updateComplexShapeMode();
        this.updateListSelection();
    },

    updateListSelection: function(){
      
        if(this.$el && this.modalMode=="add"){
        var $divToBeSelected = $(this.$el).find(".tab-control-parent .overflow-list-items li.tabControl").last();
        $divToBeSelected.trigger("click");
        this.toggleActiveClass($divToBeSelected);
        $(this.$el).find("#totalInertia").removeClass("active"); 
        $(this.$el).find(".shape-div").removeClass("active");
        this.selectedShape = this.shapes.length-1;
        }
        else if(this.$el && this.modalMode=="remove"){
          var $tabContent = $(this.$el).find(".tab-content-parent");
          if($tabContent.find("#totalInertia").hasClass("active")){
            return;
          }
          else{
            var $divToBeSelected = $(this.$el).find(".tab-control-parent .overflow-list-items li.tabControl").first();
            $divToBeSelected.trigger("click");
            this.toggleActiveClass($divToBeSelected);
            $tabContent.find("#totalInertia").removeClass("active"); 
            $tabContent.find(".shape-div").removeClass("active");
            this.selectedShape = 0;
            $tabContent.find(".shape-div").eq(0).addClass("active");
          }
          
        }
    },

    toggleActiveClass: function($selectedListItem){
        $selectedListItem.closest("ul").find("li a.tabDiv").removeClass("active");
        $selectedListItem.closest("ul").find("li").removeClass("activeListItem");
        $selectedListItem.addClass("activeListItem");
    },

    updateSelectedInclusionMode: function(value,index){
      this.shapeModel[index].InclusionMode = value;
      this.$set(this.shapeInclusionMode,index,value);
      this.updateTotalInertiaValue();
    },

    updateTotalInertiaFormulaString: function(){
      this.totalInertiaFormulaString = "I_{total} =";

        this.totalInertiaFormulaString += "\\sum_{i=1}^{"+this.shapeModel.length+"} I_{i}";
        return;

      // for(var i=0; i<this.shapeModel.length;i++){
      //   this.totalInertiaFormulaString += "I_{shape "+(i+1)+"}";
      //   if(i<this.shapeModel.length-1){
      //      var mode = (this.shapeModel[i+1].InclusionMode ==  InclusionMode.Additive) ? "+": "-";
      //      this.totalInertiaFormulaString += mode;
      //   }
      // }

    },

    updateTotalInertiaValue: function(){
      this.totalInertia = 0;
      for(var i=0; i<this.shapeModel.length;i++){
        if (this.shapeModel[i].InclusionMode ==  InclusionMode.Additive) {
         this.totalInertia += this.shapeModel[i].TotalInertia;
        }
        else{
          this.totalInertia-= this.shapeModel[i].TotalInertia;
        }
      }
    },

    updateComplexShapeMode: function(){
        //if(this.shapes.length>1){
        $(this.$el).find(".containerDiv").addClass("complex-shape");
          for(var i=0; i<this.shapes.length;i++){
            $(this.$el).find("img.symbol-image").eq(i).attr("src", this.imageMap[this.shapeModel[i].Type]);
        }
     // }
    },
    bindListSelectionEvents: function(){
      var ele = $(this.$el);
      var self = this;

      // $(ele).find(".tab-control-parent .tabDiv").on("focusin",function(e){
      //     e.stopPropagation(); //to stop bootstrap functionality on focusin
      // });

      $(ele).find(".tab-control-parent>ul").on("click",".tabControl:not('.add-shape-tab-control')",function(event){

        event.preventDefault(); //to prevent redirection of url
        
        if($(event.target).hasClass("btn")){
          return true;
        }
        self.toggleActiveClass($(this));

        if( $(event.currentTarget).hasClass("total-inertia-list-item") ){

         self.updateTotalInertiaView = true;
        }
        else{
          self.updateTotalInertiaView = false;
        }
      });

       $(ele).find(".tab-control-parent>ul .overflow-list-items").on("click",".delete-icon",function(e){
        e.preventDefault(); //to prevent redirection of url
        e.stopPropagation();
        var $divToRemove = $(this).closest("li");
        self.shapeTypeToBeDeleted =  $divToRemove.attr("data-name");
        self.shapeNumberToBeDeleted =  parseInt($divToRemove.attr("data-item-number"));
      });

       $(ele).find(".tab-control-parent>ul .total-inertia-list-item").on("click",".dropdown-menu",function(e){
        e.preventDefault(); //to prevent redirection of url
        e.stopPropagation();
      });

       $(ele).find(".nav-tabs").on("mouseover", ".delete-icon", function(e){
          // var offsetTop = $(this).offset().top;
          // $(this).find(".tooltiptext").css({"top":offsetTop-40});
       });

    },
    
    deleteShape: function(shapeNumber){
        var $divToRemove = $(this.$el).find(".tab-control-parent  ul").find("li[data-item-number='" + shapeNumber + "']");

        if(this.shapes.length <= 1){
          return true;
        }

        this.shapes.splice(shapeNumber,1);
        this.shapeModel.splice(shapeNumber,1);
        this.shapeName.splice(shapeNumber,1);
        this.shapeInclusionMode.splice(shapeNumber,1);
        this.updateTotalInertiaFormulaString();
        this.updateListSelection();
      
    },
    shapeToBeAdded: function(shape){
        var self  = this;
          switch(shape){
            case ShapeType.SolidCylinder:
                  this.shapes.push({
                    ShapeInfo: {
                      Type: "SolidCylinder",
                      Name: "Solid Cylinder",
                      Radius: 0,
                      Mass: 0,
                      Material: "Steel (AISI 1020)",
                      Height: 0,
                      AxisofRotation:"X",
                      MassOrDensity:"Density",
                      FormulaString:"I = \\frac{1}{2}{M \\left(\\frac{D}{2} \\right)^2}"
                    },
                InclusionMode:"+"
                });
                break;

            case ShapeType.HollowCylinder:
                  this.shapes.push({
                      ShapeInfo: {
                        Type: "HollowCylinder",
                        Name: "Hollow Cylinder",
                        InnerRadius: 0,
                        OuterRadius: 0,
                        Mass: 0,
                        Material: "Steel (AISI 1020)",
                        Height: 0,
                        AxisofRotation:"X",
                        MassOrDensity:"Density",
                        FormulaString:"I = \\frac{1}{2}{M \\left(\\left(\\frac{D_{1}}{2} \\right)^2 + \\left(\\frac{D_{2}}{2} \\right)^2\\right)}"
                      },
                  InclusionMode:"+"
                  });
                break;
            
            default:
            break;
          } 
      
    },
    updateMathJax: function(){
      // MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.mdElement], () => {
      //   const codeElements = this.mdElement.querySelectorAll('.code-math');
      //   for (const element of codeElements) {
      //     element.classList.remove('math-loader');
      //     const mathSvgEle = element.querySelector('.MathJax_SVG');
      //     if (mathSvgEle) {
      //       const width = mathSvgEle.querySelector('svg').getAttribute('width');
      //       mathSvgEle.style.width = width;
      //     }
      //   }
      // });
    }
  },
  components:{
    SolidCylinder: SolidCylinderShape,
    HollowCylinder: HollowCylinderShape,
    totalInertiaView: TotalInertiaView,
    outputView:OutputView,
    modeView: ModeView,
    modalView: ModalView
  },
  created(){
      this.initializeICViewSettings(this.inputJson.ViewSettings);
      this.selectedShape = this.inputJson.SelectedShape;
      this.shapes = this.inputJson.Shapes;
      this.selectedShapeJson =  this.shapes[this.selectedShape].ShapeInfo;    
    },
    mounted(){
      
      this.updateTotalInertiaFormulaString();
      
      var self = this;

      var ele = $(this.$el);

      if($(ele).find(".tab-control-parent").length== 0){
          $(ele).parent("#inertia-calculator-container").css("width","auto");
      }

      $(ele).find(".tab-control-parent>ul li").eq(0).addClass("activeListItem");

      this.bindListSelectionEvents();
      this.updateComplexShapeMode();
    
      var $inputControls = $(ele).find(".tableView");
      if($(ele).find(".solidCyinderInputs").is(":visible")){
        $inputControls = $(ele).find(".solidCyinderInputs");
      }
      else if($(ele).find(".hollowCyinderInputs").is(":visible")){
        $inputControls = $(ele).find(".hollowCyinderInputs");
      }
      else if($(ele).find(".tableView").is(":visible")){
        $inputControls = $(ele).find(".tableView");
      }
      
      $(ele).find(".tab-content-parent").resize(".solidCyinderInputs, .hollowCyinderInputs, .tableView", function (e) {

          var $inputControls = $(ele).find(".tableView");
          
          if($(ele).find(".solidCyinderInputs").is(":visible")){
            $inputControls = $(ele).find(".shape-div.active .solidCyinderInputs");
          }
          else if($(ele).find(".hollowCyinderInputs").is(":visible")){
            $inputControls = $(ele).find(".shape-div.active .hollowCyinderInputs");
          }
          else if($(ele).find(".tableView").is(":visible")){
            $inputControls = $(ele).find(".tableView");
          }

          $(ele).removeClass("lowerResolution").addClass("mediumResolution");

           if($inputControls.width()<=452.922){  //1295 for lower resolution  width
              $(ele).removeClass("mediumResolution").addClass("lowerResolution");
           }

           if($inputControls.hasClass("tableView")){
              if($inputControls.width()<=886.563){ //1295 resolution  width
               $(ele).removeClass("mediumResolution").addClass("lowerResolution");
    
           }

            var topOffset = $inputControls.height();
             $(ele).find(".totalInertiaView  #form-outputSection").css({"top":topOffset+20});
           }
      });
    
        this.updateMathJax();

        $inputControls.trigger('resize');
    },

}
</script>
<template>
  <div class="unselectable" id="inertia-calculator" unselectable="on">
    <h3 class="ICHeading">Inertia Calculator</h3>
    <div class="containerDiv">
      <!--<div class="selectorView col-xs-2"></div>-->
      <div class="tab-control-parent tabs-left">
        <ul class="nav nav-tabs">
          <div class="overflow-list-items">
            <li v-for="(shape,index) in shapes" class="tabControl list-items" :data-item-number="index" :data-name="shape.ShapeInfo.Name">
              <a :href="'#shape'+index" data-toggle="tab" class="tabDiv" :class="{active:(selectedShape==index ? true: false)}">
                <img class="symbol-image" src="" alt="">
                <h5 class="shape-title">{{index+1}}. {{shape.ShapeInfo.Name}}</h5>
                <div @click="showModal=true; modalMode='remove'"  class="delete-icon">
                  <!--<span class="tooltiptext">Remove Component</span>-->
                </div>
              </a>
            </li>
            <li class="add-shape-tab-control">
              <a id="show-modal" @click="showModal=true; modalMode='add'" class="tabDiv addShapeDiv glyphicon glyphicon-plus"> ADD 
              <span class="tooltiptext">Add a New Component</span>
            </a>
            </li>
          </div>
          <li class="tabControl  total-inertia-list-item">
            <a href="#totalInertia" data-toggle="tab" class="tabDiv totalInertia">
              <form class="form-horizontal " id="form-outputSection">
                <outputView :label="'Total Inertia of Complex Shape:'" :outputInertia="totalInertia" id="totalInertiaListView" :outputInertiaUnit="toatlInertiaUnit"></outputView>
              </form>
              <a class="view-details" >View Details ></a>
            </a>
          </li>
        </ul>
      </div>
      <div class=" tab-content-parent">
        <div class="tab-content">
          <!--<div class="tab-pane active" id="home">Home Tab.</div>-->
          <!--<li v-for="(shape,index) in shapes" :class="{active:(selectedShape==index ? true: false)}" class="tab-pane"><a href="#home" data-toggle="tab" :class="{active:(selectedShape==index ? true: false)}">Shape {{index + 1}}</a></li>-->
          <template v-for="(component1, index) in shapes">
            <div v-bind:id="'shape'+index" :class="{active:(selectedShape==index ? true: false)}" class="shape-div">
              <h2 class="shape-title">Component {{index+1}}: </h2>
              <h2 class="selected-shape-title">{{component1.ShapeInfo.Name}}</h2>
              <keep-alive>
                <component :is="component1.ShapeInfo.Type" :shapeJson="component1.ShapeInfo" :id="index" class="tab-pane" v-on:totalInertiaValueChanged="inertiaValueChanged($event,index)"
                  v-on:shapeModelUpdated="shapeModelUpdated($event,index)" v-on:updateSelectedInclusionMode="updateSelectedInclusionMode($event,index)"></component>
              </keep-alive>
            </div>
          </template>
          <div id="totalInertia">
            <h2 class="totalInertiaTitle"> Total Inertia of Complex Shape </h2>
            <totalInertiaView class="tab-pane" :shapes="shapes" :shapeName="shapeName" :totalInertiaFormulaString="totalInertiaFormulaString"
              :totalInertiaValue="totalInertiaValue" :totalInertia="totalInertia" :shapeInclusionMode="shapeInclusionMode"
              v-on:totalInertiaValueChanged="onTotalInertiaValueChanged($event)" :updateTotalInertiaView="updateTotalInertiaView"></totalInertiaView>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <modalView v-if="showModal" @close="showModal = false" :modalMode="modalMode" v-on:optionSelected="shapeToBeAdded" @onConfirmation="deleteShape"
      :shapeTypeToBeDeleted="shapeTypeToBeDeleted" :shapeNumberToBeDeleted="shapeNumberToBeDeleted">
    </modalView>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #inertia-calculator .cosmatt-unitComboBox .boxSelectedVal {
    background-color: #fff;
    border: 1px solid #ddd;
  }
  
  #inertia-calculator .containerDiv.complex-shape .tab-content-parent {
    width: 61%;
    left: 2.5%;
  }
  
  #inertia-calculator {
    position: relative;
    padding-top: 12px;
    padding-left: 36px;
    padding-bottom: 26px;
    padding-right: 26px;
    font-family: "Open sans", Arial, Tahoma;
    width: 100%;
    /*min-width: 1024px;*/
    &.unselectable {
      -moz-user-select: -moz-none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      -o-user-select: none;
      user-select: none;
    }
    .ICHeading {
      font-family: "Open sans";
      font-size: 24px;
      font-weight: 700;
      color: #0793d0;
    }
    .containerDiv {
      border: 1px solid #DDDDDD;
      width: 1150px;
      height: 752px;
      .tooltiptext {
        visibility: hidden;
        width: 163px;
        content: "";
        text-align: center;
        font-size: 14px;
        color: #343434;
        background: #fffde7;
        border-radius: 2px;
        padding: 3px;
        position: absolute;
        z-index: 99999;
        bottom: 120%;
        left: 50%;
        margin-left: -80px;
        border: 3px soild #C2C2C2;
      }
      .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        color: #c2c2c2;
        margin-left: -5px;
        border-width: 7px;
        border-style: solid;
        border-color: #fffde7 transparent transparent transparent;
      }
      &.complex-shape {
        height: 752px;
        width: 100%!important;
      }
      .tab-control-parent {
        height: 752px;
        width: 24%;
        background-color: #ffffff;
        .nav.nav-tabs {
          outline: 1px solid #DDDDDD;
        }
        .tabControl {
          display: flex;
          &:hover .delete-icon {
            visibility: visible;
          }
        }
        img.symbol-image {
          display: inline-block;
          height: 50px;
          width: 40px;
          margin-left: 17px;
          margin-top: 4px;
          width: 15%;
        }
        h5 {
          text-align: center;
          display: inline-block;
          width: 60%;
        }
        .delete-icon {
          visibility: hidden;
          background-image: url('./../../src/Assets/img/inertia-calculator/delete-icon.png');
          background-repeat: no-repeat;
         &:hover .tooltiptext {
            visibility: visible;
            left: 18.2%;
            /*top:15%;*/
            position: absolute;
            bottom: unset;
            margin-left: 0px;
            white-space: nowrap;
            padding-top: 1px;
          }
        }
        .shape-title {
          font-family: "Open sans", Arial, Tahoma;
          font-size: 18px;
          font-weight: 600;
          color: #444444;
          white-space: nowrap;
        }
      }
      .tab-content-parent {
        padding-left: 0px;
        padding-right: 0px;
        margin-top: 20px;
        height: 752px;
        width: 1150px;
        display: inline-block;
        position: absolute;
        .tab-content>div:not(.active) {
          display: none;
        }
        .shape-title {
          font-family: "Open sans", Arial, Tahoma;
          font-size: 24px;
          font-weight: 700;
          color: #343434;
          margin-top: 14px;
          margin-bottom: 14px;
          padding-top: 2px;
          padding-bottom: 2px;
          margin-left: 25px;
          padding-right: 22px;
          display: inline-block;
          border-right: 1px solid #afafaf;
          /*margin-left: 25px;
          display: inline-block;*/
          /*outline: 1px solid #ddd;
          padding-left: 20px;
          padding-right: 20px;
          box-shadow: inset 1px 1px 1px #aaa;
          -webkit-appearance: textfield;
          height: 36px;
          padding-top: 7px;*/
        }
        .selected-shape-title {
          font-family: "Open sans", Arial, Tahoma;
          font-size: 24px;
          color: #343434;
          margin-top: 14px;
          margin-bottom: 14px;
          padding-top: 2px;
          padding-bottom: 2px;
          margin-left: 22px;
          display: inline-block;
          /*border-left: 1px solid #afafaf;
          padding-left: 22px;*/
        }
        .totalInertiaTitle {
          font-family: "Open sans", Arial, Tahoma;
          font-size: 24px;
          font-weight: 700;
          color: #343434;
          margin-top: 14px;
          margin-bottom: 14px;
          padding-top: 2px;
          padding-bottom: 2px;
          margin-left: 25px;
          padding-right: 22px;
          display: inline-block;
        }
      }
    }
  }
  
  #inertia-calculator .tabDiv {
    border: none;
    margin: 0px;
    padding: 0px;
    color: unset;
    &:hover {
      background-color: unset;
      text-decoration: none;
    }
    &.totalInertia {
      height: 100%;
      width: 100%;
    }
  }
  
  #inertia-calculator .tabControl,
  #inertia-calculator .add-shape-tab-control {
    font-weight: 600;
    background-color: #fff;
    width: 100%;
    height: 72px;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    .addShapeDiv {
      font-size: 18px;
      justify-content: center;
      align-items: center;
      display: flex;
      color: #0277bd;
      text-align: center;
      font-weight: 600;
      position: relative;
      top: 50%;
      transform: translate(0, -50%);
      font-family: "Open sans", Arial, Tahoma;
      cursor: pointer;
      &:hover .tooltiptext {
        visibility: visible;
      }
      &.glyphicon-plus:before {
        font-size: 30px;
        margin-right: 10px;
        font-weight: bolder;
      }
      &.tabDiv:hover {
        background-color: unset;
        text-decoration: none;
      }
    }
  }
  
  #inertia-calculator a:focus {
    text-decoration: none;
  }
  
  #inertia-calculator.lowerResolution .tabControl,
  #inertia-calculator.lowerResolution .add-shape-tab-control {
    height: 100px;
  }
  
  #inertia-calculator .total-inertia-list-item {
    height: 190px;
    border-bottom: 0px;
    cursor: pointer;
    .view-details{
      font-size: 20px;
      top: 135px;
      position: relative;
      font-weight: 500;
      color: #0277bd;
      text-align: center;
      width: 90%;
      height: 30px;
      &:hover{
        text-decoration: underline;
      }
    }
  }
  
  #inertia-calculator.lowerResolution .total-inertia-list-item {
    height: 195px;
    .view-details{
      font-size: 14px;
      top: 8px;
      display: inline-block;
      position: relative;
      font-weight: 700;
      width: 100%;
    }
  }
  
  #inertia-calculator .tabControl.activeListItem {
    background-color: #E2F5FD;
  }
  
  #inertia-calculator .tabControl a {
    border: none!important;
  }
  
  #inertia-calculator .tabControl.active {
    background-color: #E2F5FD;
  }
  
  #inertia-calculator .tabControl.active a:focus {
    background-color: #E2F5FD;
    border: none;
  }
  
  #inertia-calculator .tabControl.active:focus {
    background-color: #E2F5FD;
  }
  
  #inertia-calculator .tabControl:hover,
  #inertia-calculator .add-shape-tab-control:hover {
    background-color: #F3F3F3;
  }
  
  #inertia-calculator .nav-tabs {
    display: block;
    border-bottom: 0px;
    background-color: #f6f6f6;
  }
  
  #inertia-calculator .overflow-list-items {
    height: 428px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #ffffff;
    border-bottom: 1px solid #ddd;
  }
  
   ::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
  
   ::-webkit-scrollbar {
    width: 6px;
    background-color: #979797;
  }
  
   ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }
  
  #inertia-calculator #form-outputSection {
    position: absolute;
    display: inline-block;
    padding-left: 0px;
    margin-left: 0px;
    margin-right: 0px;
  }
  
  #inertia-calculator .containerDiv.complex-shape {
    .tab-content-parent {
      top: 38px;
    }
  }
  
  #inertia-calculator.lowerResolution {
    .ICHeading {
      font-size: 18px;
    }
    .containerDiv {
      width: 761px;
      height: 620px;
        .tooltiptext {
          width: 150px;
          font-size: 12px;
          left: 54%;
        }
      &.complex-shape {
        /*min-width: 919px;*/
        height: 620px;
      }
      .tab-control-parent {
        height: 618px;
        width: 16.6%;
        .symbol-image {
          width: 40px;
          height: 40px;
          margin-top: -9px;
          margin-bottom: 14px;
          order: 2;
        }
        h5 {
          display: inline-block;
          width: auto;
          font-size: 14px;
          order: 3;
        }
        .delete-icon {
          width: 24px;
          height: 24px;
          order: 1;
          align-self: flex-end;
          padding-top: 5px;
          padding-right: 5px;
           &:hover .tooltiptext {
            left: 10.2%;
            font-size: 12px;
            width: 130px;
           }
        }
      }
      .tab-content-parent {
        height: 620px;
        margin-top: 0px;
        width: 77%;
        left: 20%;
        .shape-title {
          font-size: 16px;
          margin-left: 15px;
        }
        .selected-shape-title {
          font-size: 16px;
        }
        .totalInertiaTitle {
          font-size: 16px;
          margin-left: 15px;
        }
      }
    }
    .overflow-list-items {
      max-height: 479px;
      height: 423px;
      li.tabControl {
        height: 100px;
        a {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img.symbol-image {
            width: 50px;
          }
        }
      }
    }
  }
  
  #inertia-calculator.lowerResolution .containerDiv.complex-shape {
    #form-outputSection {
      width: 100%;
      position: relative;
      height: 140px;
    }
  }
  
  #inertia-calculator.mediumResolution {
    .ICHeading {
      font-size: 21px;
    }
    .containerDiv {
      width: 963px;
      height: 620px;
      &.complex-shape {
        width: 1300px;
        height: 620px;
      }
      .tab-control-parent {
        height: 620px;
        .tabControl .tabDiv {
          display: flex;
        }
        img.symbol-image {
          left: 14px;
          position: relative;
        }
        .shape-title {
          font-size: 16px;
          align-self: center;
        }
        .delete-icon {
          height: 20px;
          width: 20px;
          align-self: center;
          margin-left: 10%;
        }
      }
      .tab-content-parent {
        height: 620px;
        margin-top: 10px;
        width: 74%;
        top: 38px;
        left: 25.3%;
        .shape-title {
          font-size: 20px;
        }
        .selected-shape-title {
          font-size: 20px;
        }
        .totalInertiaTitle {
          font-size: 20px;
        }
      }
    }
  }
  
  #inertia-calculator .tabControl .tabDiv {
    width: 100%;
    height: 100%;
  }
  
  .glyphicon-plus:before {
    content: "\002b";
  }

</style>
