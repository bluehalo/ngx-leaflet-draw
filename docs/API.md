# @bluehalo/ngx-leaflet-draw — API Reference

> Full API reference. For installation and quick-start usage, see the [README](../README.md).

## leafletDraw

This is an attribute directive that initiates the leaflet draw plugin.

## leafletDrawOptions

Input binding for the options to be passed to the draw plugin upon creation.
These options are only currently processed at creation time.
Note that we've included manual configuration of markers to get the icons working correctly. 

```typescript
drawOptions = {
	position: 'topright',
	draw: {
		marker: {
			icon: icon({
				...Icon.Default.prototype.options,
				iconSize: [ 25, 41 ],
				iconAnchor: [ 13, 41 ],
				iconUrl: 'assets/marker-icon.png',
				iconRetinaUrl: 'assets/marker-icon-2x.png',
				shadowUrl: 'assets/marker-shadow.png'
			})
		},
		polyline: false,
		circle: {
			shapeOptions: {
				color: '#d4af37'
			}
		},
		rectangle: {
			shapeOptions: {
				color: '#85bb65'
			}
		}
	},
	edit: {
		featureGroup: this.drawnItems
	}
};
```

The options object is passed through to the Leaflet.draw object.
Therefore, you can reference [their documentation](https://github.com/Leaflet/Leaflet.draw) for help configuring the draw control.


## leafletDrawLocal

This object is copied into `L.drawLocal` to set localization options.
These settings are only applied at creation time.

```typescript
drawLocal: any = {
	draw: {
		toolbar: {
			buttons: {
				polygon: 'Draw an awesome polygon!'
			}
		}
	}
};
```

## Draw Events

This leaflet draw plugin exposes the `L.Draw.Event`s found in the [leaflet draw documentation](http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event).
For a working example, check out the the demo.

The following events are provided:

- ```(leafletDrawCreated)```
- ```(leafletDrawEdited)```
- ```(leafletDrawDeleted)```
- ```(leafletDrawStart)```
- ```(leafletDrawStop)```
- ```(leafletDrawVertex)```
- ```(leafletDrawEditStart)```
- ```(leafletDrawEditMove)```
- ```(leafletDrawEditResize)```
- ```(leafletDrawEditVertex)```
- ```(leafletDrawEditStop)```
- ```(leafletDrawDeleteStart)```
- ```(leafletDrawDeleteStop)```
- ```(leafletDrawToolbarOpened)```
- ```(leafletDrawToolbarClosed)```
- ```(leafletDrawMarkerContext)```

## Getting a Reference to the Draw Control

Occasionally, you may need to directly access the Leaflet Draw Control instance.
For example, to dynamically change settings or change its behavior.
There are a couple of different ways to achieve this depending on what you're trying to do.

The easiest and most flexible way is to use the output binding ```leafletDrawReady```.
This output is invoked after the map is created, the argument of the event being the ```Control.Draw``` instance.

The second is to get a reference to the leaflet draw directive itself - and there are a couple of ways to do this.
With a reference to the directive, you can invoke the ```getDrawControl()``` function to get a reference to the ```Control.Draw``` instance.

### leafletDrawReady

This output is emitted when once when the Leaflet Draw Control is initially created inside of the Leaflet Draw directive.
The event will only fire when the Control exists and is ready for manipulation.

```angular181html
<div leaflet
     leafletDraw
     [leafletOptions]="options"
     [leafletDrawOptions]="drawOptions"
     (leafletDrawReady)="onDrawReady($event)">
</div>
```

```typescript
onDrawReady(drawControl: Draw.Control) {
	// Do stuff with map
}
```

This method of getting the draw control makes the most sense if you are using the Leaflet directive inside your own component
and just need to add some limited functionality or register some event handlers.

### Inject LeafletDrawDirective into your Component

In Angular.io, directives are injectable the same way that Services are.
This means that you can create your own component or directive and inject the ```LeafletDrawDirective``` into it.
This will only work if your custom component/directive exists on the same DOM element and is ordered after the injected LeafletDrawDirective, or if it is on a child DOM element.

```angular181html
<!-- On the same DOM element -->
<div leaflet leafletDraw myCustomDirective></div>

<!-- On a child DOM element -->
<div leaflet leafletDraw>
	<div myCustomDirective></div>
</div>
```

```typescript
@Directive({
   selector: '[myCustomDirective]'
})
export class MyCustomDirective {
	readonly #leafletDrawDirective = inject(LeafletDrawDirective);

	someFunction() {
		if (null !== this.#leafletDrawDirective.getDrawControl()) {
			// Do stuff with the draw control
		}
	}
}
```

The benefit of this approach is it's a bit cleaner if you're interested in adding some reusable capability to the existing leaflet draw directive.
