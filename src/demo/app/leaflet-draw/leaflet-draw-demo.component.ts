import { Component } from '@angular/core';

@Component({
	selector: 'leafletDrawDemo',
	templateUrl: './leaflet-draw-demo.component.html'
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
