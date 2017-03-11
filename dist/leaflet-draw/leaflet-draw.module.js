var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { LeafletDrawDirective } from './core/leaflet-draw.directive';
var LeafletDrawModule = LeafletDrawModule_1 = (function () {
    function LeafletDrawModule() {
    }
    LeafletDrawModule.forRoot = function () {
        return { ngModule: LeafletDrawModule_1, providers: [] };
    };
    return LeafletDrawModule;
}());
LeafletDrawModule = LeafletDrawModule_1 = __decorate([
    NgModule({
        imports: [
            LeafletModule
        ],
        exports: [
            LeafletDrawDirective
        ],
        declarations: [
            LeafletDrawDirective
        ]
    })
], LeafletDrawModule);
export { LeafletDrawModule };
var LeafletDrawModule_1;
//# sourceMappingURL=leaflet-draw.module.js.map