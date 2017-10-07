import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Timer pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'timer'
})
@Injectable()
export class Timer {
   transform(value: string): string {
   		let a = Math.floor(parseInt(value)/(60*60))
   		let b = Math.floor((parseInt(value)%(60*60))/60)
       let c = (parseInt(value)%(60*60))%60;
        let time;
        if(a!=0){
          if(a.toString().length==1)
          {
          time='0'+a.toString()+':'
          }
          else{
          time=a.toString()+':'
          }
        }else{time='00'+':'}
        if(b!=0){
          if(b.toString().length==1)
          {
          time+='0'+b.toString()+':'
          }
          else{
          time+=b.toString()+':'
          }
        }else{time+='00'+':'}	
       	if(c!=0){
           if(c.toString().length==1){
           time+='0'+c
           }
           else{
           time+=c
           }
        }else{time+='00'}
   		return time
    }
}
