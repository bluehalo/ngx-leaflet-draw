"use strict";
var core_1 = require('@angular/core');
var L = require('leaflet');
var angular2_leaflet_1 = require('@asymmetrik/angular2-leaflet');
var LeafletDrawDirective = (function () {
    function LeafletDrawDirective(leafletDirective) {
        this.drawOptions = null;
        this.leafletDirective = leafletDirective;
    }
    LeafletDrawDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.map = this.leafletDirective.getMap();
        // Initialize the draw options (in case they weren't provided)
        this.drawOptions = this.initializeDrawOptions(this.drawOptions);
        // Create the control
        this.drawControl = new L.Control.Draw(this.drawOptions);
        // Pull out the feature group for convenience
        this.featureGroup = this.drawOptions.edit.featureGroup;
        // Add the control to the map
        this.map.addControl(this.drawControl);
        // Register the main handler for events coming from the draw plugin
        this.map.on(L.Draw.Event.CREATED, function (e) {
            var layer = e.layer;
            _this.featureGroup.addLayer(layer);
        });
    };
    LeafletDrawDirective.prototype.ngOnChanges = function (changes) {
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
            this.map.addLayer(options.edit.featureGroup);
        }
        return options;
    };
    __decorate([
        core_1.Input('leafletDrawOptions'), 
        __metadata('design:type', Object)
    ], LeafletDrawDirective.prototype, "drawOptions", void 0);
    LeafletDrawDirective = __decorate([
        core_1.Directive({
            selector: '[leaflet-draw]'
        }), 
        __metadata('design:paramtypes', [angular2_leaflet_1.LeafletDirective])
    ], LeafletDrawDirective);
    return LeafletDrawDirective;
}());
exports.LeafletDrawDirective = LeafletDrawDirective;

//# sourceMappingURL=leaflet-draw.directive.js.map
