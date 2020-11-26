# libs-frontend-cosmattPlugin
libs-frontend-cosmattPlugin is wrapper that can be used to initialize various cosmatt widgets.
## Usage
### JS Dependencies: 

Following are the common JS dependencies:
- JQuery
- bootstrap

Following are the JS dependencies of libs-frontend-CosmattPlugin plugin:
- libs-frontend-CosmattPlugin.js

Following are the JS dependencies of libs-frontend-unitComboBox plugin:
- unitComboBox.min.js
- unitConverter.js

Following are the JS dependencies of libs-frontend-motionprofile plugin:
- flot
- flot.resize
- flot-axislabels
- flot-tooltip
- motionProfile.min.js
```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="src/js/libs-frontend-CosmattPlugin.js"></script>
<script type="text/javascript" src="../libs-frontend-unitcombobox/dist/js/unitComboBox.min.js"></script>
<script type="text/javascript" src="../libs-frontend-unitcombobox/src/js/unitConverter.js"></script>
<script src="bower_components/flot/jquery.flot.js"></script>
<script src="bower_components/flot/jquery.flot.resize.js"></script>
<script src="bower_components/flot-axislabels/jquery.flot.axislabels.js"></script>
<script src="bower_components/flot.tooltip/js/jquery.flot.tooltip.min.js"></script>
<script src="../libs-frontend-motionprofile/dist/js/motionProfile.min.js"></script>
```
**Note**: It's recommended to include the javascript at the bottom of the page before the closing.

### CSS Dependencies:
Following are the common CSS dependencies:
- bootstrap.css

Following are the CSS dependencies of libs-frontend-CosmattPlugin plugin:
- libs-frontend-CosmattPlugin.css

Following are the CSS dependencies of libs-frontend-unitComboBox plugin:
- unitComboBox.min.css

Following are the CSS dependencies of libs-frontend-motionprofile plugin:
- motionProfile.min.css
```html
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
<link rel="stylesheet" href="src/css/libs-frontend-CosmattPlugin.css">
<link rel="stylesheet" type="text/css" href="../libs-frontend-unitcombobox/dist/css/unitComboBox.min.css">
<link rel="stylesheet" href="../libs-frontend-motionprofile/dist/css/motionProfile.min.css">
```

## HTML schema
- Requires an HTML element.

    ```html
     <div id="cosmatt-plugin"></div>
    ```

- Enable the plugin by calling **_CosmattPlugin_** function on JQuery object as shown below:

     ```javascript
    $("#cosmatt-plugin").CosmattPlugin({
      "type": "motion-profile",
      "options": {
        "data": {
          moveDistance: 29,
          ...
        }
      }
    });
    ```

## Config
### Options
libs-frontend-CosmattPlugin provides following options to configure. These options can be passed when the plugin is invoked.

Option Name | Type | Default | Valid Values | Description
--- | --- | --- | --- |--- |
type | String | motion-profile | motion-profile | Set the widget name which needs to be initialized
options.data | JSON Object | {} | JSON | Child widget's input config data.


### Example
 ```javascript
    $("#cosmatt-plugin").CosmattPlugin({
      "type": "motion-profile",
      "options": {
        "data": {
          moveDistance: 29
        }
      }
    });
 ```

 