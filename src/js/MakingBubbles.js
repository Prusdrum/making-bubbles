define('MakingBubbles', ['Ball', 'utils', 'BallsCalculations'], function(Ball, utils, BallsCalculations){
    'use strict';
    var MakingBubbles = function(dom, config){
        if (!(this instanceof MakingBubbles)){
            return new MakingBubbles(dom, config);
        }
        //config
        this.ballColor = config.ballColor || '#B26284';
        this.backgroundColor = config.backgroundColor || '#212321';
        this.lineColor = config.lineColor || '#B26284';
        this.ballsCount = config.ballsCount || 30;
        this.ballRadiusRange = config.ballRadiusRange || [3, 10];
        this.ballOutline = config.ballOutline || 'black';
        this.distanceTreshold = config.distanceTreshold || 100;
        this.ballSpeedRange = config.ballSpeedRange || 0.5;
        this.lineWidth = 3;
        this.active = false;

        //Init
        this._canvas = document.createElement('canvas');
        this._ctx = this._canvas.getContext("2d");
        this.parent = dom;
        
        dom.appendChild(this._canvas);        
        _updateCanvas.call(this);

        this.balls = _initBalls.call(this);
        
        _redraw.call(this);
        window.onresize = _redraw.bind(this);
    };
    
    //public functions
    MakingBubbles.prototype.animate = function(){
        this.active = true;
        _loop.call(this);
        return this;
    }
    
    MakingBubbles.prototype.stop = function(){
        this.active = false;
        return this;
    }
    
    //private functions - bind 'this' with them (bind, call, apply)
    function _initBalls(){
        var balls = [],
            canvas = this._canvas,
            self = this,
            minR = this.ballRadiusRange[0],
            maxR = this.ballRadiusRange[1],
            minSpeed = -this.ballSpeedRange,
            maxSpeed = this.ballSpeedRange,
            ballColor = this.ballColor,
            ballOutline = this.ballOutline,
            startPoint, velocity;
        
        for (var i = 0; i < this.ballsCount; i += 1) {
            var x = utils.getRandom(maxR, canvas.width - maxR),
                y = utils.getRandom(maxR, canvas.height - maxR),
                xVel = utils.getRandom(minSpeed, maxSpeed),
                yVel = utils.getRandom(minSpeed, maxSpeed),
                radius = utils.getRandom(minR, maxR);
            
            startPoint = { x: x, y: y };
            velocity = { x: xVel, y: yVel };
            
            var ball = new Ball(startPoint, velocity, radius, {
                ballColor: ballColor,
                ballOutline: ballOutline
            });
            
            balls.push(ball);
        }
        
        return balls;
    }
    
    function _updateBalls(){
        var canvas = this._canvas,
            balls = this.balls;
        
        balls.forEach(function(ball){
            ball.update(canvas);
        });
    }
    
    function _drawBalls(){
        var ctx = this._ctx,
            canvas = this._canvas,
            balls = this.balls,
            self = this,
            parent = this.parent;
        
        balls.forEach(function(ball, i){
            for (var j = balls.length - 1; j > i; j -= 1) {
                var ball2 = balls[j];
                var calc = new BallsCalculations(ball, ball2, self.distanceTreshold);
                
                if (calc.hasToShowLine()) {
                    ctx.beginPath();
                    ctx.strokeStyle = self.lineColor;
                    ctx.globalAlpha = calc.getLineAlpha();
                    ctx.lineWidth = self.lineWidth;
                    ctx.moveTo(ball.x, ball.y);
                    ctx.lineTo(ball2.x, ball2.y);
                    ctx.stroke();
                }

                if (calc.isCollisionDetected() && calc.hasToBounce()){
                    calc.bounce(true);
                }
            }
        });
        
        //dodatkowa pętla aby linie nie przykrywały kulek
        balls.forEach(function(ball){
            ball.draw(ctx, canvas);
        })
    }
    
    function _loop(){
        if (this.active){
            _redraw.call(this);
            requestAnimationFrame(_loop.bind(this));
        }
    }
    
    function _redraw(){
        var ctx = this._ctx;
        var canvas = this._canvas,
            parent = this.parent;

        _updateCanvas.call(this);
        _updateBalls.call(this);
        _drawBackground.call(this);
        _drawBalls.call(this);
    }
    
    function _updateCanvas(){
        var parent = this.parent,
            width = parent.clientWidth,
            height = parent.clientHeight;
        
        this._canvas.width = width;
        this._canvas.height = height;
    }
    
    function _drawBackground(){
        var ctx = this._ctx,
            parent = this.parent,
            bgColor = this.backgroundColor,
            width = parent.clientWidth,
            height = parent.clientHeight;
        
        ctx.globalAlpha = 1;
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, width, height);
    }

    return MakingBubbles;
});