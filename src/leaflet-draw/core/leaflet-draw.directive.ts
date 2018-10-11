import { Directive, EventEmitter, Input, NgZone, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';

import * as L from 'leaflet';
import 'leaflet-draw';

import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';
// ngx-leaflet doesnt export leaflet util, so duplicating the handleEvent function here.
import { LeafletDrawUtil } from './leaflet-draw-util';


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
	@Output('drawCreated') drawCreated = new EventEmitter<L.DrawEvents.Created>();
	@Output('drawEdited') drawEdited = new EventEmitter<L.DrawEvents.Edited>();
	@Output('drawDeleted') drawDeleted = new EventEmitter<L.DrawEvents.Deleted>();
	@Output('drawStart') drawStart = new EventEmitter<L.DrawEvents.DrawStart>();
	@Output('drawStop') drawStop = new EventEmitter<L.DrawEvents.DrawStop>();
	@Output('drawVertex') drawVertex = new EventEmitter<L.DrawEvents.DrawVertex>();
	@Output('drawEditStart') drawEditStart = new EventEmitter<L.DrawEvents.EditStart>();
	@Output('drawEditMove') drawEditMove = new EventEmitter<L.DrawEvents.EditMove>();
	@Output('drawEditResize') drawEditResize = new EventEmitter<L.DrawEvents.EditResize>();
	@Output('drawEditVertex') drawEditVertex = new EventEmitter<L.DrawEvents.EditVertex>();
	@Output('drawEditStop') drawEditStop = new EventEmitter<L.DrawEvents.EditStop>();
	@Output('drawDeleteStart') drawDeleteStart = new EventEmitter<L.DrawEvents.DeleteStart>();
	@Output('drawDeleteStop') drawDeleteStop = new EventEmitter<L.DrawEvents.DeleteStop>();
	@Output('drawToolbarOpened') drawToolbarOpened = new EventEmitter<L.DrawEvents.ToolbarOpened>();
	@Output('drawToolbarClosed') drawToolbarClosed = new EventEmitter<L.DrawEvents.ToolbarClosed>();
	@Output('drawMarkerContext') drawMarkerContext = new EventEmitter<L.DrawEvents.MarkerContext>();

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
			LeafletDrawUtil.handleEvent(this.zone, this.drawCreated, e);
		});

		// add draw event pass throughs
		map.on(L.Draw.Event.EDITED, (e: L.DrawEvents.Edited) => LeafletDrawUtil.handleEvent(this.zone, this.drawEdited, e));
		map.on(L.Draw.Event.DELETED, (e: L.DrawEvents.Deleted) => LeafletDrawUtil.handleEvent(this.zone, this.drawDeleted, e));
		map.on(L.Draw.Event.DRAWSTART, (e: L.DrawEvents.DrawStart) => LeafletDrawUtil.handleEvent(this.zone, this.drawStart, e));
		map.on(L.Draw.Event.DRAWSTOP, (e: L.DrawEvents.DrawStop) => LeafletDrawUtil.handleEvent(this.zone, this.drawStop, e));
		map.on(L.Draw.Event.EDITSTART, (e: L.DrawEvents.EditStart) => LeafletDrawUtil.handleEvent(this.zone, this.drawEditStart, e));
		map.on(L.Draw.Event.EDITMOVE, (e: L.DrawEvents.EditMove) => LeafletDrawUtil.handleEvent(this.zone, this.drawEditMove, e));
		map.on(L.Draw.Event.EDITRESIZE, (e: L.DrawEvents.EditResize) => LeafletDrawUtil.handleEvent(this.zone, this.drawEditResize, e));
		map.on(L.Draw.Event.EDITVERTEX, (e: L.DrawEvents.EditVertex) => LeafletDrawUtil.handleEvent(this.zone, this.drawEditVertex, e));
		map.on(L.Draw.Event.EDITSTOP, (e: L.DrawEvents.EditStop) => LeafletDrawUtil.handleEvent(this.zone, this.drawEditStop, e));
		map.on(L.Draw.Event.DELETESTART, (e: L.DrawEvents.DeleteStart) => LeafletDrawUtil.handleEvent(this.zone, this.drawDeleteStart, e));
		map.on(L.Draw.Event.DELETESTOP, (e: L.DrawEvents.DeleteStop) => LeafletDrawUtil.handleEvent(this.zone, this.drawDeleteStop, e));
		map.on(L.Draw.Event.TOOLBAROPENED, (e: L.DrawEvents.ToolbarOpened) => LeafletDrawUtil.handleEvent(this.zone, this.drawToolbarOpened, e));
		map.on(L.Draw.Event.TOOLBARCLOSED, (e: L.DrawEvents.ToolbarClosed) => LeafletDrawUtil.handleEvent(this.zone, this.drawToolbarClosed, e));
		// map.on(L.Draw.Event.TOOLBARCONTEXT, (e: L.DrawEvents.MarkerContext) => LeafletDrawUtil.handleEvent(this.zone, this.drawMarkerContext, e));


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
