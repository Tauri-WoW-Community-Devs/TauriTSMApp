function Timer(callback, time) {
    var timerObj = setInterval(callback, time);

    this.stop = function () {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function () {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(callback, time);
        }
        return this;
    }

    // start with new or original interval, stop current interval
    this.reset = function (newTime = time) {
        time = newTime;
        return this.stop().start();
    }
}

export default Timer;
