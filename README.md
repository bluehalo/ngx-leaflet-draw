# @asymmetrik/angular2-leaflet-draw

[![Build Status][travis-image]][travis-url]

> Leaflet Draw extension to the @asymmetrik/angular2-leaflet package for Angular 2
> Provides Leaflet Draw integration into Angular 2 projects. Compatible with Leaflet v1.0.x and Leaflet Draw 0.4.x

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
npm install @asymmetrik/angular2-leaflet-draw
```

If you want to run the demo, clone the repository, perform an ```npm install```, ```gulp dev``` and then go to http://localhost:9000/src/demo/index.html


## Usage

This plugin is used with the [Angular 2 Leaflet plugin](https://github.com/Asymmetrik/angular2-leaflet).

To create a map, use the ```leaflet``` attribute directive.
You must specify an initial zoom/center and set of layers either via ```leafletOptions``` or by binding to ```leafletZoom```, ```leafletCenter```, and ```leafletLayers```.

```html
<div leaflet style="height: 400px;"
     [leafletDraw]="drawConfig"
     [leafletOptions]="options">
</div>
```

#### leafletDraw
This attribute is both the attribute that initiates the draw plugin and the input binding used to configure the plugin. 

```js
drawConfig = {
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

The configuration object is passed through to the Leaflet.draw object.
Therefore, you can reference [their documentation](https://github.com/Leaflet/Leaflet.draw) for help configuring this plugin.
If you do not provide a ```featureGroup``` for the Leaflet.draw plugin to use, the Angular 2 plugin will create one internally and put it in the configuration object. 


## Contribute
PRs accepted. If you are part of Asymmetrik, please make contributions on feature branches off of the ```develop``` branch. If you are outside of Asymmetrik, please fork our repo to make contributions.


## License
See LICENSE in repository for details.


## Credits
**[Leaflet](http://leafletjs.com/)** Is an awesome mapping package.
**[Leaflet.draw](https://github.com/Leaflet/Leaflet.draw)** Makes drawing shapes on maps super easy.


[travis-url]: https://travis-ci.org/Asymmetrik/angular2-leaflet-draw/
[travis-image]: https://travis-ci.org/Asymmetrik/angular2-leaflet-draw.svg
