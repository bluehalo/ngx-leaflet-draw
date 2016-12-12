"use strict";
var core_1 = require('@angular/core');
var angular2_leaflet_1 = require('@asymmetrik/angular2-leaflet');
var leaflet_draw_directive_1 = require('./core/leaflet-draw.directive');
var LeafletDrawModule = (function () {
    function LeafletDrawModule() {
    }
    LeafletDrawModule = __decorate([
        core_1.NgModule({
            imports: [
                angular2_leaflet_1.LeafletModule
            ],
            exports: [
                leaflet_draw_directive_1.LeafletDrawDirective
            ],
            declarations: [
                leaflet_draw_directive_1.LeafletDrawDirective
            ],
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], LeafletDrawModule);
    return LeafletDrawModule;
}());
exports.LeafletDrawModule = LeafletDrawModule;

//# sourceMappingURL=leaflet-draw.module.js.map
