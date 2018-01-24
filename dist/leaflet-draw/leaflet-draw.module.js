import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawDirective } from './core/leaflet-draw.directive';
var LeafletDrawModule = /** @class */ (function () {
    function LeafletDrawModule() {
    }
    LeafletDrawModule.forRoot = function () {
        return { ngModule: LeafletDrawModule, providers: [] };
    };
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
    return LeafletDrawModule;
}());
export { LeafletDrawModule };
//# sourceMappingURL=leaflet-draw.module.js.map