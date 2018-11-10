import { EventEmitter, NgZone } from '@angular/core';
export declare class LeafletDrawUtil {
    static handleEvent<T>(zone: NgZone, eventEmitter: EventEmitter<T>, event: T): void;
}
