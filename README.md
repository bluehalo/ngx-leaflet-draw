# @asymmetrik/ngx-leaflet-draw

[![Build Status][travis-image]][travis-url]

[travis-url]: https://travis-ci.org/Asymmetrik/ngx-leaflet-draw/
[travis-image]: https://travis-ci.org/Asymmetrik/ngx-leaflet-draw.svg

*IMPORTANT NOTE: We have renamed this package from ```@asymmetrik/angular2-leaflet-draw``` to ```@asymmetrik/ngx-leaflet-draw```* 

> Leaflet Draw extension to the @asymmetrik/ngx-leaflet package for Angular.io
> Provides Leaflet Draw integration into Angular.io (v2+) projects. Compatible with Leaflet v1.0.x and Leaflet Draw 0.4.x

> Now supports Angular v5, Ahead-of-Time compilation (AOT), and use in Angular-CLI based projects

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)
- [Credits](#credits)


## Install
Install the package and its peer dependencies via npm (or yarn):
```
npm install leaflet
npm install leaflet-draw
npm install @asymmetrik/ngx-leaflet
npm install @asymmetrik/ngx-leaflet-draw
```

If you intend to use this library in a typescript project (utilizing the typings), you will need to also install the leaflet typings via npm:
```
npm install --save-dev @types/leaflet
npm install --save-dev @types/leaflet-draw
```

If you want to run the demo, clone the repository, perform an ```npm install```, ```gulp dev``` and then go to http://localhost:9000/src/demo/index.html


## Usage
To use this library, there are a handful of setup steps to go through that vary based on your app environment (e.g., Webpack, ngCli, SystemJS, etc.).
Generally, the steps are:

* Follow the instructions to install and configure [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet)
* Install this library and the Leaflet-draw typings (see above).
* Import the Leaflet and Leaflet-draw stylesheet
* Import the ngx-leaflet and ngx-leaflet-draw modules into your Angular project
* Create and configure a map (see docs below and/or demo)


### Import the Leaflet Stylesheet
For leaflet to work, you need to have the leaflet stylesheets loaded into your application.
If you've installed via npm, you will need to load ```./node_modules/leaflet/dist/leaflet.css``` abd ```./node_modules/leaflet-draw/dist/leaflet.draw.css```. 
How you include the stylesheet will depend on your specific setup. For examples, refer to the [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet) README


<<<<<<< HEAD
### Import Code Dependencies and Module
This project is exported using UMD and it includes typings.
So, you shouldn't have to do anything special to use it if you're building your project in Typescript.
=======
* dependencies - These should generally be empty. These dependencies will get packaged with your module in NPM, which is probably not what you intend.
* peerDependencies - Specify all of the runtime dependencies of the module that someone using it will need. This would include any Angular.io dependencies referenced from within your code and any third party dependencies on which you depend.
* devDependencies - You can specify all of the dependencies needed to build, run, and test your code in this project.
>>>>>>> template/master

#### Typescript Angular.io Module Import
Before you can use the module in your Angular.io app, you'll need to import it in your application.
Note that you also need to import the ngx-leaflet module as well.

For example, in your ```app.module.ts```, add:
 
```js
import { LeafletModule } from '@asymmetrik/ngx-leaflet.module';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw.module';

...
imports: [
   ...
   LeafletModule.forRoot(),
   LeafletDrawModule.forRoot()
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
     [leafletDrawOptions]="drawOptions">
</div>
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
             iconUrl: 'assets/marker-icon.png',
             shadowUrl: 'assets/marker-shadow.png'
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


### A Note About Markers
If you are using Angular CLI or Webpack to package your project, you will need to configure the marker icon as shown in the ```leafletDrawOptions``` example above.
The issue has to do with how Leaflet handles icon image loading.
For more details on how to set this up, reference the README from [@asymmetrik/ngx-leaflet](https://github.com/Asymmetrik/ngx-leaflet#a-note-about-markers).  


### Showing and Hiding the Draw Control
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
PRs accepted. If you are part of Asymmetrik, please make contributions on feature branches off of the ```develop``` branch.
If you are outside of Asymmetrik, please fork our repo to make contributions and submit PRs against ```develop```.


## License
See LICENSE in repository for details.


## Credits
**[Leaflet](http://leafletjs.com/)** Is an awesome mapping package.
**[Leaflet.draw](https://github.com/Leaflet/Leaflet.draw)** Makes drawing shapes on maps super easy.

