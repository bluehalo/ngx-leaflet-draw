import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { LeafletDrawModule } from '../../../leaflet-draw/leaflet-draw.module';

import { LeafletDrawDemoComponent } from './leaflet-draw-demo.component';
import { LeafletDrawCoreDemoComponent } from './core/core-demo.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,

		LeafletModule.forRoot(),
		LeafletDrawModule.forRoot()
	],
	declarations: [
		LeafletDrawDemoComponent,
		LeafletDrawCoreDemoComponent
	],
	exports: [
		LeafletDrawDemoComponent
	],
	bootstrap: [ LeafletDrawDemoComponent ],
	providers: [ ]
})
export class LeafletDrawDemoModule { }
