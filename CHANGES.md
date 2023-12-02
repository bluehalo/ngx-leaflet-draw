# Changelog

## 17.0.0
Support for Angular 17

## 16.0.0
Support for Angular 16

## 15.0.0
Support for Angular 15

## 14.0.0
Support for Angular 14

## 13.0.0
Support for Angular 13

### 13.0.3
Bounced around between leaflet-draw versions for peer dependencies.
I've removed the peer dependency being locked at 1.0.2 for leaflet-draw.
Be aware that there are issues with later versions.

There are some bugs that are particularly apparent in `leaflet-draw@1.0.3` and `1.0.4`. 
`leaflet-draw@1.0.2` seems to be the latest version without the issues (drawing a sqaure is broken, label anchors broken, etc.).


## 7.0.0
Support for Angular 10

## 6.0.0
Support for Angular 9

- Renamed UMD bundle to `ngx-leaflet-draw.umd.js`. This shouldn't affect anyone unless you're manually including the bundle.
- Angular deprecated parameterless forRoot, so I removed the static function. You may need to update your import.
- Added support for localization using the `[leafletDrawLocal]` input parameter.

BREAKING CHANGES:
- We no longer automatically add the drawn items featureGroup to the map and no longer automatically add drawn items to the featureGroup. This makes the behavior of this plugin match the default behavior of Leaflet Draw.

### 6.0.1
- Fixing an error with the demo.
- Fixed an issue with generation of minified bundle to remove comments but include license.

## 5.0.0
- Angular 8

### 4.1.0
- Fixed external referenced in rollup
- Updated minor dependencies

## 4.0.0
- Angular 7
- Started using the HtmlWebpackPlugin to generate the index.html file in the dist dir, so you don't need to add `/src/demo` to the end of the URL to hit the demo.

### 3.2.0
Added [draw events](#draw-events).

### 3.1.0
Added the ```leafletDrawReady``` output. This output is used to expose the Leaflet Draw Control.

## 3.0
Support for Angular 5. Also cleaned up some of the functionality related to Angular zone management.
Added documentation to README on Zone management.

## 2.0
Support for Angular 4.
