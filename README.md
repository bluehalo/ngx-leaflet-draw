# @bluehalo/ngx-leaflet-draw

[![NPM version](npm-image)](npm-url)
[![Build Status][ci-image]][ci-url]
[![Code Coverage][coverage-image]][coverage-url]

[npm-url]: https://www.npmjs.com/package/@bluehalo/ngx-leaflet-draw
[npm-image]: https://img.shields.io/npm/v/%40bluehalo%2Fngx-leaflet-draw
[ci-url]: https://github.com/bluehalo/ngx-leaflet-draw/actions/workflows/ci.yml
[ci-image]: https://github.com/bluehalo/ngx-leaflet-draw/actions/workflows/ci.yml/badge.svg
[coverage-url]: https://codecov.io/gh/bluehalo/ngx-leaflet-draw
[coverage-image]: https://codecov.io/gh/bluehalo/ngx-leaflet-draw/graph/badge.svg

> Leaflet Draw extension to the @bluehalo/ngx-leaflet package for Angular.io
> Provides Leaflet Draw integration into Angular.io projects. Compatible with Leaflet v1.x and Leaflet Draw 1.x

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](docs/API.md)
- [Cookbook](docs/cookbook.md)
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

- Install and configure [@bluehalo/ngx-leaflet](https://github.com/bluehalo/ngx-leaflet)
- Install this library and the Leaflet-draw typings (see above).
- Import the Leaflet and Leaflet-draw stylesheet
- Import ```LeafletModule``` and ```LeafletDraw``` into your Angular project
- Create and configure a map (see docs below and/or demo)

### Import the Leaflet Stylesheet

For leaflet to work, you need to have the leaflet stylesheets loaded into your application.
If you've installed via npm, you will need to load both ```./node_modules/leaflet/dist/leaflet.css``` and ```./node_modules/leaflet-draw/dist/leaflet.draw.css```.
How you include the stylesheet will depend on your specific setup. For examples, refer to the [@bluehalo/ngx-leaflet](https://github.com/bluehalo/ngx-leaflet) README.

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
import { LeafletDirective, LeafletLayerDirective } from '@bluehalo/ngx-leaflet';
import { LeafletDrawDirective } from '@bluehalo/ngx-leaflet-draw';

@Component({
	imports: [
		//...
		LeafletDirective,
		LeafletLayerDirective,
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
import { DrawEvents, FeatureGroup, featureGroup, icon } from 'leaflet';

drawnItems: FeatureGroup = featureGroup();

drawOptions = {
	draw: {
		marker: {
			icon: icon({
				iconSize: [ 25, 41 ],
				iconAnchor: [ 13, 41 ],
				iconUrl: 'assets/leaflet/marker-icon.png',
				iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
				shadowUrl: 'assets/leaflet/marker-shadow.png'
			})
		}
	},
	edit: {
		featureGroup: this.drawnItems
	}
};

public onDrawCreated(e: any) {
	this.drawnItems.addLayer((e as DrawEvents.Created).layer);
}
```

### A Note About Markers

If you are using Angular CLI or Webpack to package your project, you will need to configure the marker icon as shown in the `drawOptions` example above.
The issue has to do with how Leaflet handles icon image loading.
For more details on how to set this up, reference the [Marker Setup](https://github.com/bluehalo/ngx-leaflet/blob/master/docs/cookbook.md#marker-setup) guide in the @bluehalo/ngx-leaflet cookbook.

## API

Full API documentation is in [docs/API.md](docs/API.md). It covers:
- Directive inputs: `leafletDraw`, `leafletDrawOptions`, `leafletDrawLocal`
- Draw events — all 16 `L.Draw.Event` output bindings
- Getting a reference to the draw control via `leafletDrawReady` or `LeafletDrawDirective` injection


## Cookbook

Common patterns and examples are in [docs/cookbook.md](docs/cookbook.md), including:
- [Showing and Hiding the Draw Control](docs/cookbook.md#showing-and-hiding-the-draw-control)


## Contribute

PRs accepted. Please make contributions on feature branches and open a pull request against `master`.

## License

See [LICENSE](LICENSE) for details.

## Credits

**[Leaflet](http://leafletjs.com/)** Is an awesome mapping package.
**[Leaflet.draw](https://github.com/Leaflet/Leaflet.draw)** Makes drawing shapes on maps super easy.
