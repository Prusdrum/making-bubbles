require(['MakingBubbles'], function(MakingBubbles){
    var dom = document.getElementById('app');

    var mw = MakingBubbles(dom, {
        ballColor: 'black',
        ballOutline: '#B26284',
        backgroundColor: 'rgb(33, 35, 33)',
        lineColor: '#B26284',
        ballsCount: 30,
        ballRadiusRange: [3, 12],
        distanceTreshold: 200,
        ballSpeedRange: 0.4
    }).animate();
    
    dom.addEventListener('click', function(ev){
        if (!mw.active){
            mw.animate();
        } else {
            mw.stop();
        }
    });
});