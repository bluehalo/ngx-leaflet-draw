/**
 * Vendor Imports
 *
 *   This file is used to organize all application-level global imports
 *
 */

// Polyfills
import 'core-js/es6';
import 'core-js/es7/reflect';


// Global Imports
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import 'leaflet';
import 'leaflet/dist/leaflet.css';

import 'leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';

// This addresses a weird thing with how Leaflet handles icon URLs. See README for details.
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';


// Angular Imports
import '@angular/common';
import '@angular/core';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';


// Angular Third-Party
import '@asymmetrik/ngx-leaflet';


// Other Dependencies
import 'rxjs';
import 'zone.js';
