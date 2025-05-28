# @bluehalo/ngx-leaflet-draw

[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/Asymmetrik/ngx-leaflet-draw/
[travis-image]: https://travis-ci.org/Asymmetrik/ngx-leaflet-draw.svg

> Leaflet Draw extension to the @bluehalo/ngx-leaflet package for Angular.io
> Provides Leaflet Draw integration into Angular.io projects. Compatible with Leaflet v1.x and Leaflet Draw 1.x

> Given the lack of activity in the Leaflet.draw project, we are unlikely to extend this plugin with additional functionality beyond Angular upgrades.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)
- [Credits](#credits)

## Install

Install the package and its peer dependencies via npm (or yarn):

```shell
npm install leaflet
npm install leaflet-draw@1.0.2
npm install @bluehalo/ngx-leaflet
npm install @bluehalo/ngx-leaflet-draw
```

NOTE: I've seen some issues with `leaflet-draw@1.0.3` and `1.0.4`.
Specifically, label anchors and drawing rectangles doesn't seem to work correctly.
If you have issues, `leaflet-draw@1.0.2` seems to be the latest release without those issues.

You will need to also install the leaflet typings via npm:

```shell
npm install --save-dev @types/leaflet
npm install --save-dev @types/leaflet-draw
```

If you want to run the demo, clone the repository, perform an ```npm install```, ```npm run demo``` and then go to [http://localhost:4200](http://localhost:4200).

## Usage
Generally, the steps are:

- Install and configure [@bluehalo/ngx-leaflet](https://github.com/BlueHalo/ngx-leaflet)
- Install this library and the Leaflet-draw typings (see above).
- Import the Leaflet and Leaflet-draw stylesheet
- Import ```LeafletModule``` and ```LeafletDraw``` into your Angular project
- Create and configure a map (see docs below and/or demo)

### Import the Leaflet Stylesheet

For leaflet to work, you need to have the leaflet stylesheets loaded into your application.
If you've installed via npm, you will need to load both ```./node_modules/leaflet/dist/leaflet.css``` and ```./node_modules/leaflet-draw/dist/leaflet.draw.css```.
How you include the stylesheet will depend on your specific setup. For examples, refer to the [@bluehalo/ngx-leaflet](https://github.com/BlueHalo/ngx-leaflet) README.

If you are using Angular CLI, you will need to add the CSS files to the styles array contained in ```angular.json```:
```json
{
	...
	"styles": [
		"styles.css",
		"./node_modules/leaflet/dist/leaflet.css",
		"./node_modules/leaflet-draw/dist/leaflet.draw.css"
	],
	...
}
```

### Import LeafletModule and LeafletDrawModule

Before you can use the Leaflet components in your Angular.io app, you'll need to import it in your application.
Depending on if you're using standalone mode or not, you will import it into your modules and/or components.

```typescript
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import { LeafletDrawDirective } from '@bluehalo/ngx-leaflet-draw';

@Component({
	imports: [
		//...
		LeafletDirective,
		LeafletDrawDirective
	]
})
```

### Create and Configure a Map with the Draw Controls

To create a map, use the ```leaflet``` attribute directive. This directive must appear first.
You must specify an initial zoom/center and set of layers either via ```leafletOptions``` or by binding to ```leafletZoom```, ```leafletCenter```, and ```leafletLayers```.
Finally, add the ```leafletDraw``` attribute directive to add the leaflet draw control and configure it with ```leafletDrawOptions```.

```angular181html
<div leaflet style="height: 400px;"
     leafletDraw
     [leafletOptions]="options"
     [leafletDrawOptions]="drawOptions"
     (leafletDrawCreated)="onDrawCreated($event)">

	<div [leafletLayer]="drawnItems"></div>

</div>
```

To enable editing, you need to add a `featureGroup` to the map and pass the feature group in with the `drawOptions`.
In addition, you will need to add layers to the feature group yourself, as this will no longer happen automatically.
Both of these changes are new in `@bluehalo/ngx-leaflet-draw@6`, and were made to match default Leaflet Draw behavior.

```typescript
drawnItems: FeatureGroup = featureGroup();

drawOptions = {
	edit: {
		featureGroup: this.drawnItems
	}
};

public onDrawCreated(e: any) {
	this.drawnItems.addLayer((e as DrawEvents.Created).layer);
}
```

#### leafletDraw

This is an attribute directive that initiates the leaflet draw plugin.

#### leafletDrawOptions

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


#### leafletDrawLocal

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

### Draw Events

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

### Getting a Reference to the Draw Control

Occasionally, you may need to directly access the Leaflet Draw Control instance.
For example, to dynamically change settings or change its behavior.
There are a couple of different ways to achieve this depending on what you're trying to do.

The easiest and most flexible way is to use the output binding ```leafletDrawReady```.
This output is invoked after the map is created, the argument of the event being the ```Control.Draw``` instance.

The second is to get a reference to the leaflet draw directive itself - and there are a couple of ways to do this.
With a reference to the directive, you can invoke the ```getDrawControl()``` function to get a reference to the ```Control.Draw``` instance.

#### leafletDrawReady

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

#### Inject LeafletDrawDirective into your Component

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

### Showing and Hiding the Draw Control

If you want to toggle the draw control on and off, you can use the following approach:

```angular181html
<button (click)="shown = !shown">Show/Hide Control</button>
<div leaflet style="height: 400px;" [leafletOptions]="options">
	@if (shown) {
		<div leafletDraw [leafletDrawOptions]="drawOptions"></div>
	}
</div>
```

You can place the leafletDraw directive on a child element and then use *ngIf to add/remove the draw control from the map.
When ngIf evaluates to false, the child element is removed from the map, which destroys the control.
When it evaluates to true, the child element is added to the map, which recreates the control.

### A Note About Markers

If you are using Angular CLI or Webpack to package your project, you will need to configure the marker icon as shown in the ```leafletDrawOptions``` example above.
The issue has to do with how Leaflet handles icon image loading.
For more details on how to set this up, reference the README from [@bluehalo/ngx-leaflet](https://github.com/Bluehalo/ngx-leaflet#a-note-about-markers).

## Contribute

PRs accepted. If you are part of Bluehalo, please make contributions on feature branches off of the ```develop``` branch.
If you are outside of Bluehalo, please fork our repo to make contributions and submit PRs against ```develop```.

## License

See LICENSE in repository for details.

## Credits

**[Leaflet](http://leafletjs.com/)** Is an awesome mapping package.
**[Leaflet.draw](https://github.com/Leaflet/Leaflet.draw)** Makes drawing shapes on maps super easy.
