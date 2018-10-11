import {EventEmitter, NgZone } from '@angular/core';

export class LeafletDrawUtil {

	static handleEvent<T>(zone: NgZone, eventEmitter: EventEmitter<T>, event: T) {

		// Don't want to emit if there are no observers
		if (0 < eventEmitter.observers.length) {
			zone.run(() => {
				eventEmitter.emit(event);
			});
		}

	}
}
