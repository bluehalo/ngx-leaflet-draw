import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { latLng, Map as LeafletMap, Control } from 'leaflet';
import 'leaflet-draw';
import { Draw } from 'leaflet';

import { LeafletModule } from '@bluehalo/ngx-leaflet';

import { LeafletDrawModule } from '../leaflet-draw.module';
import { LeafletDrawUtil } from './leaflet-draw.util';
import { LeafletDrawDirective } from './leaflet-draw.directive';


// ---------------------------------------------------------------------------
// Host component
// ---------------------------------------------------------------------------
@Component({
	standalone: false,
	changeDetection: ChangeDetectionStrategy.Eager,
	template: `<div leaflet
		[leafletOptions]="options"
		leafletDraw
		[leafletDrawOptions]="drawOptions"
		[leafletDrawLocal]="drawLocal"
		(leafletMapReady)="onMapReady($event)"
		(leafletDrawReady)="onDrawReady($event)">
	</div>`
})
class TestHostComponent {
	options = { zoom: 4, center: latLng(0, 0) };
	drawOptions: Control.DrawConstructorOptions = null;
	drawLocal: any = null;
	map: LeafletMap;
	drawControl: Control.Draw;
	onMapReady(m: LeafletMap) { this.map = m; }
	onDrawReady(c: Control.Draw) { this.drawControl = c; }
}


// ---------------------------------------------------------------------------
// Setup helpers
// ---------------------------------------------------------------------------
let fixture: ComponentFixture<TestHostComponent>;
let host: TestHostComponent;
let directive: LeafletDrawDirective;

function init(configFn?: (h: TestHostComponent) => void) {
	fixture = TestBed.createComponent(TestHostComponent);
	host = fixture.componentInstance;
	if (configFn) { configFn(host); }
	fixture.detectChanges();
	directive = fixture.debugElement.children[0].injector.get(LeafletDrawDirective);
}


// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('LeafletDrawDirective', () => {

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ LeafletModule, LeafletDrawModule ],
			declarations: [ TestHostComponent ]
		});
	});

	afterEach(() => {
		fixture.destroy();
	});


	// -------------------------------------------------------------------------
	// Group 1: Initialization
	// -------------------------------------------------------------------------
	describe('initialization', () => {

		it('creates and adds Control.Draw to the map', () => {
			init();
			expect(directive.drawControl).toBeTruthy();
			expect(directive.drawControl instanceof Control.Draw).toBeTrue();
		});

		it('emits the draw control via drawReady', () => {
			init();
			expect(host.drawControl).toBe(directive.drawControl);
		});

		it('getDrawControl() returns the control instance', () => {
			init();
			expect(directive.getDrawControl()).toBe(directive.drawControl);
		});

	});


	// -------------------------------------------------------------------------
	// Group 2: drawOptions input
	// -------------------------------------------------------------------------
	describe('drawOptions input', () => {

		it('passes drawOptions through to the Control.Draw instance', () => {
			init(h => h.drawOptions = { draw: { marker: false } });
			// L.setOptions merges options, so the merged result should have marker: false
			expect((directive.drawControl as any).options.draw.marker).toBe(false);
		});

	});


	// -------------------------------------------------------------------------
	// Group 3: drawLocal input
	// -------------------------------------------------------------------------
	describe('drawLocal input', () => {

		it('calls deepLiteralCopy with the provided drawLocal object', () => {
			const spy = spyOn(LeafletDrawUtil, 'deepLiteralCopy').and.callThrough();
			init(h => h.drawLocal = { draw: { toolbar: { buttons: { polyline: 'Custom Polyline' } } } });
			expect(spy).toHaveBeenCalled();
		});

		it('does not call deepLiteralCopy when drawLocal is null', () => {
			const spy = spyOn(LeafletDrawUtil, 'deepLiteralCopy').and.callThrough();
			init();
			expect(spy).not.toHaveBeenCalled();
		});

	});


	// -------------------------------------------------------------------------
	// Group 4: Draw event outputs
	// -------------------------------------------------------------------------
	describe('draw event outputs', () => {

		it('onDrawCreated emits when draw:created fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onDrawCreated.subscribe((e: any) => emitted = e);
			host.map.fire(Draw.Event.CREATED, { layerType: 'marker' });
			expect(emitted).toBeTruthy();
		});

		it('onDrawEdited emits when draw:edited fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onDrawEdited.subscribe((e: any) => emitted = e);
			host.map.fire(Draw.Event.EDITED, {});
			expect(emitted).toBeTruthy();
		});

		it('onDrawDeleted emits when draw:deleted fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onDrawDeleted.subscribe((e: any) => emitted = e);
			host.map.fire(Draw.Event.DELETED, {});
			expect(emitted).toBeTruthy();
		});

		it('onDrawStart emits when draw:drawstart fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onDrawStart.subscribe((e: any) => emitted = e);
			host.map.fire(Draw.Event.DRAWSTART, {});
			expect(emitted).toBeTruthy();
		});

		it('onDrawStop emits when draw:drawstop fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onDrawStop.subscribe((e: any) => emitted = e);
			host.map.fire(Draw.Event.DRAWSTOP, {});
			expect(emitted).toBeTruthy();
		});

		it('onDrawCanceled emits when draw:canceled fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onDrawCanceled.subscribe((e: any) => emitted = e);
			host.map.fire('draw:canceled', {});
			expect(emitted).toBeTruthy();
		});

		it('onDrawEditStart emits when draw:editstart fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onDrawEditStart.subscribe((e: any) => emitted = e);
			host.map.fire(Draw.Event.EDITSTART, {});
			expect(emitted).toBeTruthy();
		});

		it('onDrawToolbarOpened emits when draw:toolbaropened fires on the map', () => {
			init();
			let emitted: any = null;
			directive.onDrawToolbarOpened.subscribe((e: any) => emitted = e);
			host.map.fire(Draw.Event.TOOLBAROPENED, {});
			expect(emitted).toBeTruthy();
		});

	});


	// -------------------------------------------------------------------------
	// Group 5: Destruction
	// -------------------------------------------------------------------------
	describe('ngOnDestroy', () => {

		it('removes all registered event handlers from the map', () => {
			init();
			// Verify handlers exist before destroy
			expect((directive as any).drawEventHandlers.length).toBe(17);
			directive.ngOnDestroy();
			// All handlers must be removed and the array cleared
			expect((directive as any).drawEventHandlers.length).toBe(0);
		});

		it('removes the draw control from the map', () => {
			init();
			const removeControlSpy = spyOn(host.map, 'removeControl').and.callThrough();
			const control = directive.drawControl;
			directive.ngOnDestroy();
			expect(removeControlSpy).toHaveBeenCalledWith(control);
		});

	});

});
