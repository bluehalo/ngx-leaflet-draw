/// <reference types="leaflet-draw" />
/// <reference types="leaflet" />
import { OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/angular2-leaflet';
export declare class LeafletDrawDirective implements OnChanges, OnInit {
    leafletDirective: LeafletDirectiveWrapper;
    drawControl: L.Control.Draw;
    featureGroup: L.FeatureGroup;
    drawOptions: L.Control.DrawConstructorOptions;
    constructor(leafletDirective: LeafletDirective);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    initializeDrawOptions(options: L.Control.DrawConstructorOptions): L.Control.DrawConstructorOptions;
}
