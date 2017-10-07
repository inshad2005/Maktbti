import {Injectable} from "@angular/core";
import {NavOptions} from "ionic-angular";;

import {Current} from "../models/current";

@Injectable()
export class AppProvider {
    navOptions: NavOptions;
    current: Current;

    constructor( ) {
 
        this.current = new Current('all');
    }

}
