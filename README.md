# @asymmetrik/ngx-leaflet-draw

[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/Asymmetrik/ngx-leaflet-draw/
[travis-image]: https://travis-ci.org/Asymmetrik/ngx-leaflet-draw.svg

*IMPORTANT NOTE: We have renamed this package from ```@asymmetrik/angular2-leaflet-draw``` to ```@asymmetrik/ngx-leaflet-draw```*

> Leaflet Draw extension to the @asymmetrik/ngx-leaflet package for Angular.io
> Provides Leaflet Draw integration into Angular.io projects. Compatible with Leaflet v1.x and Leaflet Draw 1.x

> Now supports Angular v10, Ahead-of-Time compilation (AOT), and use in Angular-CLI based projects
> Given the lack of activity in the Leaflet.draw project, we are unlikely to extent this plugin with additional functionality beyond Angular upgrades.

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
npm install leaflet-draw
npm install @asymmetrik/ngx-leaflet
npm install @asymmetrik/ngx-leaflet-draw
```

If you intend to use this library in a typescript project (utilizing the typings), you will need to also install the leaflet typings via npm:

```shell
npm install --save-dev @types/leaflet
npm install --save-dev @types/leaflet-draw
```

If you want to run the demo, clone the repository, perform an ```npm install```, ```npm run demo``` and then go to [http://localhost:4200](http://localhost:4200).

## Usage

To use this library, there are a handful of setup steps to go through that vary based on your app environment (e.g., Webpack, ngCli, SystemJS, etc.).
Generally, the steps are:

- Follow the instructions to install and configure [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet)
- Install this library and the Leaflet-draw typings (see above).
- Import the Leaflet and Leaflet-draw stylesheet
- Import the ngx-leaflet and ngx-leaflet-draw modules into your Angular project
- Create and configure a map (see docs below and/or demo)

### Import the Leaflet Stylesheet

For leaflet to work, you need to have the leaflet stylesheets loaded into your application.
If you've installed via npm, you will need to load ```./node_modules/leaflet/dist/leaflet.css``` and ```./node_modules/leaflet-draw/dist/leaflet.draw.css```.
How you include the stylesheet will depend on your specific setup. For examples, refer to the [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet) README

### Import Code Dependencies and Module

This project is exported using UMD and it includes typings.
So, you shouldn't have to do anything special to use it if you're building your project in Typescript.

#### Typescript Angular.io Module Import

Before you can use the module in your Angular.io app, you'll need to import it in your application.
Note that you also need to import the ngx-leaflet module as well.

For example, in your ```app.module.ts```, add:

```js
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';

...
imports: [
	...
	LeafletModule,
	LeafletDrawModule
]
...
```

#### Not Using Typescript?

You brave soul.
The code is exported using UMD (bundles are in the ./dist dir) so you should be able to import is using whatever module system/builder you're using, even if you aren't using Typescript.

### Create and Configure a Map with the Draw Controls

To create a map, use the ```leaflet``` attribute directive. This directive must appear first.
You must specify an initial zoom/center and set of layers either via ```leafletOptions``` or by binding to ```leafletZoom```, ```leafletCenter```, and ```leafletLayers```.
Finally, add the ```leafletDraw``` attribute directive to add the leaflet draw control and configure it with ```leafletDrawOptions```.

```html
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
Both of these changes are new in `@asymmetrik/ngx-leaflet-draw@6`, and were made to match default Leaflet Draw behavior.

```js
drawItems: FeatureGroup = featureGroup();

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

```js
drawOptions = {
	position: 'topright',
	draw: {
		marker: {
			icon: L.icon({
				iconSize: [ 25, 41 ],
				iconAnchor: [ 13, 41 ],
				iconUrl: '2b3e1faf89f94a4835397e7a43b4f77d.png',
				iconRetinaUrl: '680f69f3c2e6b90c1812a813edf67fd7.png',
				shadowUrl: 'a0c6cc1401c107b501efee6477816891.png'
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

```js
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

```html
<div leaflet
     leafletDraw
     [leafletOptions]="options"
     [leafletDrawOptions]="drawOptions"
     (leafletDrawReady)="onDrawReady($event)">
</div>
```

```js
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

```html
<!-- On the same DOM element -->
<div leaflet leafletDraw myCustomDirective>
</div>

<!-- On a child DOM element -->
<div leaflet leafletDraw>
	<div myCustomDirective></div>
</div>
```

```js
@Directive({
   selector: '[myCustomDirective]'
})
export class MyCustomDirective {
	leafletDrawDirective: LeafletDrawDirective;

	constructor(leafletDrawDirective: LeafletDrawDirective) {
		this.leafletDrawDirective = leafletDrawDirective;
	}

	someFunction() {
		if (null != this.leafletDrawDirective.getDrawControl()) {
			// Do stuff with the draw control
		}
	}
}
```

The benefit of this approach is it's a bit cleaner if you're interested in adding some reusable capability to the existing leaflet draw directive.

### Showing and Hiding the Draw Control

If you want to toggle the draw control on and off, you can use the following approach:

```html
<button (click)="shown = !shown">Show/Hide Control</button>
<div leaflet style="height: 400px;"
     [leafletOptions]="options">

	<div *ngIf="shown"
	     leafletDraw
	     [leafletDrawOptions]="drawOptions"></div>
</div>
```

You can place the leafletDraw directive on a child element and then use *ngIf to add/remove the draw control from the map.
When ngIf evaluates to false, the child element is removed from the map, which destroys the control.
When it evaluates to true, the child element is added to the map, which recreates the control.

### A Note About Markers

If you are using Angular CLI or Webpack to package your project, you will need to configure the marker icon as shown in the ```leafletDrawOptions``` example above.
The issue has to do with how Leaflet handles icon image loading.
For more details on how to set this up, reference the README from [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet#a-note-about-markers).

### A Note About Angular CLI 8/9+

There's a documented issue w/Leaflet Draw in Angular CLI v8+ projects.
Now that the build target is "es2015" (in tsconfig.json), there's a bug in Leaflet.draw that causes an error when you use the rectangle draw tool.
The workaround is to change the target back to "es5".

## Contribute

PRs accepted. If you are part of Asymmetrik, please make contributions on feature branches off of the ```develop``` branch.
If you are outside of Asymmetrik, please fork our repo to make contributions and submit PRs against ```develop```.

## License

See LICENSE in repository for details.

## Credits

**[Leaflet](http://leafletjs.com/)** Is an awesome mapping package.
**[Leaflet.draw](https://github.com/Leaflet/Leaflet.draw)** Makes drawing shapes on maps super easy.
