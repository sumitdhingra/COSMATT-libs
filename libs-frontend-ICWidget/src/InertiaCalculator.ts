import Vue from 'vue'
import ICContainer from './ICContainer/ICContainer';
declare var $: any;
// Vue.config.productionTip = false;

$.fn.InertiaCalculator = function (settingsData) {

  $(this).append("<div class='cosmatt-inertia-calculator'></div>");

  var className = ".cosmatt-inertia-calculator";

  var icContainer: Vue = new Vue({
    el: className,
    template: `<ICContainer/>`,
    components: {
      ICContainer
    },
    data: {
    },
    methods: {},
    created: function () {
      Vue.prototype.inputJson = settingsData;
    },
    mounted: function () {
      if (settingsData.inertiaChangedCallback) {
        this.$children[0].$on('totalInertiaValueChanged', settingsData.inertiaChangedCallback);
      }
    }
  });

  function initialize(settingsData) {
    // reinitializing
  }

  var getSerializedData = function () {
    console.log("getting serialized data");
    if (icContainer) {
      var vueIcContainer: any = icContainer.$children[0];
      return vueIcContainer.getSerializedData();
    }
    return [];
  }

  var getInertiaValue = function () {
    console.log("getting inertia data");
    if (icContainer) {
      var totalInertiaLabel = 'Moment of Inertia';
      var vueIcContainer: any = icContainer.$children[0];

      for (var i = 0; i < vueIcContainer.$children.length; ++i) {
        var vueChild = vueIcContainer.$children[i];
        if (vueChild.label === totalInertiaLabel) {
          return vueChild.getSerializedData();
        }
      }
    }
    return null;
  }

  // initialize();

  return {
    initialize: initialize,
    getSerializedData: getSerializedData,
    getInertiaValue: getInertiaValue
  }
}


