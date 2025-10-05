import { NgModule } from '@angular/core';

import { LeafletModule } from '@bluehalo/ngx-leaflet';

import { LeafletDrawDirective } from './core/leaflet-draw.directive';

@NgModule({
    imports: [
        LeafletModule,
        LeafletDrawDirective
    ],
    exports: [
        LeafletDrawDirective
    ]
})
export class LeafletDrawModule {

}
