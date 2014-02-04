function MapEditor(node, map_deconstruction) {

    var map;
    var editors = [];
    var plugins = [];

    this.load = function (node, map_deconstruction) {
        var renderer;

        this.map = new DocumentMap(map_deconstruction);
        this.editors.push(new Editor(node, this.map, this.plugins));
    }

    /**
     * Getters and Setters
     */

     this.__defineGetter__('map', function () {return map;});
     this.__defineGetter__('plugins', function () {return plugins;});
     this.__defineGetter__('editors', function () {return editors;});

     this.__defineSetter__('map', function (val) {map = val;});

     if (undefined !== node && undefined !== map_deconstruction) {
        this.load(node, map_deconstruction);
     }
}

var MAPEDITOR = new MapEditor();
(function($){
    $.fn.mapeditor = function (map_deconstruction) {
        for (var i = 0; i < this.length; i++) {
            MAPEDITOR.load(this[i], map_deconstruction);
        }
    }
    return this;
})(jQuery);
