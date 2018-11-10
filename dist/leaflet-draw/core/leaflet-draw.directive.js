import { Directive, EventEmitter, Input, NgZone, Output } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawUtil } from './leaflet-draw-util';
var LeafletDrawDirective = /** @class */ (function () {
    function LeafletDrawDirective(leafletDirective, zone) {
        this.zone = zone;
        this.drawOptions = null;
        // Configure callback function for the map
        this.drawReady = new EventEmitter();
        // Draw Events
        this.onDrawCreated = new EventEmitter();
        this.onDrawEdited = new EventEmitter();
        this.onDrawDeleted = new EventEmitter();
        this.onDrawStart = new EventEmitter();
        this.onDrawStop = new EventEmitter();
        this.onDrawVertex = new EventEmitter();
        this.onDrawEditStart = new EventEmitter();
        this.onDrawEditMove = new EventEmitter();
        this.onDrawEditResize = new EventEmitter();
        this.onDrawEditVertex = new EventEmitter();
        this.onDrawEditStop = new EventEmitter();
        this.onDrawDeleteStart = new EventEmitter();
        this.onDrawDeleteStop = new EventEmitter();
        this.onDrawToolbarOpened = new EventEmitter();
        this.onDrawToolbarClosed = new EventEmitter();
        this.onDrawMarkerContext = new EventEmitter();
        this.leafletDirective = new LeafletDirectiveWrapper(leafletDirective);
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
        { type: Directive, args: [{
                    selector: '[leafletDraw]'
                },] },
    ];
    /** @nocollapse */
    LeafletDrawDirective.ctorParameters = function () { return [
        { type: LeafletDirective, },
        { type: NgZone, },
    ]; };
    LeafletDrawDirective.propDecorators = {
        "drawOptions": [{ type: Input, args: ['leafletDrawOptions',] },],
        "drawReady": [{ type: Output, args: ['leafletDrawReady',] },],
        "onDrawCreated": [{ type: Output, args: ['leafletDrawCreated',] },],
        "onDrawEdited": [{ type: Output, args: ['leafletDrawEdited',] },],
        "onDrawDeleted": [{ type: Output, args: ['leafletDrawDeleted',] },],
        "onDrawStart": [{ type: Output, args: ['leafletDrawStart',] },],
        "onDrawStop": [{ type: Output, args: ['leafletDrawStop',] },],
        "onDrawVertex": [{ type: Output, args: ['leafletDrawVertex',] },],
        "onDrawEditStart": [{ type: Output, args: ['leafletDrawEditStart',] },],
        "onDrawEditMove": [{ type: Output, args: ['leafletDrawEditMove',] },],
        "onDrawEditResize": [{ type: Output, args: ['leafletDrawEditResize',] },],
        "onDrawEditVertex": [{ type: Output, args: ['leafletDrawEditVertex',] },],
        "onDrawEditStop": [{ type: Output, args: ['leafletDrawEditStop',] },],
        "onDrawDeleteStart": [{ type: Output, args: ['leafletDrawDeleteStart',] },],
        "onDrawDeleteStop": [{ type: Output, args: ['leafletDrawDeleteStop',] },],
        "onDrawToolbarOpened": [{ type: Output, args: ['leafletDrawToolbarOpened',] },],
        "onDrawToolbarClosed": [{ type: Output, args: ['leafletDrawToolbarClosed',] },],
        "onDrawMarkerContext": [{ type: Output, args: ['leafletDrawMarkerContext',] },],
    };
    return LeafletDrawDirective;
}());
export { LeafletDrawDirective };
//# sourceMappingURL=leaflet-draw.directive.js.map