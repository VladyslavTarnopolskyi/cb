function perform(arg1, callback) {
    var arr = [];
    var param = callback();
    var then = function (cb){
        arr.push(cb);
        return {then: then}
    };

    function _next(param) {
        var callback = arr.shift();
        if (callback) {
            var retn = callback(param);
            _next(retn);
        }
    }

    setTimeout(function (){
        _next(param);
    }, 0);

    return {
        then: then
    };
}

perform(null, function() {
    var param = 1;
    console.log(param);
    return param;
})
    .then(function(param) {
        console.log(++param);
        return param;
    })
    .then(function(param) {
        console.log(++param);
        return param;
    });
