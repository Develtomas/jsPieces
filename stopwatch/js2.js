window.onload = function () {
    var sec = '00';
    var min = '00';
    var cur_date = 0;
    var jumper = 0;
    var startSec = 1;
    var startMin = 0;

    function start() {
        if (cur_date == 0) {
            cur_date = new Date();
            var new_date = new Date() - cur_date;
            sec = (Math.floor(new_date / 1000 + startSec)) % 60;
            min = (Math.floor(new_date / 1000 / 60 + startMin)) % 60;
            count1.innerHTML = zero(min) + ':' + zero(sec);
        }
        else {
            new_date = new Date() - cur_date;
            sec = (Math.floor(new_date / 1000 + startSec)) % 60;
            min = (Math.floor(new_date / 1000 / 60 + startMin)) % 60;
            if (sec == 0) {
                min++
            }
            count1.innerHTML = zero(min) + ':' + zero(sec);
        }
    }
 
    startBtn.onclick = function() {
        jumper = setInterval(start, 1000);
    }

    stopBtn.onclick = function () {
        clearInterval(jumper);
        cur_date = 0;
        startSec = sec + 1;
        startMin = min;
    }

    dropBtn.onclick = function () {
        clearInterval(jumper);
        cur_date = 0;
        sec = 0;
        min = 0;
        startSec = 1;
        startMin = 0;
        count1.innerHTML = '00:00';
    }

    function zero(val) {
        var valStr = val.toString().length;
        if (valStr < 2) {
            val = '0' + val;
        }
        return val;
    }
}