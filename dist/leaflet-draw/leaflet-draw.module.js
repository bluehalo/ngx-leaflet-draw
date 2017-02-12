import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { LeafletDrawDirective } from './core/leaflet-draw.directive';
var LeafletDrawModule = (function () {
    function LeafletDrawModule() {
    }
    return LeafletDrawModule;
}());
LeafletDrawModule = __decorate([
    NgModule({
        imports: [
            LeafletModule
        ],
        exports: [
            LeafletDrawDirective
        ],
        declarations: [
            LeafletDrawDirective
        ],
        providers: []
    })
], LeafletDrawModule);
export { LeafletDrawModule };

//# sourceMappingURL=leaflet-draw.module.js.map
