define('utils', [], function(){
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    function getRandom(min, max){
        return Math.random() * (max - min) + min;
    }
    
    return {
        getRandom: getRandom,
        getRandomInt: getRandomInt
    }
});