import { Directive, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';

import * as L from 'leaflet';

import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/angular2-leaflet';


@Directive({
	selector: '[leaflet-draw]'
})
export class LeafletDrawDirective
	implements OnChanges, OnInit {

	leafletDirective: LeafletDirectiveWrapper;

	drawControl: L.Control.Draw;
	featureGroup: L.FeatureGroup;

	@Input('leafletDrawOptions') drawOptions: L.Control.DrawConstructorOptions = null;

	constructor(leafletDirective: LeafletDirective) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
	}

	ngOnInit() {
		this.leafletDirective.init();

		// Initialize the draw options (in case they weren't provided)
		this.drawOptions = this.initializeDrawOptions(this.drawOptions);

		// Create the control
		this.drawControl =  new L.Control.Draw(this.drawOptions);

		// Pull out the feature group for convenience
		this.featureGroup = this.drawOptions.edit.featureGroup;

		// Add the control to the map
		this.leafletDirective.getMap().addControl(this.drawControl);

		// Register the main handler for events coming from the draw plugin
		this.leafletDirective.getMap().on(L.Draw.Event.CREATED, (e: any) => {
			let layer = (e as L.DrawEvents.Created).layer;
			this.featureGroup.addLayer(layer);
		});
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {
	}

	initializeDrawOptions(options: L.Control.DrawConstructorOptions) {

		// Ensure the options have a featureGroup
		if (null == options) {
			options = {
				edit: null
			};
		}
		if (null == options.edit) {
			options.edit = {
				featureGroup: null
			};
		}
		if (null == options.edit.featureGroup) {
			// No feature group was provided, so we're going to add it ourselves
			options.edit.featureGroup = L.featureGroup();
			this.leafletDirective.getMap().addLayer(options.edit.featureGroup);
		}

		return options;
	}
}
