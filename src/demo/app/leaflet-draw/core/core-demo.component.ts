import { Component } from '@angular/core';

import * as L from 'leaflet';

@Component({
	selector: 'leaflet-draw-core-demo',
	templateUrl: './core-demo.component.html'
})
export class LeafletDrawCoreDemoComponent {

	options = {
		layers: [
			L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
		],
		zoom: 5,
		center: L.latLng({ lat: 46.879966, lng: -121.726909 })
	};

	drawOptions = {
		position: 'topright',
		draw: {
			marker: {
				icon: L.icon({
					iconUrl: '2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
					shadowUrl: '44a526eed258222515aa21eaffd14a96.png'
				})
			}
		}
	};

	constructor() { }

}
