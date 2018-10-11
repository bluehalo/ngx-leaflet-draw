import { Directive, EventEmitter, Input, Output, NgZone } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { LeafletDirective, LeafletDirectiveWrapper } from '@asymmetrik/ngx-leaflet';
// ngx-leaflet doesnt export leaflet util, so duplicating the handleEvent function here.
var 
// ngx-leaflet doesnt export leaflet util, so duplicating the handleEvent function here.
LeafletDrawUtil = /** @class */ (function () {
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
// ngx-leaflet doesnt export leaflet util, so duplicating the handleEvent function here.
export { LeafletDrawUtil };
var LeafletDrawDirective = /** @class */ (function () {
    function LeafletDrawDirective(leafletDirective, zone) {
        this.zone = zone;
        this.drawOptions = null;
        // Configure callback function for the map
        this.drawReady = new EventEmitter();
        // Draw Events
        this.drawCreated = new EventEmitter();
        this.drawEdited = new EventEmitter();
        this.drawDeleted = new EventEmitter();
        this.drawStart = new EventEmitter();
        this.drawStop = new EventEmitter();
        this.drawVertex = new EventEmitter();
        this.drawEditStart = new EventEmitter();
        this.drawEditMove = new EventEmitter();
        this.drawEditResize = new EventEmitter();
        this.drawEditVertex = new EventEmitter();
        this.drawEditStop = new EventEmitter();
        this.drawDeleteStart = new EventEmitter();
        this.drawDeleteStop = new EventEmitter();
        this.drawToolbarOpened = new EventEmitter();
        this.drawToolbarClosed = new EventEmitter();
        this.drawMarkerContext = new EventEmitter();
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
            LeafletDrawUtil.handleEvent(_this.zone, _this.drawCreated, e);
        });
        // add draw event pass throughs
        map.on(L.Draw.Event.EDITED, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawEdited, e); });
        map.on(L.Draw.Event.DELETED, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawDeleted, e); });
        map.on(L.Draw.Event.DRAWSTART, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawStart, e); });
        map.on(L.Draw.Event.DRAWSTOP, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawStop, e); });
        map.on(L.Draw.Event.EDITSTART, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawEditStart, e); });
        map.on(L.Draw.Event.EDITMOVE, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawEditMove, e); });
        map.on(L.Draw.Event.EDITRESIZE, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawEditResize, e); });
        map.on(L.Draw.Event.EDITVERTEX, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawEditVertex, e); });
        map.on(L.Draw.Event.EDITSTOP, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawEditStop, e); });
        map.on(L.Draw.Event.DELETESTART, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawDeleteStart, e); });
        map.on(L.Draw.Event.DELETESTOP, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawDeleteStop, e); });
        map.on(L.Draw.Event.TOOLBAROPENED, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawToolbarOpened, e); });
        map.on(L.Draw.Event.TOOLBARCLOSED, function (e) { return LeafletDrawUtil.handleEvent(_this.zone, _this.drawToolbarClosed, e); });
        // map.on(L.Draw.Event.TOOLBARCONTEXT, (e: L.DrawEvents.MarkerContext) => LeafletDrawUtil.handleEvent(this.zone, this.drawMarkerContext, e));
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
        "drawCreated": [{ type: Output, args: ['drawCreated',] },],
        "drawEdited": [{ type: Output, args: ['drawEdited',] },],
        "drawDeleted": [{ type: Output, args: ['drawDeleted',] },],
        "drawStart": [{ type: Output, args: ['drawStart',] },],
        "drawStop": [{ type: Output, args: ['drawStop',] },],
        "drawVertex": [{ type: Output, args: ['drawVertex',] },],
        "drawEditStart": [{ type: Output, args: ['drawEditStart',] },],
        "drawEditMove": [{ type: Output, args: ['drawEditMove',] },],
        "drawEditResize": [{ type: Output, args: ['drawEditResize',] },],
        "drawEditVertex": [{ type: Output, args: ['drawEditVertex',] },],
        "drawEditStop": [{ type: Output, args: ['drawEditStop',] },],
        "drawDeleteStart": [{ type: Output, args: ['drawDeleteStart',] },],
        "drawDeleteStop": [{ type: Output, args: ['drawDeleteStop',] },],
        "drawToolbarOpened": [{ type: Output, args: ['drawToolbarOpened',] },],
        "drawToolbarClosed": [{ type: Output, args: ['drawToolbarClosed',] },],
        "drawMarkerContext": [{ type: Output, args: ['drawMarkerContext',] },],
    };
    return LeafletDrawDirective;
}());
export { LeafletDrawDirective };
//# sourceMappingURL=leaflet-draw.directive.js.map