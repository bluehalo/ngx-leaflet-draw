import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { LeafletDrawDirective } from './core/leaflet-draw.directive';
var LeafletDrawModule = (function () {
    function LeafletDrawModule() {
    }
    LeafletDrawModule.forRoot = function () {
        return { ngModule: LeafletDrawModule, providers: [] };
    };
    return LeafletDrawModule;
}());
export { LeafletDrawModule };
LeafletDrawModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    LeafletModule
                ],
                exports: [
                    LeafletDrawDirective
                ],
                declarations: [
                    LeafletDrawDirective
                ]
            },] },
];
/** @nocollapse */
LeafletDrawModule.ctorParameters = function () { return []; };
//# sourceMappingURL=leaflet-draw.module.js.map