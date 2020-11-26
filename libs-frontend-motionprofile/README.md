# libs-frontend-motionprofile
libs-frontend-motionprofile plugin can be used to plot motion profile graphs (postion vs time and Accel vs Time etc.) based on the input motion parameters.

## Usage
### JS Dependencies: 
Following are the JS dependencies of libs-frontend-motionprofile plugin:
 - JQuery
 - flot
 - flot-axislabels
 - jquery-typewatch
 
```html
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="bower_components/flot/jquery.flot.js"></script>
<script src="bower_components/flot/jquery.flot.resize.js"></script>
<script src="bower_components/flot-axislabels/jquery.flot.axislabels.js"></script>
<script src="bower_components/jquery-typewatch/jquery.typewatch.js"></script>
<script src="src/js/libs-frontend-motionprofile.js"></script>
```
**Note**: It's recommended to include the javascript at the bottom of the page before the closing.

### CSS Dependencies:
Following are the CSS dependencies of libs-frontend-motionprofile plugin:
- libs-frontend-motionprofile.css
- bootstrap.css
```html
<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css">
<link rel="stylesheet" href="src/css/libs-frontend-motionprofile.css">
```

## HTML schema
- Requires an HTML element.

    ```html
    <div id="plotArea"></div>
    ```
- HTML Element should have height and width defined. Graph Area will automatically adjust accordingly to the size of container element

    ```css
    #plotArea {
        width: 900px;
        height: 100px;
    }
    ```
- Enable the plugin by calling **_motionProfile()_** function on JQuery object as shown below:

     ```javascript
    $("#plotArea").motionProfile();
    ```

## Config
### Options
libs-frontend-motionprofile provides following options to configure motion parameters. These options can be passed when the plugin is invoked.

### Data Configurations

Option Name | Type | Default (SI Units) | Valid Values | Description
--- | --- | --- | --- |--- |
activeProfileIndex | Integer | 1 | 1,2,3 |Set the default profile when launched
moveDistance | float | 20 | Any Positive Number |Set the value of move distance
moveTime | float | 10 | Any positive Number | Set the value of move time
dwellTime | float | 2 | Any Positive Number | Set the value of dwell time

### UI Configurations

Option Name | Type | Default | Valid Values | Description
--- | --- | --- | --- |--- |
plotDisplayType | Enum | GraphMode.individualAxis | GraphMode.IndividualAxis <br /> OR <br />GraphMode.MultiAxis |Individual Axis - Separate plot for each graph (position / velocity / ...) <br /> Multi Axis (overlapped) - All graphs on same axis
showGraphs | Enum | [ Graphs.velocity] | Any combination of - <br /> [Graphs.position, Graphs.velocity, Graphs.acceleration] | Specified which profile graphs will be visible on screen
hideGraphDragHandles | Enum | GraphHandles.showAll | Any combination of - <br />[GraphHandles.position, GraphHandles.peakVelocity, GraphHandles.moveTime, GraphHandles.dwellTime] <br /> OR <br /> GraphHandles.showAll| This is used to specify which interactive points are to be shown out of move distance, peak velocity, move time & dwell time with which user can interact to change motion parameters. By default all points are shown.
readOnlyInputs | Enum | false (All Editable) | any combination of - <br /> [DataFields.moveDistance, DataFields.moveTime, DataFields.dwellTime, DataFields.velocityFormFactor, DataFields.peakVelocity, DataFields.rmsVelocity, DataFields.peakAccelaration, DataFields.rmsAccelaration] | This is used to specify which input fields are to be made read-only. 
hideInputs | Enum | flase (All Visible) | any combination of - <br /> [DataFields.moveDistance, DataFields.moveTime, DataFields.dwellTime, DataFields.velocityFormFactor, DataFields.peakVelocity, DataFields.rmsVelocity, DataFields.peakAccelaration, DataFields.rmsAccelaration] | This is used to specify the input fields that are to be hidden.
showProfiles | Enum | Profiles.showAll | any combination of - <br />  [Profiles.profile1, Profiles.profile2, Profiles.profile3] <br /> OR <br /> Profiles.showAll | This is used to specify which profile buttons are to hide out of 'profile1, profile2, profile3' predefined profile templates
smoothness | Enum | Smoothness.automatic | Smoothness.automatic, Smoothness.standard, Smoothness.maximum | This specifies the smoothness / jerk value out of 3 predefined templates.

* CONF = COSMATT.MotionProfile.configuration

### Example
 ```javascript
    $("#plotArea").motionProfile({
		moveDistance: 29,
		activeProfileIndex: 1,
		graphMode:GraphMode.individualAxis,
		showGraphs: [Graphs.position, Graphs.velocity, Graphs.acceleration],
		showGraphDragHandles: GraphHandles.showAll,
		readOnlyInputs: [DataFields.peakVelocity, DataFields.rmsVelocity, DataFields.peakAccelaration, DataFields.rmsAccelaration],
		showProfiles: [Profiles.profile1, Profiles.profile2, Profiles.profile3],
		smoothness: Smoothness.automatic
    });
 ```
 
### Callbacks
Callback functions will be called on specific actions that are mentioned below.
Action | Description
--- | --- |
onGraphPaint  | Triggered after the Graph has painted (on launch or when graph is updated by change in motion parameters)
onGraphDrag | Triggered after drag of points in graph

### Example
 ```javascript
    var onGraphPaintHandler = function(){
        console.log('graph painted');
    };
    var onGraphDragHandler = function(){
        console.log('graph dragged to update');
    };
    
    $("#plotArea").motionProfile({
        onGraphPaint: onGraphPaintHandler,
        onGraphDrag: onGraphDragHandler
    });
 ```
