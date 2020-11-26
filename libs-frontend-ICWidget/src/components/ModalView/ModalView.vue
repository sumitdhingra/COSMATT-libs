<script lang="ts">

declare var $: any;
import {ShapeType} from './../../Components/Constants/data';

export default {
  name:"ModalView",
  props:['modalMode',"shapeTypeToBeDeleted","shapeNumberToBeDeleted"],
  data () {
    return {
      imageMap : ["./src/Assets/img/inertia-calculator/solid_Cylinder_thumb.svg","./src/Assets/img/inertia-calculator/hollow_Cylinder_thumb.svg"],
      currentSelection: ShapeType.SolidCylinder,
    }
  },
  methods:{
      updateCurrentSelection: function(e){
        if(e.target.nodeName == "LABEL" || e.target.nodeName == "IMG" || e.target.nodeName == "DIV"){
          this.currentSelection = $(e.target).closest("li").attr("data-option");
        }
      }
  },
  created(){
    
  },
  mounted(){
    var self = this;

    var $imgDiv = $(this.$el).find("img.symbol-image");
    var $modalContainer = $(this.$el).find(".modal-container");

    switch(this.modalMode){
      case "add":
      for(var i=0;i<2;i++){
        $imgDiv.eq(i).attr("src", this.imageMap[i]);
      }
      $modalContainer.addClass("add-mode");
      break;
      case "remove":
       if(this.shapeTypeToBeDeleted == ShapeType.SolidCylinder){
        $imgDiv.attr("src", this.imageMap[0]);
       }
       else{
        $imgDiv.attr("src", this.imageMap[1]);
       }
       $modalContainer.addClass("remove-mode");
     
      break;
      default:
      break;
    }

  },
  watch:{
  },
   components:{
  }
}
</script>
<template>
  <!-- template for the modal component -->
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h3 v-if="modalMode=='add'">Add New Component</h3>
          <h3 v-if="modalMode=='remove'">Confirmation</h3>
          <img @click="$emit('close')" src="./../../../src/Assets/img/inertia-calculator/cross-button.png" class="cross-button"></img>
        </div>
        <div class="modal-body" v-if="modalMode=='add'">
          <p> Please select a desired component and then click <b>Add</b> button. </p>
          <ul @click=updateCurrentSelection>
            <li data-option="SolidCylinder">
              <input type="radio" name="selector" checked="checked" id="SolidCylinder">
              <label for="SolidCylinder">
                  <img class="symbol-image" src="" alt="">
                  Solid Cylinder
                  <div class="check"></div>
                </label>
            </li>
            <li data-option="HollowCylinder">
              <input type="radio" name="selector" id="HollowCylinder">
              <label for="HollowCylinder">
                  <img class="symbol-image" src="" alt="">
                  Hollow Cylinder
                  <div class="check"></div>
                </label>
            </li>
          </ul>
        </div>
        <div class="modal-body remove-modal-body" v-if="modalMode=='remove'">
          <img class="symbol-image" src="" alt="">
          <h5 class="shape-title">Shape {{shapeNumberToBeDeleted+1}}. {{shapeTypeToBeDeleted}}</h5>
          <p class="remove-text"> Are you sure you want to remove this shape? </p>
        </div>
        <div class="modal-footer" v-if="modalMode=='add'">
          <button class="modal-default-button cancel-btn" @click="$emit('close')">
              Cancel
            </button>
          <button class="modal-default-button ok-btn default-selection" @click="$emit('close'); $emit('optionSelected',currentSelection)">
              Add
            </button>
        </div>
        <div class="modal-footer" v-if="modalMode=='remove'">
          <button class="modal-default-button cancel-btn" @click="$emit('close')">
              No
            </button>
          <button class="modal-default-button ok-btn default-selection" @click="$emit('close'); $emit('onConfirmation',shapeNumberToBeDeleted)">
              Yes
            </button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    transition: opacity .3s ease;
    justify-content: center;
    align-items: center;
    .modal-wrapper {
      display: table-cell;
      vertical-align: middle;
    }
    .modal-container {
      width: 495px;
      height: 343px;
      margin: 0px auto;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 1px 3px 15px 0px rgba(0, 0, 0, .75);
      transition: all .3s ease;
      font-family: "Open sans", Arial, Tahoma;
      border-radius: 7px;

    }
    .modal-header {
      height: 48px;
      background-color: #dbdbdb;
      align-items: center;
      border-top-left-radius: 7px;
      border-top-right-radius: 7px;
      .cross-button{
        cursor: pointer;
      }
      h3 {
        color: #343434;
        font-size: 20px;
        margin: auto 0;
      }
    }
    .modal-body {
      font-size: 16px;
      color: #343434;
      font-family: "Open sans", Arial, Tahoma;
      padding-bottom: 0px !important;
      p {
        height: 42px;
        margin-top: 0px;
        margin-bottom: 0px;
        border-bottom: 1px solid #e2e2e2;
      }
    }
    .modal-default-button {
      float: right;
      border-radius: 4px;
      height: 35px;
      width: 72px;
      font-size: 14px;
      cursor: pointer;
      -webkit-appearance: button-bevel;
      &.cancel-btn {
        background-color: #FFFFFF;
      }
      &.ok-btn {
        background-color: #555555;
        color: #ffffff;
      }
    }
    .modal-enter {
      opacity: 0;
    }
    .modal-leave-active {
      opacity: 0;
    }
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
    .modal-footer {
      justify-content: center;
      height: 70px;
      background-color: #ebebeb;
      border-top: 1px solid #e2e2e2;
      top: -1px;
      position: relative;
      border-bottom-left-radius: 7px;
      border-bottom-right-radius: 7px;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    ul li {
      color: #343434;
      display: inline-block;
      position: relative;
      width: 449px;
      height: 85px;
      border-bottom: 1px solid #e2e2e2;
    }
    ul li input[type=radio] {
      visibility: hidden;
      position: absolute;
    }
    ul li label {
      display: inline-block;
      position: relative;
      font-weight: 600;
      font-size: 14px;
      left: 105px;
      color: #343434;
      cursor: pointer;
    }
    ul li .check {
      display: block;
      position: absolute;
      border: 1px solid #2C68A4;
      border-radius: 100%;
      height: 18px;
      width: 18px;
      top: 30px;
      left: -81px;
      z-index: 5;
    }
    ul li:hover .check {
      border: 2px solid #2C68A4;
    }
    ul li .check::before {
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
    .symbol-image {
      height: 83px;
      left: 100px;
      width: 50px;
    }
    .shape-title {
      font-size: 16px;
      color: #343434;
      font-weight: 600;
    }
    .remove-text {
      font-size: 20px;
      color: #343434;
    }
    .modal-container {
      &.remove-mode {
        height: 377px;
        .modal-body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-bottom: none;
          padding-top: 0px;
          padding-bottom: 0px;
          .shape-title {
            margin-bottom: 32px;
          }
          .symbol-image {
            width: 60px;
            height: 60px;
            margin-top: 52px;
            margin-bottom: 10px;
            text-align: center;
          }
          .remove-text {
            margin-bottom: 54px;
            border-bottom: none;
            text-align: center;
            width: 340px;
          }
        }
      }
    }
  }

</style>
