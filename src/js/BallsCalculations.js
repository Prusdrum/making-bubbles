define('BallsCalculations', [], function(){
    'use strict';
    var Calcs = function(ball1, ball2, distanceTreshold){
        this._b1 = ball1;
        this._b2 = ball2;
        this._treshold = distanceTreshold;
        
        this.dx = this._b2.x - this._b1.x;
        this.dy = this._b2.y - this._b1.y;
        
        this.dist = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
    }
    
    Calcs.prototype.isCollisionDetected = function(){
        var rSum = this._b1.r + this._b2.r,
            dist = this.dist;
        
        return dist < rSum;
    }
    
    Calcs.prototype.getLineAlpha = function(){
        //linear y = (ax + b)
        var a = (1 / this._treshold) * -1,
            b = 1, //max opacity (1.0)
            x = this.dist;
        
        return (a * x) + b;
    }
    
    Calcs.prototype.hasToShowLine = function(){
        return this.dist <= this._treshold;
    }
    
    Calcs.prototype.hasToBounce = function(){
        var dxVel = this._b2.vel.x - this._b1.vel.x,
            dyVel = this._b2.vel.y - this._b1.vel.y,
            velIndicator = this.dx * dxVel + this.dy * dyVel;
        
        //prevent sticking
        return velIndicator < 0;
    }
    
    Calcs.prototype.bounce = function(weighted){
        weighted = weighted || false;
        
        var b1 = this._b1,
            b2 = this._b2;
        
        var b1X = b1.vel.x,
            b1Y = b1.vel.y,
            b2X = b2.vel.x,
            b2Y = b2.vel.y;
        
        var newB1X, newB1Y, newB2X, newB2Y;
        
        if (weighted){
            var m1 = b1.r;
            var m2 = b2.r;
            var mSum = (m1 + m2);
            
            newB1X = (b1X*(m1 - m2) + 2*m2*b2X)/(mSum);
            newB1Y = (b1Y*(m1 - m2) + 2*m2*b2Y)/(mSum);
            newB2X = (b2X*(m2 - m1) + 2*m1*b1X)/(mSum);
            newB2Y = (b2Y*(m2 - m1) + 2*m1*b1Y)/(mSum);
        } else {
            newB1X = b2X;
            newB1Y = b2Y;
            newB2X = b1X;
            newB2Y = b2Y;
        }
        
        b1.vel.x = newB1X;
        b1.vel.y = newB1Y;
        b2.vel.x = newB2X;
        b2.vel.y = newB2Y;
    }

    return Calcs;
});