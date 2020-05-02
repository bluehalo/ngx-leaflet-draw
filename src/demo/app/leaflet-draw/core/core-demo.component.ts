import { Component } from '@angular/core';

import { DrawEvents, featureGroup, FeatureGroup, icon, latLng, tileLayer } from 'leaflet';

@Component({
	selector: 'leafletDrawCoreDemo',
	templateUrl: './core-demo.component.html'
})
export class LeafletDrawCoreDemoComponent {

	drawnItems: FeatureGroup = featureGroup();
	options = {
		layers: [
			tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' })
		],
		zoom: 5,
		center: latLng({ lat: 46.879966, lng: -121.726909 })
	};

	drawOptions = {
		position: 'topright',
		draw: {
			marker: {
				icon: icon({
					iconSize: [ 25, 41 ],
					iconAnchor: [ 13, 41 ],
					iconUrl: '2b3e1faf89f94a4835397e7a43b4f77d.png',
					iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
					shadowUrl: 'a0c6cc1401c107b501efee6477816891.png'
				})
			}
		},
		edit: {
			featureGroup: this.drawnItems
		}
	};

	drawLocal: any = {
		draw: {
			toolbar: {
				buttons: {
					polygon: 'Draw an awesome polygon!'
				}
			}
		}
	};

	public onDrawCreated(e: any) {
		// tslint:disable-next-line:no-console
		console.log('Draw Created Event!');

		const layer = (e as DrawEvents.Created).layer;
		this.drawnItems.addLayer(layer);
	}

	public onDrawStart(e: any) {
		// tslint:disable-next-line:no-console
		console.log('Draw Started Event!');
	}

}
