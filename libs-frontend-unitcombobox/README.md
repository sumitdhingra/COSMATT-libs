# libs-frontend-unitcombobox
libs-frontend-unitcombobox plugin can be used to change an amount in one unit to its equivalent amount in another unit. 
## Usage
### JS Dependencies: 
above unitConverter.js file initialize the global variable dataJsonPath to set up unitData.json path 
```html
 <script>var dataJsonPath = 'src/data/unitData.json'; </script>
```

Following are the JS dependencies of libs-frontend-motionprofile plugin:
```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="src/js/unitConverter.js"></script>
<script src="src/js/unitComboBox.js"></script>
```
**Note**: It's recommended to include the javascript at the bottom of the page before the closing.

### CSS Dependencies:
Following are the CSS dependencies of libs-frontend-motionprofile plugin:
- unitComboBox.css
```html
<link rel="stylesheet" href="src/css/unitComboBox.css">
```

## HTML schema
- Requires an HTML element.

    ```html
     <div class="unitDropDownTime"></div>
    ```

- Enable the plugin by calling **_unitsComboBox_** function on JQuery object as shown below:

     ```javascript
    $(".unitDropDownTime").unitsComboBox({
    "unitType" : "TIME",
      "unit" : "min",
      "value" : "10"
    });
    ```

## Config
### Options
libs-frontend-unitcombobox provides following options to configure motion parameters. These options can be passed when the plugin is invoked.

Option Name | Type | Default (SI Units) | Valid Values | Description
--- | --- | --- | --- |--- |
unitType | String |  | Time, ACCELERATION, Velocity..|Set the unit type when launched
unit | String |  | For unit ype time : sec, min. msec.. |Set the default selected unit when launched
value | float | 10 | Any positive Number | Amount to be converted from one unit to another unit
comboBoxWidthRatio | string | 60% : 40% | Any Positive Number Ratio | Set the width ratio of textbox and dropdown
show | string |true | true, false | show or hide the combo box control when launched
enable | string |{"textbox": "true","comboBox": "true”}  | true, false | enabled or disabled text box or combo box  when launched

### Example
 ```javascript
    $(".unitDropDownTime").unitsComboBox({      
      "unitType" : "TIME",
      "unit" : "min",
      "value" : "10",
      "comboBoxWidthRatio" : {"textBox" : "60%","comboBox" : "40%"},     
       callBackFn : function(){
        console.log("Textbox Value :",this.value);
        console.log("Selected Unit :",this.unit);
      }
    });
 ```
 
### Callbacks
Callback functions will be called on specific actions that are mentioned below.
Action | Description
--- | --- |
callBackFn | Triggered when text box value will be changed

### Example
 ```javascript
    $(".unitDropDownTime").unitsComboBox({
       callBackFn : function(){
        console.log("Textbox Value :",this.value);
        console.log("Selected Unit :",this.unit);
      }
    });
 ```
 ### Methods
 Action | Description
--- | --- |
getSIValue | Get the SI value of current selected unit type
setTextBoxValue | Set the text box value
update | Update the plugin options 
### Example
 ```javascript
 var SIValue = $(".unitDropDownTime").data('unitsComboBox').getSIValue();
   console.log("SI Value :",SIValue);
   
   $(".unitDropDownTime").data('unitsComboBox').setTextBoxValue("25");
   
    $(".unitDropDownTime").data('unitsComboBox').update({
     "show" : "true",
     "enable": {"textbox" : "false","comboBox" : "true" }
   });
 ```
  ### Unit type 
 1. LINEARDISTANCE
2.  ANGULARDISTANCE
3.  VELOCITY
4.  ANGULARVELOCITY
5.  ACCELERATION
6.  ANGULARACCELERATION
7.  TIME    
8.  MASS
9.  FORCE
10. TORQUE
11. INERTIA
12. POWER
13. TEMPERATURE
14. TORQUECONSTANT
15. DAMPINGCONSTANT
16. THERMALRESISTANCE
17. RESISTANCE
18. INDUCTANCE
19. CURRENT
20. TEMPERATURECOFFICIENT
21. CAPACITANCE
22. VOLTAGE
23. DENSITY
24. ROLLOFF
25. MAGNETTEMPCOFFICIENT
26. LEAD
27. INCLINATION
28. DIAMETER
29. FORCECONSTANT
30. ENERGY
31. LIFE
32. ALTITUDE
33. LINEARDAMPING
34. CURRENCY
35. JERK
36. VOLUME
37. AREA
38. ANGULARJERK
39. MOMENT
40. BANDWIDTH
41. INTEGRAL
42. STIFFNESSROTARY
43. BACKLASH
44. FREQUENCY
45. PRESSURE
46. THERMALMASS
47. STIFFNESSLINEAR
48. PERCENTAGE
