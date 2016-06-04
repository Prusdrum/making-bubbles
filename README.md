# making-bubbles

## Usage: ##
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

## Methods ##
1. **animate**
2. **stop**
```
var mb = MakingBubbles(domElement, {
    .. config object ..
  });
mb.animate();
mb.stop();
```

## Configuration ###
1. **ballColor** (*String*)
```
ballColor: 'black'
```
2. **ballOutline** (*String*)
```
ballOutline: '#B26284'
```
3. **backgroundColor** (*String*)
```
backgroundColor: 'rgb(33, 35, 33)'
```
4. **lineColor** (*String*)
```
lineColor: '#B26284'
```
5. **ballsCount** (*Number*)
```
ballsCount: 30
```
6. **ballRadiusRange** (*Array*)
```
var min = 10;
var max = 30;
ballRadiusRange: [min, max]
```
7. **distanceTreshold** (*Number*) - distance when line between two balls should disappear
```
distanceTreshold: 200
```
8. **ballSpeedRange** (*Number*) - range of balls velocity (x and y vectors)
```
ballSpeedRange: 0.4
//range: random number between -0.4 and 0.4
```
