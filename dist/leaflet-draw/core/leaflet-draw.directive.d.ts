import { EventEmitter, OnChanges, OnInit, SimpleChange, NgZone } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';
export declare class LeafletDrawUtil {
    static handleEvent<T>(zone: NgZone, eventEmitter: EventEmitter<T>, event: T): void;
}
export declare class LeafletDrawDirective implements OnChanges, OnInit {
    private zone;
    leafletDirective: LeafletDirectiveWrapper;
    drawControl: L.Control.Draw;
    featureGroup: L.FeatureGroup;
    drawOptions: L.Control.DrawConstructorOptions;
    drawReady: EventEmitter<L.Control.Draw>;
    drawCreated: EventEmitter<L.DrawEvents.Created>;
    drawEdited: EventEmitter<L.DrawEvents.Edited>;
    drawDeleted: EventEmitter<L.DrawEvents.Deleted>;
    drawStart: EventEmitter<L.DrawEvents.DrawStart>;
    drawStop: EventEmitter<L.DrawEvents.DrawStop>;
    drawVertex: EventEmitter<L.DrawEvents.DrawVertex>;
    drawEditStart: EventEmitter<L.DrawEvents.EditStart>;
    drawEditMove: EventEmitter<L.DrawEvents.EditMove>;
    drawEditResize: EventEmitter<L.DrawEvents.EditResize>;
    drawEditVertex: EventEmitter<L.DrawEvents.EditVertex>;
    drawEditStop: EventEmitter<L.DrawEvents.EditStop>;
    drawDeleteStart: EventEmitter<L.DrawEvents.DeleteStart>;
    drawDeleteStop: EventEmitter<L.DrawEvents.DeleteStop>;
    drawToolbarOpened: EventEmitter<L.DrawEvents.ToolbarOpened>;
    drawToolbarClosed: EventEmitter<L.DrawEvents.ToolbarClosed>;
    drawMarkerContext: EventEmitter<L.DrawEvents.MarkerContext>;
    constructor(leafletDirective: LeafletDirective, zone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    getDrawControl(): L.Control.Draw;
    private initializeDrawOptions(options);
}
