define('Ball', [], function(){
    'use strict';
    var TAU = 2 * Math.PI;

    function Ball (start, velocity, radius, config) {
        this.config = config;
        this.x = start.x;
        this.y = start.y;
        this.vel = {
            x: velocity.x,
            y: velocity.y
        };
        this.r = radius;
    }
    
    Ball.prototype.update = function(canvas){
        var radius = this.r,
            insideBox = (
            this.x > 0 || 
            this.x < canvas.width || 
            this.y < canvas.height ||
            this.y > 0);
        
        if (insideBox) {
            var bounceFromVertical = (this.x > canvas.width - radius || this.x < radius),
                bounceFromHorizontal = (this.y > canvas.height - radius || this.y < radius);

            if (bounceFromVertical) {
                this.inverseX();
            }
            if (bounceFromHorizontal) {
                this.inverseY();
            }
        } else {
            this.inverse();
        }
        
        this.x += this.vel.x;
        this.y += this.vel.y;
    }
    
    Ball.prototype.draw = function(ctx){
        ctx.beginPath();
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = this.config.ballColor;
        
        var x = this.x;
        var y = this.y;
        var r = this.r;
        var arcStart = 0;
        var arcEnd = TAU;
        var counterclockwise = false;
        ctx.arc(x, y, r, arcStart, arcEnd, counterclockwise);
        ctx.fill();
        
        ctx.lineWidth = r/4;
        ctx.strokeStyle = this.config.ballOutline;
        ctx.stroke();
    }
    
    Ball.prototype.inverseX = function(){
        this.vel.x *= -1;
    }
    
    Ball.prototype.inverseY = function(){
        this.vel.y *= -1;
    }
     
    Ball.prototype.inverse = function(){
        this.inverseX();
        this.inverseY();
    }
    
    return Ball;
});