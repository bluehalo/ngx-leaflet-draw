import { Directive, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-draw';

import { LeafletDirective, LeafletDirectiveWrapper, LeafletUtil } from '@asymmetrik/ngx-leaflet';


@Directive({
	selector: '[leafletDraw]'
})
export class LeafletDrawDirective
	implements OnChanges, OnInit {

	leafletDirective: LeafletDirectiveWrapper;

	drawControl: L.Control.Draw;
	featureGroup: L.FeatureGroup;

	@Input('leafletDrawOptions') drawOptions: L.Control.DrawConstructorOptions = null;

	// Configure callback function for the map
	@Output('leafletDrawReady') drawReady = new EventEmitter<L.Control.Draw>();

	// Draw Events
	@Output('leafletDrawCreated') onDrawCreated = new EventEmitter<L.DrawEvents.Created>();
	@Output('leafletDrawEdited') onDrawEdited = new EventEmitter<L.DrawEvents.Edited>();
	@Output('leafletDrawDeleted') onDrawDeleted = new EventEmitter<L.DrawEvents.Deleted>();
	@Output('leafletDrawStart') onDrawStart = new EventEmitter<L.DrawEvents.DrawStart>();
	@Output('leafletDrawStop') onDrawStop = new EventEmitter<L.DrawEvents.DrawStop>();
	@Output('leafletDrawVertex') onDrawVertex = new EventEmitter<L.DrawEvents.DrawVertex>();
	@Output('leafletDrawEditStart') onDrawEditStart = new EventEmitter<L.DrawEvents.EditStart>();
	@Output('leafletDrawEditMove') onDrawEditMove = new EventEmitter<L.DrawEvents.EditMove>();
	@Output('leafletDrawEditResize') onDrawEditResize = new EventEmitter<L.DrawEvents.EditResize>();
	@Output('leafletDrawEditVertex') onDrawEditVertex = new EventEmitter<L.DrawEvents.EditVertex>();
	@Output('leafletDrawEditStop') onDrawEditStop = new EventEmitter<L.DrawEvents.EditStop>();
	@Output('leafletDrawDeleteStart') onDrawDeleteStart = new EventEmitter<L.DrawEvents.DeleteStart>();
	@Output('leafletDrawDeleteStop') onDrawDeleteStop = new EventEmitter<L.DrawEvents.DeleteStop>();
	@Output('leafletDrawToolbarOpened') onDrawToolbarOpened = new EventEmitter<L.DrawEvents.ToolbarOpened>();
	@Output('leafletDrawToolbarClosed') onDrawToolbarClosed = new EventEmitter<L.DrawEvents.ToolbarClosed>();
	@Output('leafletDrawMarkerContext') onDrawMarkerContext = new EventEmitter<L.DrawEvents.MarkerContext>();

	constructor(leafletDirective: LeafletDirective, private zone: NgZone) {
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
		const map = this.leafletDirective.getMap();
		map.on(L.Draw.Event.CREATED, (e: any) => {
			const layer = (e as L.DrawEvents.Created).layer;
			this.featureGroup.addLayer(layer);
			LeafletUtil.handleEvent(this.zone, this.onDrawCreated, e);
		});

		// add draw event pass throughs
		map.on(L.Draw.Event.EDITED, (e: L.DrawEvents.Edited) => LeafletUtil.handleEvent(this.zone, this.onDrawEdited, e));
		map.on(L.Draw.Event.DELETED, (e: L.DrawEvents.Deleted) => LeafletUtil.handleEvent(this.zone, this.onDrawDeleted, e));
		map.on(L.Draw.Event.DRAWSTART, (e: L.DrawEvents.DrawStart) => LeafletUtil.handleEvent(this.zone, this.onDrawStart, e));
		map.on(L.Draw.Event.DRAWSTOP, (e: L.DrawEvents.DrawStop) => LeafletUtil.handleEvent(this.zone, this.onDrawStop, e));
		map.on(L.Draw.Event.EDITSTART, (e: L.DrawEvents.EditStart) => LeafletUtil.handleEvent(this.zone, this.onDrawEditStart, e));
		map.on(L.Draw.Event.EDITMOVE, (e: L.DrawEvents.EditMove) => LeafletUtil.handleEvent(this.zone, this.onDrawEditMove, e));
		map.on(L.Draw.Event.EDITRESIZE, (e: L.DrawEvents.EditResize) => LeafletUtil.handleEvent(this.zone, this.onDrawEditResize, e));
		map.on(L.Draw.Event.EDITVERTEX, (e: L.DrawEvents.EditVertex) => LeafletUtil.handleEvent(this.zone, this.onDrawEditVertex, e));
		map.on(L.Draw.Event.EDITSTOP, (e: L.DrawEvents.EditStop) => LeafletUtil.handleEvent(this.zone, this.onDrawEditStop, e));
		map.on(L.Draw.Event.DELETESTART, (e: L.DrawEvents.DeleteStart) => LeafletUtil.handleEvent(this.zone, this.onDrawDeleteStart, e));
		map.on(L.Draw.Event.DELETESTOP, (e: L.DrawEvents.DeleteStop) => LeafletUtil.handleEvent(this.zone, this.onDrawDeleteStop, e));
		map.on(L.Draw.Event.TOOLBAROPENED, (e: L.DrawEvents.ToolbarOpened) => LeafletUtil.handleEvent(this.zone, this.onDrawToolbarOpened, e));
		map.on(L.Draw.Event.TOOLBARCLOSED, (e: L.DrawEvents.ToolbarClosed) => LeafletUtil.handleEvent(this.zone, this.onDrawToolbarClosed, e));


		// Notify others that the draw control has been created
		this.drawReady.emit(this.drawControl);
	}

	ngOnDestroy() {
		this.leafletDirective.getMap().removeControl(this.drawControl);
	}

	ngOnChanges(changes: { [key: string]: SimpleChange }) {
		// No changes being handled currently
	}

	public getDrawControl() {
		return this.drawControl;
	}

	private initializeDrawOptions(options: L.Control.DrawConstructorOptions) {

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
