<script lang="ts">

import UnitLabelControl from './../UnitLabelControl/UnitLabelControl';

declare var $: any;

export default{
  props:['shapeName','totalInertiaValue','shapeInclusionMode'],
  data () {
    return {
      inertiaUnit:"kg-m&sup2",
    }
  },
  methods:{

  },
  components:{
    unitLabelControl: UnitLabelControl
  },

}
</script>
<template>
  <div>
    <div class="clearfix">
      <div class="column">
        <table class="table table-bordered table-hover " id="tab_logic">
          <thead>
            <tr>
              <th class="text-center serial-no">
                #
              </th>
              <th class="text-center shape-name">
                Shape Name
              </th>
              <th class="text-center inertia-value">
                Moment of Inertia
              </th>
              <th class="text-center inclusion-mode">
                View
              </th>
            </tr>
          </thead>
          <tbody>
            <tr id='addr0' v-for="(item,index) in shapeName">
              <td class="serial-no">
                {{index + 1}}
              </td>
              <td class="shape-name">
                {{shapeName[index]}}
              </td>
              <td class="inertia-value">
                <unitLabelControl :totalInertiaValue="totalInertiaValue[index]" :id="'unitlabelControl'+ index"></unitLabelControl>
              </td>
              <td class="inclusion-mode">
                {{shapeInclusionMode[index]}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #inertia-calculator table {
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
    thead {
      display: block;
      width: 100%;
      background-color: #f3f3f3;
      tr {
        color: #343434;
        font-family: "Open sans", Arial, Tahoma;
        font-size: 16px;
        width: calc(100% - 6px);
        display: flex;
        flex-direction: row;
        th {
          &.serial-no {
            width: 4%;
          }
          &.shape-name {
            width: 32%;
          }
          &.inertia-value {
            width: 48%;
          }
          &.inclusion-mode {
            width: 16%;
            border-right: none;
          }
        }
      }
    }
    tbody {
      display: block;
      max-height: 250px;
      height: auto;
      overflow-y: scroll;
      tr {
        display: flex;
        flex-direction: row;
        &:hover {
          background-color: #F3F3F3;
        }
      }
      td {
        text-align: center;
        color: #343434;
        font-size: 16px;
        font-family: "Open sans", Arial, Tahoma;
        &.serial-no {
          width: 4%;
        }
        &.shape-name {
          width: 32%;
        }
        &.inertia-value {
          width: 48%;
        }
        &.inclusion-mode {
          width: 16%;
        }
      }
    }
  }
  
  #inertia-calculator.lowerResolution table {
    thead {
      tr {
        font-size: 14px;
        font-weight: 600;
        th {
          /*white-space: normal;*/
        }
      }
    }
    tbody {
      max-height: 282px;
      height: auto;
      td {
        font-size: 14px;
        /*white-space: normal;*/
      }
    }
  }

</style>
