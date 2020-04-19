# Changelog

## 6.0.0
Support for Angular 9

- Renamed UMD bundle to `ngx-leaflet-draw.umd.js`. This shouldn't affect anyone unless you're manually including the bundle.
- Angular deprecated parameterless forRoot, so I removed the static function. You may need to update your import.

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
