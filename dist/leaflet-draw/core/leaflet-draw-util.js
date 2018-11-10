var LeafletDrawUtil = /** @class */ (function () {
    function LeafletDrawUtil() {
    }
    LeafletDrawUtil.handleEvent = function (zone, eventEmitter, event) {
        // Don't want to emit if there are no observers
        if (0 < eventEmitter.observers.length) {
            zone.run(function () {
                eventEmitter.emit(event);
            });
        }
    };
    return LeafletDrawUtil;
}());
export { LeafletDrawUtil };
//# sourceMappingURL=leaflet-draw-util.js.map