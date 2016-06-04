requirejs.config({
    paths: {
        'Ball': 'js/Ball',
        'utils': 'js/utils',
        'BallsCalculations': 'js/BallsCalculations',
        'appConfig': 'appConfig',
        'MakingBubbles': 'js/MakingBubbles'
    }
});

require(['MakingBubbles', 'appConfig'], function(MakingBubbles, appConfig){
    var dom = document.getElementById('app');
    var btnStart = document.getElementById('startBtn');
    
    var config = {
        ballColor: appConfig.COLORS.BALL_BACKGROUND,
        ballOutline: appConfig.COLORS.BALL_STROKE,
        backgroundColor: appConfig.COLORS.BACKGROUND,
        lineColor: appConfig.COLORS.BALL_STROKE,
        ballsCount: 30,
        ballRadiusRange: [appConfig.BALL.RADIUS_MIN, appConfig.BALL.RADIUS_MAX],
        distanceTreshold: 200,
        ballSpeedRange: 0.6
    };
    
    var mw = MakingBubbles(dom, config)
    
    btnStart.addEventListener('click', function(ev){
        if (!mw.active){
            mw.animate();
            ev.target.innerHTML = 'Stop';
        } else {
            mw.stop();
            ev.target.innerHTML = 'Start';
        }
    });
});