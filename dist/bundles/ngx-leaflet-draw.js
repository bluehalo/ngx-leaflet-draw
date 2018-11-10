/*! @asymmetrik/ngx-leaflet-draw - 3.1.0 - Copyright Asymmetrik, Ltd. 2007-2018 - All Rights Reserved. + */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@asymmetrik/ngx-leaflet'), require('leaflet'), require('leaflet-draw')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@asymmetrik/ngx-leaflet', 'leaflet', 'leaflet-draw'], factory) :
	(factory((global.ngxLeafletDraw = {}),global.ng.core,global.ngxLeaflet,global.L));
}(this, (function (exports,core,ngxLeaflet,L) { 'use strict';

var LeafletDrawUtil = /** @class */ (function () {
    function LeafletDrawUtil() {
    }
    LeafletDrawUtil.handleEvent = function (zone, eventEmitter, event) {
        // Don't want to emit if there are no observers
        if (0 < eventEmitter.observers.length) {
            zone.run(function () {
                eventEmitter.emit(event);
            });
        }
    };
    return LeafletDrawUtil;
}());

var LeafletDrawDirective = /** @class */ (function () {
    function LeafletDrawDirective(leafletDirective, zone) {
        this.zone = zone;
        this.drawOptions = null;
        // Configure callback function for the map
        this.drawReady = new core.EventEmitter();
        // Draw Events
        this.onDrawCreated = new core.EventEmitter();
        this.onDrawEdited = new core.EventEmitter();
        this.onDrawDeleted = new core.EventEmitter();
        this.onDrawStart = new core.EventEmitter();
        this.onDrawStop = new core.EventEmitter();
        this.onDrawVertex = new core.EventEmitter();
        this.onDrawEditStart = new core.EventEmitter();
        this.onDrawEditMove = new core.EventEmitter();
        this.onDrawEditResize = new core.EventEmitter();
        this.onDrawEditVertex = new core.EventEmitter();
        this.onDrawEditStop = new core.EventEmitter();
        this.onDrawDeleteStart = new core.EventEmitter();
        this.onDrawDeleteStop = new core.EventEmitter();
        this.onDrawToolbarOpened = new core.EventEmitter();
        this.onDrawToolbarClosed = new core.EventEmitter();
        this.onDrawMarkerContext = new core.EventEmitter();
        this.leafletDirective = new ngxLeaflet.LeafletDirectiveWrapper(leafletDirective);
    }
    LeafletDrawDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.leafletDirective.init();
        // Initialize the draw options (in case they weren't provided)
        this.drawOptions = this.initializeDrawOptions(this.drawOptions);
        // Create the control
        this.drawControl = new L.Control.Draw(this.drawOptions);
        // Pull out the feature group for convenience
        this.featureGroup = this.drawOptions.edit.featureGroup;
        // Add the control to the map
        this.leafletDirective.getMap().addControl(this.drawControl);
        // Register the main handler for events coming from the draw plugin
        var map = this.leafletDirective.getMap();
        map.on(L.Draw.Event.CREATED, function (e) {
            var layer = e.layer;
            _this.featureGroup.addLayer(layer);
            LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawCreated, e);
        });
        // add draw event pass throughs
        map.on(L.Draw.Event.EDITED, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawEdited, e); });
        map.on(L.Draw.Event.DELETED, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawDeleted, e); });
        map.on(L.Draw.Event.DRAWSTART, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawStart, e); });
        map.on(L.Draw.Event.DRAWSTOP, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawStop, e); });
        map.on(L.Draw.Event.EDITSTART, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawEditStart, e); });
        map.on(L.Draw.Event.EDITMOVE, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawEditMove, e); });
        map.on(L.Draw.Event.EDITRESIZE, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawEditResize, e); });
        map.on(L.Draw.Event.EDITVERTEX, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawEditVertex, e); });
        map.on(L.Draw.Event.EDITSTOP, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawEditStop, e); });
        map.on(L.Draw.Event.DELETESTART, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawDeleteStart, e); });
        map.on(L.Draw.Event.DELETESTOP, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawDeleteStop, e); });
        map.on(L.Draw.Event.TOOLBAROPENED, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawToolbarOpened, e); });
        map.on(L.Draw.Event.TOOLBARCLOSED, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.onDrawToolbarClosed, e); });
        // Notify others that the draw control has been created
        this.drawReady.emit(this.drawControl);
    };
    LeafletDrawDirective.prototype.ngOnDestroy = function () {
        this.leafletDirective.getMap().removeControl(this.drawControl);
    };
    LeafletDrawDirective.prototype.ngOnChanges = function (changes) {
        // No changes being handled currently
    };
    LeafletDrawDirective.prototype.getDrawControl = function () {
        return this.drawControl;
    };
    LeafletDrawDirective.prototype.initializeDrawOptions = function (options) {
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
    };
    LeafletDrawDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[leafletDraw]'
                },] },
    ];
    /** @nocollapse */
    LeafletDrawDirective.ctorParameters = function () { return [
        { type: ngxLeaflet.LeafletDirective, },
        { type: core.NgZone, },
    ]; };
    LeafletDrawDirective.propDecorators = {
        "drawOptions": [{ type: core.Input, args: ['leafletDrawOptions',] },],
        "drawReady": [{ type: core.Output, args: ['leafletDrawReady',] },],
        "onDrawCreated": [{ type: core.Output, args: ['leafletDrawCreated',] },],
        "onDrawEdited": [{ type: core.Output, args: ['leafletDrawEdited',] },],
        "onDrawDeleted": [{ type: core.Output, args: ['leafletDrawDeleted',] },],
        "onDrawStart": [{ type: core.Output, args: ['leafletDrawStart',] },],
        "onDrawStop": [{ type: core.Output, args: ['leafletDrawStop',] },],
        "onDrawVertex": [{ type: core.Output, args: ['leafletDrawVertex',] },],
        "onDrawEditStart": [{ type: core.Output, args: ['leafletDrawEditStart',] },],
        "onDrawEditMove": [{ type: core.Output, args: ['leafletDrawEditMove',] },],
        "onDrawEditResize": [{ type: core.Output, args: ['leafletDrawEditResize',] },],
        "onDrawEditVertex": [{ type: core.Output, args: ['leafletDrawEditVertex',] },],
        "onDrawEditStop": [{ type: core.Output, args: ['leafletDrawEditStop',] },],
        "onDrawDeleteStart": [{ type: core.Output, args: ['leafletDrawDeleteStart',] },],
        "onDrawDeleteStop": [{ type: core.Output, args: ['leafletDrawDeleteStop',] },],
        "onDrawToolbarOpened": [{ type: core.Output, args: ['leafletDrawToolbarOpened',] },],
        "onDrawToolbarClosed": [{ type: core.Output, args: ['leafletDrawToolbarClosed',] },],
        "onDrawMarkerContext": [{ type: core.Output, args: ['leafletDrawMarkerContext',] },],
    };
    return LeafletDrawDirective;
}());

var LeafletDrawModule = /** @class */ (function () {
    function LeafletDrawModule() {
    }
    LeafletDrawModule.forRoot = function () {
        return { ngModule: LeafletDrawModule, providers: [] };
    };
    LeafletDrawModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        ngxLeaflet.LeafletModule
                    ],
                    exports: [
                        LeafletDrawDirective
                    ],
                    declarations: [
                        LeafletDrawDirective
                    ]
                },] },
    ];
    return LeafletDrawModule;
}());

exports.LeafletDrawModule = LeafletDrawModule;
exports.LeafletDrawDirective = LeafletDrawDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-leaflet-draw.js.map
