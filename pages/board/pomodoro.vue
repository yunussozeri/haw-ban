<template>
    <div id="app">
        <div class="timer">
            <h1>Vue.js Pomodoro Timer</h1>
    
            <h1 class="time">{{minutes}}:{{seconds}}</h1>
    
            <div class="controls">
    
                <i v-on:click="adjustTimer('+')" class="fa fa-plus" aria-hidden="true"></i>
    
                <i v-if="isRunning === false" v-on:click="startTimer()" class="fa fa-play" aria-hidden="true"></i>
    
                <i v-else v-on:click="stopTimer()" class="fa fa-pause" aria-hidden="true"></i>
    
                <i v-on:click="adjustTimer('-')" class="fa fa-minus" aria-hidden="true"></i>
    
            </div>
    
            <div class="controls">
    
                <i v-on:click="resetTimer('-')" class="fa fa-refresh" aria-hidden="true"></i>
    
            </div>
    
        </div>
    
        <div class="credits">
            <i class="fa fa-github" aria-hidden="true"></i>
        </div>
    </div>
    </template>
    
    <script>
    export default {
        name: 'app',
    
        data() {
            return {
                timerId: '',
                timer: 1500,
                duration: 1500,
                minutes: 25,
                seconds: 0,
                isRunning: false
            }
        },
    
        created: function() {
            this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
            this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
        },
    
        methods: {
    
            adjustTimer: function(action) {
    
                if (this.isRunning === false) {
    
                    if (action == '+') {
    
                        this.duration += 60;
                        this.timer += 60;
    
                        this.minutes = parseInt(this.timer / 60, 10);
                        this.seconds = parseInt(this.timer % 60, 10);
    
                        this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
                        this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
    
                    } else {
    
                        this.duration -= 60;
                        this.timer -= 60;
    
                        this.minutes = parseInt(this.timer / 60, 10);
                        this.seconds = parseInt(this.timer % 60, 10);
    
                        this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
                        this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
                    }
    
                }
    
            },
    
            timerObj: function(duration) {
                this.timer = duration;
                this.duration = duration;
                var _this = this;
                this.timerId = setInterval(function() {
                    _this.minutes = parseInt(_this.timer / 60, 10);
                    _this.seconds = parseInt(_this.timer % 60, 10);
    
                    _this.minutes = _this.minutes < 10 ? "0" + _this.minutes : _this.minutes;
                    _this.seconds = _this.seconds < 10 ? "0" + _this.seconds : _this.seconds;
    
                    if (--_this.timer < 0) {
                        _this.timer = _this.duration;
                        _this.resetTimer();
                    }
                }, 1000);
    
            },
    
            startTimer: function() {
                this.isRunning = true;
    
                this.timerObj(this.timer);
    
                //this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
                //this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
    
            },
    
            stopTimer: function() {
                console.log('stop');
                this.isRunning = false;
                return window.clearInterval(this.timerId);
            },
    
            resetTimer: function() {
                this.isRunning = false;
    
                this.timer = 1500; // 25min default
                this.duration = 1500;
    
                this.minutes = parseInt(this.timer / 60, 10);
                this.seconds = parseInt(this.timer % 60, 10);
    
                this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
                this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
    
                return window.clearInterval(this.timerId);
    
            }
        }
    }
    </script>
    
    <style>
    html {
        height: 100%;
    }
    
    body {
        height: 100%;
    }
    
    #app {
        height: 100%
    }
    
    .timer {
        height: 80%;
    }
    
    .credits {
        height: 20%;
    }
    
    #app {
        font-family: 'Open Sans', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: rgba(127, 140, 141, 1.0);
        margin-top: 0
    }
    
    h1,
    h2 {
        font-weight: normal;
    }
    
    .time {
        font-size: 5rem;
        font-weight: 300;
        padding-bottom: 10px;
        margin-bottom: 0;
    }
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }
    
    i {
        padding: 10px;
        margin: 0 5px;
        color: rgba(52, 73, 94, 1.0);
        cursor: pointer;
    }
    
    i:hover {
        color: rgba(52, 73, 94, 1.0);
    }
    
    .fa-play,
    .fa-plus,
    .fa-minus,
    .fa-refresh {
        color: rgba(189, 195, 199, 1.0);
    }
    </style>
    le>
    