import { NgModule } from '@angular/core';

import { LeafletModule } from '@asymmetrik/angular2-leaflet';

import { LeafletDrawDirective } from './core/leaflet-draw.directive';

@NgModule({
	imports: [
		LeafletModule
	],
	exports: [
		LeafletDrawDirective
	],
	declarations: [
		LeafletDrawDirective
	],
	providers: [
	]
})
export class LeafletDrawModule { }
