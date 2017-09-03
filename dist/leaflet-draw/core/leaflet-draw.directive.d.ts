import { OnChanges, OnInit, SimpleChange } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';
export declare class LeafletDrawDirective implements OnChanges, OnInit {
    leafletDirective: LeafletDirectiveWrapper;
    drawControl: L.Control.Draw;
    featureGroup: L.FeatureGroup;
    drawOptions: L.Control.DrawConstructorOptions;
    constructor(leafletDirective: LeafletDirective);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    initializeDrawOptions(options: L.Control.DrawConstructorOptions): L.Control.DrawConstructorOptions;
}
