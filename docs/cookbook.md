# @bluehalo/ngx-leaflet-draw — Cookbook

> Common patterns and examples. For installation and quick-start usage, see the [README](../README.md).

## Showing and Hiding the Draw Control

If you want to toggle the draw control on and off, you can use the following approach:

```angular181html
<button (click)="shown = !shown">Show/Hide Control</button>
<div leaflet style="height: 400px;" [leafletOptions]="options">
	@if (shown) {
		<div leafletDraw [leafletDrawOptions]="drawOptions"></div>
	}
</div>
```

You can place the leafletDraw directive on a child element and then use `@if` to add/remove the draw control from the map.
When `@if` evaluates to false, the child element is removed from the map, which destroys the control.
When it evaluates to true, the child element is added to the map, which recreates the control.
