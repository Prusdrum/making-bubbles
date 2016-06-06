# making-bubbles 

## Usage:
1. Add minified file to index.html from dist : `<script src="making-bubbles.min.js"></script>`
2. Add Module using AMD: 
```
require(['MakingBubbles'], function(MakingBubbles){
  var domElement = document.getElementById('someDOM');
  var mb = MakingBubbles(domElement, {
    .. config object ..
  }).animate();
})
```
## Methods
1. **animate**
2. **stop**
```
var mb = MakingBubbles(domElement, {
    .. config object ..
  });
mb.animate();
mb.stop();
```
## Configuration ##
- ballColor:
  - type: String
  - example: `ballColor: 'black'`
- ballOutline:
  - type: String
  - example: `ballOutline: '#B26284'`
- backgroundColor:
  - type: String
  - example: `backgroundColor: 'rgb(33, 35, 33)'`
- lineColor:
  - type: String
  - example: `lineColor: '#B26284'`
- ballsCount:
  - type: Number
  - max: 500
  - example: `ballsCount: 30`
- ballRadiusRange:
  - type: Array
  - example: 
```
var min = 10;
var max = 30;
ballRadiusRange: [min, max]
```
- distanceTreshold: distance when line between two balls should disappear
  - type: Number
  - example: `distanceTreshold: 200`
- ballSpeedRange: range of balls velocity (x and y vectors)
  - type: Number
  - example: `ballSpeedRange: 0.4 //range: random number between -0.4 and 0.4`

### Build ###
```
npm install requirejs -g
r.js -o build.js
```

  
