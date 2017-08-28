# @asymmetrik/angular2-leaflet-draw

[![Build Status][travis-image]][travis-url]

**IMPORTANT NOTE: This package has been renamed to @asymmetrik/ngx-leaflet-draw**

> Leaflet Draw extension to the @asymmetrik/angular2-leaflet package for Angular 2
> Provides Leaflet Draw integration into Angular 2 projects. Compatible with Leaflet v1.0.x and Leaflet Draw 0.4.x

> Now supports Angular v4, Ahead-of-Time compilation (AOT), and use in Angular-CLI based projects

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)
- [Credits](#credits)

## Install
Install the package and its peer dependencies via npm:
```
npm install leaflet
npm install leaflet-draw
npm install @asymmetrik/angular2-leaflet
npm install @asymmetrik/angular2-leaflet-draw
```

If you intend to use this library in a typescript project (utilizing the typings), you will need to also install the leaflet typings via npm:
```
npm install @types/leaflet
npm install @types/leaflet-draw
```

If you want to run the demo, clone the repository, perform an ```npm install```, ```gulp dev``` and then go to http://localhost:9000/src/demo/index.html


## Usage
To use this library, there are a handful of setup steps to go through that vary based on your app environment (e.g., Webpack, ngCli, SystemJS, etc.).
Generally, the steps are:

* Install Leaflet, Angular2 Leaflet, this library, and potentially the Leaflet and Leaflet-draw typings (see above).
* Import the Leaflet and Leaflet-draw stylesheet
* Import the Leaflet and Leaflet-draw modules into your Angular project
* Create and configure a map (see docs below and/or demo)

For more details and examples, refer to the [Angular 2 Leaflet plugin README](https://github.com/Asymmetrik/angular2-leaflet).

### Import the Stylesheets
For leaflet to work, you need to have the leaflet stylesheets loaded into your application.
If you've installed via npm, you will need to load ```./node_modules/leaflet/dist/leaflet.css``` abd ```./node_modules/leaflet-draw/dist/leaflet.draw.css```. 
How you include the stylesheet will depend on your specific setup.


### Import Code Dependencies and Module
This project is exported using UMD and it includes typings.
So, you shouldn't have to do anything special to use it if you're building your project in Typescript.
Before you can use the module in your Angular 2+ app, you'll need to import it in your application.
Note that you also need to import the angular2-leaflet module as well.

For example, in your ```app.module.ts```, add:
 
```js
import { LeafletModule } from '@asymmetrik/angular2-leaflet.module';
import { LeafletDrawModule } from '@asymmetrik/angular2-leaflet-draw.module';

...
imports: [
    ...
    LeafletModule.forRoot(),
    LeafletDrawModule.forRoot()
]
...

```


### Create and Configure a Map with the Draw Controls
To create a map, use the ```leaflet``` attribute directive. This directive must appear first.
You must specify an initial zoom/center and set of layers either via ```leafletOptions``` or by binding to ```leafletZoom```, ```leafletCenter```, and ```leafletLayers```.
Finally, add the ```leafletDraw``` attribute directive to add the leaflet draw control and configure it with ```leafletDrawOptions```.

```html
<div leaflet style="height: 400px;"
     leafletDraw
     [leafletOptions]="options"
     [leafletDrawOptions]="drawOptions">
</div>
```

#### leafletDraw
This attribute is an attribute directive that initiates the draw plugin. 

#### leafletDrawOptions
Input binding for the options to be passed to the draw plugin upon creation.
These options are only currently processed at creation time. 

```js
drawOptions = {
	position: 'topright',
	draw: {
		marker: {
			icon: L.icon({
				iconUrl: '2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
				shadowUrl: '44a526eed258222515aa21eaffd14a96.png'
			})
		},
		polyline: false,
		circle: {
			shapeOptions: {
				color: '#aaaaaa'
			}
		}
	}
};
```

The options object is passed through to the Leaflet.draw object.
Therefore, you can reference [their documentation](https://github.com/Leaflet/Leaflet.draw) for help configuring the draw control.

If you do not provide a ```featureGroup``` for the Leaflet.draw plugin to use, the leafletDraw directive will create one internally and put it in the options object. 


#### Showing and Hiding the Draw Control
If you want to toggle the draw control on and off, you can use the following approach:

```js
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


## Contribute
PRs accepted. If you are part of Asymmetrik, please make contributions on feature branches off of the ```develop``` branch. If you are outside of Asymmetrik, please fork our repo to make contributions.


## License
See LICENSE in repository for details.


## Credits
**[Leaflet](http://leafletjs.com/)** Is an awesome mapping package.
**[Leaflet.draw](https://github.com/Leaflet/Leaflet.draw)** Makes drawing shapes on maps super easy.


[travis-url]: https://travis-ci.org/Asymmetrik/angular2-leaflet-draw/
[travis-image]: https://travis-ci.org/Asymmetrik/angular2-leaflet-draw.svg
