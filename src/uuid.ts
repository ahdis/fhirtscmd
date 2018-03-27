/// <reference path="../node_modules/@types/uuid/index.d.ts" />
import v4 = require('uuid/v4');

export class Uuid {

    getUuidCda(): string {
        const e: string = v4();
        return e.toUpperCase();        
    }

}