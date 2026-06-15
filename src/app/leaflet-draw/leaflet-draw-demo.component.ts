import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'leafletDrawDemo',
	templateUrl: './leaflet-draw-demo.component.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	standalone: false
})
export class LeafletDrawDemoComponent {
	showDemo = false;

	ngOnInit() {

		// Primarily for debugging
		setTimeout(() => {
			this.showDemo = true;
		}, 1000);

	}
}
