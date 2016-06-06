require(['MakingBubbles'], function(MakingBubbles){
    var dom = document.getElementById('app');

    var ballsCount = getParam('count') || 30;
    
    var mw = MakingBubbles(dom, {
        ballColor: 'black',
        ballOutline: '#B26284',
        backgroundColor: 'rgb(33, 35, 33)',
        lineColor: '#B26284',
        ballsCount: ballsCount,
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
    
    function getParam(key){
        var params = {};
        location
            .search
            .substring(1)
            .split('&')
            .forEach(function(param) { 
                var par = param.split('='); 
                params[par[0]] = par[1];
            });
        
        return params[key];
    }
});