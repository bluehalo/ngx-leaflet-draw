import { EventEmitter, NgZone, OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';
export declare class LeafletDrawDirective implements OnChanges, OnInit {
    private zone;
    leafletDirective: LeafletDirectiveWrapper;
    drawControl: L.Control.Draw;
    featureGroup: L.FeatureGroup;
    drawOptions: L.Control.DrawConstructorOptions;
    drawReady: EventEmitter<L.Control.Draw>;
    onDrawCreated: EventEmitter<L.DrawEvents.Created>;
    onDrawEdited: EventEmitter<L.DrawEvents.Edited>;
    onDrawDeleted: EventEmitter<L.DrawEvents.Deleted>;
    onDrawStart: EventEmitter<L.DrawEvents.DrawStart>;
    onDrawStop: EventEmitter<L.DrawEvents.DrawStop>;
    onDrawVertex: EventEmitter<L.DrawEvents.DrawVertex>;
    onDrawEditStart: EventEmitter<L.DrawEvents.EditStart>;
    onDrawEditMove: EventEmitter<L.DrawEvents.EditMove>;
    onDrawEditResize: EventEmitter<L.DrawEvents.EditResize>;
    onDrawEditVertex: EventEmitter<L.DrawEvents.EditVertex>;
    onDrawEditStop: EventEmitter<L.DrawEvents.EditStop>;
    onDrawDeleteStart: EventEmitter<L.DrawEvents.DeleteStart>;
    onDrawDeleteStop: EventEmitter<L.DrawEvents.DeleteStop>;
    onDrawToolbarOpened: EventEmitter<L.DrawEvents.ToolbarOpened>;
    onDrawToolbarClosed: EventEmitter<L.DrawEvents.ToolbarClosed>;
    onDrawMarkerContext: EventEmitter<L.DrawEvents.MarkerContext>;
    constructor(leafletDirective: LeafletDirective, zone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    getDrawControl(): L.Control.Draw;
    private initializeDrawOptions(options);
}
