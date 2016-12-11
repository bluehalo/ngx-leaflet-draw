/// <reference types="leaflet" />
/// <reference types="leaflet-draw" />
import { OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import { LeafletDirective } from '@asymmetrik/angular2-leaflet';
export declare class LeafletDrawDirective implements OnChanges, OnInit {
    leafletDirective: LeafletDirective;
    map: L.Map;
    drawControl: L.Control.Draw;
    featureGroup: L.FeatureGroup;
    drawOptions: L.Control.IDrawConstructorOptions;
    constructor(leafletDirective: LeafletDirective);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    initializeDrawOptions(options: L.Control.IDrawConstructorOptions): L.Control.IDrawConstructorOptions;
}
