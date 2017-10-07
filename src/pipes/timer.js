var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, Pipe } from '@angular/core';
/*
  Generated class for the Timer pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
var Timer = (function () {
    function Timer() {
    }
    Timer.prototype.transform = function (value) {
        var a = Math.floor(parseInt(value) / (60 * 60));
        var b = Math.floor((parseInt(value) % (60 * 60)) / 60);
        var c = (parseInt(value) % (60 * 60)) % 60;
        var time;
        if (a != 0) {
            if (a.toString().length == 1) {
                time = '0' + a.toString() + ':';
            }
            else {
                time = a.toString() + ':';
            }
        }
        else {
            time = '00' + ':';
        }
        if (b != 0) {
            if (b.toString().length == 1) {
                time += '0' + b.toString() + ':';
            }
            else {
                time += b.toString() + ':';
            }
        }
        else {
            time += '00' + ':';
        }
        if (c != 0) {
            if (c.toString().length == 1) {
                time += '0' + c;
            }
            else {
                time += c;
            }
        }
        else {
            time += '00';
        }
        return time;
    };
    return Timer;
}());
Timer = __decorate([
    Pipe({
        name: 'timer'
    }),
    Injectable()
], Timer);
export { Timer };
//# sourceMappingURL=timer.js.map