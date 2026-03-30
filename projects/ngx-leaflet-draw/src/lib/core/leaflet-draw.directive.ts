import { Directive, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from '@angular/core';

import 'leaflet-draw';
import { Control, Draw, DrawEvents, drawLocal, Map as LeafletMap } from 'leaflet';

import { LeafletDirective, LeafletDirectiveWrapper, LeafletUtil } from '@bluehalo/ngx-leaflet';

import { LeafletDrawUtil } from './leaflet-draw.util';

@Directive({
	selector: '[leafletDraw]',
})
export class LeafletDrawDirective
	implements OnInit, OnDestroy {

	leafletDirective: LeafletDirectiveWrapper;

	drawControl: Control.Draw;

	private map: LeafletMap;
	private readonly drawEventHandlers: Array<{ event: string; handler: (e: any) => void }> = [];

	@Input('leafletDrawOptions') drawOptions: Control.DrawConstructorOptions = null;

	// Using 'any' here to avoid duplicating the DrawLocal interface with a bunch of optional properties
	@Input('leafletDrawLocal') drawLocal: any = null;

	// Configure callback function for the map
	@Output('leafletDrawReady') drawReady = new EventEmitter<Control.Draw>();

	// Draw Events
	@Output('leafletDrawCreated') onDrawCreated = new EventEmitter<DrawEvents.Created>();
	@Output('leafletDrawEdited') onDrawEdited = new EventEmitter<DrawEvents.Edited>();
	@Output('leafletDrawDeleted') onDrawDeleted = new EventEmitter<DrawEvents.Deleted>();
	@Output('leafletDrawStart') onDrawStart = new EventEmitter<DrawEvents.DrawStart>();
	@Output('leafletDrawStop') onDrawStop = new EventEmitter<DrawEvents.DrawStop>();
	@Output('leafletDrawVertex') onDrawVertex = new EventEmitter<DrawEvents.DrawVertex>();
	@Output('leafletDrawEditStart') onDrawEditStart = new EventEmitter<DrawEvents.EditStart>();
	@Output('leafletDrawEditMove') onDrawEditMove = new EventEmitter<DrawEvents.EditMove>();
	@Output('leafletDrawEditResize') onDrawEditResize = new EventEmitter<DrawEvents.EditResize>();
	@Output('leafletDrawEditVertex') onDrawEditVertex = new EventEmitter<DrawEvents.EditVertex>();
	@Output('leafletDrawEditStop') onDrawEditStop = new EventEmitter<DrawEvents.EditStop>();
	@Output('leafletDrawDeleteStart') onDrawDeleteStart = new EventEmitter<DrawEvents.DeleteStart>();
	@Output('leafletDrawDeleteStop') onDrawDeleteStop = new EventEmitter<DrawEvents.DeleteStop>();
	@Output('leafletDrawToolbarOpened') onDrawToolbarOpened = new EventEmitter<DrawEvents.ToolbarOpened>();
	@Output('leafletDrawToolbarClosed') onDrawToolbarClosed = new EventEmitter<DrawEvents.ToolbarClosed>();
	@Output('leafletDrawMarkerContext') onDrawMarkerContext = new EventEmitter<DrawEvents.MarkerContext>();

	constructor(leafletDirective: LeafletDirective, private zone: NgZone) {
		this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
	}

	ngOnInit() {
		this.leafletDirective.init();

		// Configure localization options
		if(null != this.drawLocal) {
			LeafletDrawUtil.deepLiteralCopy(drawLocal, this.drawLocal);
		}

		// Create the control
		this.drawControl =  new Control.Draw(this.drawOptions);

		// Add the control to the map
		this.map = this.leafletDirective.getMap();
		this.map.addControl(this.drawControl);

		// add draw event pass throughs
		this.addDrawEventHandler(Draw.Event.CREATED, (e: any) => LeafletUtil.handleEvent(this.zone, this.onDrawCreated, e));
		this.addDrawEventHandler(Draw.Event.EDITED, (e: DrawEvents.Edited) => LeafletUtil.handleEvent(this.zone, this.onDrawEdited, e));
		this.addDrawEventHandler(Draw.Event.DELETED, (e: DrawEvents.Deleted) => LeafletUtil.handleEvent(this.zone, this.onDrawDeleted, e));
		this.addDrawEventHandler(Draw.Event.DRAWSTART, (e: DrawEvents.DrawStart) => LeafletUtil.handleEvent(this.zone, this.onDrawStart, e));
		this.addDrawEventHandler(Draw.Event.DRAWSTOP, (e: DrawEvents.DrawStop) => LeafletUtil.handleEvent(this.zone, this.onDrawStop, e));
		this.addDrawEventHandler(Draw.Event.EDITSTART, (e: DrawEvents.EditStart) => LeafletUtil.handleEvent(this.zone, this.onDrawEditStart, e));
		this.addDrawEventHandler(Draw.Event.EDITMOVE, (e: DrawEvents.EditMove) => LeafletUtil.handleEvent(this.zone, this.onDrawEditMove, e));
		this.addDrawEventHandler(Draw.Event.EDITRESIZE, (e: DrawEvents.EditResize) => LeafletUtil.handleEvent(this.zone, this.onDrawEditResize, e));
		this.addDrawEventHandler(Draw.Event.EDITVERTEX, (e: DrawEvents.EditVertex) => LeafletUtil.handleEvent(this.zone, this.onDrawEditVertex, e));
		this.addDrawEventHandler(Draw.Event.EDITSTOP, (e: DrawEvents.EditStop) => LeafletUtil.handleEvent(this.zone, this.onDrawEditStop, e));
		this.addDrawEventHandler(Draw.Event.DELETESTART, (e: DrawEvents.DeleteStart) => LeafletUtil.handleEvent(this.zone, this.onDrawDeleteStart, e));
		this.addDrawEventHandler(Draw.Event.DELETESTOP, (e: DrawEvents.DeleteStop) => LeafletUtil.handleEvent(this.zone, this.onDrawDeleteStop, e));
		this.addDrawEventHandler(Draw.Event.TOOLBAROPENED, (e: DrawEvents.ToolbarOpened) => LeafletUtil.handleEvent(this.zone, this.onDrawToolbarOpened, e));
		this.addDrawEventHandler(Draw.Event.TOOLBARCLOSED, (e: DrawEvents.ToolbarClosed) => LeafletUtil.handleEvent(this.zone, this.onDrawToolbarClosed, e));

		// Notify others that the draw control has been created
		this.drawReady.emit(this.drawControl);
	}

	ngOnDestroy() {
		this.drawEventHandlers.forEach(({ event, handler }) => this.map.off(event, handler));
		this.drawEventHandlers.length = 0;
		this.map.removeControl(this.drawControl);
	}

	private addDrawEventHandler(event: string, handler: (e: any) => void) {
		this.map.on(event, handler);
		this.drawEventHandlers.push({ event, handler });
	}

	public getDrawControl() {
		return this.drawControl;
	}

}
