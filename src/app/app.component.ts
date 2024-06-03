import { Component } from '@angular/core';
import { LeafletDrawDemoModule } from './leaflet-draw/leaflet-draw-demo.module';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [ LeafletDrawDemoModule ],
	templateUrl: './app.component.html'
})
export class AppComponent {
	// Empty component
}
