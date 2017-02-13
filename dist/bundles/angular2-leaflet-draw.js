/*! @asymmetrik/angular2-leaflet-draw-1.1.1 - Copyright Asymmetrik, Ltd. 2007-2017 - All Rights Reserved.*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@asymmetrik/angular2-leaflet'), require('leaflet')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@asymmetrik/angular2-leaflet', 'leaflet'], factory) :
	(factory((global.angular2LeafletDraw = global.angular2LeafletDraw || {}),global.ng.core,global.angular2Leaflet,global.L));
}(this, (function (exports,_angular_core,_asymmetrik_angular2Leaflet,L) { 'use strict';

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LeafletDrawDirective = (function () {
    function LeafletDrawDirective(leafletDirective) {
        this.drawOptions = null;
        this.leafletDirective = new _asymmetrik_angular2Leaflet.LeafletDirectiveWrapper(leafletDirective);
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
        this.leafletDirective.getMap().on(L.Draw.Event.CREATED, function (e) {
            var layer = e.layer;
            _this.featureGroup.addLayer(layer);
        });
    };
    LeafletDrawDirective.prototype.ngOnChanges = function (changes) {
        // No changes being handled currently
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
    return LeafletDrawDirective;
}());
__decorate$1([
    _angular_core.Input('leafletDrawOptions'),
    __metadata("design:type", Object)
], LeafletDrawDirective.prototype, "drawOptions", void 0);
LeafletDrawDirective = __decorate$1([
    _angular_core.Directive({
        selector: '[leafletDraw]'
    }),
    __metadata("design:paramtypes", [_asymmetrik_angular2Leaflet.LeafletDirective])
], LeafletDrawDirective);

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.LeafletDrawModule = (function () {
    function LeafletDrawModule() {
    }
    return LeafletDrawModule;
}());
exports.LeafletDrawModule = __decorate([
    _angular_core.NgModule({
        imports: [
            _asymmetrik_angular2Leaflet.LeafletModule
        ],
        exports: [
            LeafletDrawDirective
        ],
        declarations: [
            LeafletDrawDirective
        ],
        providers: []
    })
], exports.LeafletDrawModule);

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular2-leaflet-draw.js.map
