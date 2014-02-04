function RendererAbstract(node_map, document_map) {
	var map;
	var node;

	// map zoom
	var zoom;

	this.load = function (node, map) {
		this.node = node;
		this.map = map;
		this.zoom = 1;
	}

	this.createSVG = function (tag, attr_list) {
		var el = $(document.createElementNS('http://www.w3.org/2000/svg', tag));

		for (var key in attr_list) {
			el.attr(key, attr_list[key]);
		}
		return el;
	}

	/**
	 * Getters and Setters
	 */

	this.__defineGetter__('map', function () {return map;});
	this.__defineGetter__('node', function () {return node;});
	this.__defineGetter__('map_svg', function () {return map_svg;});
	this.__defineGetter__('zoom', function () {return zoom;});

	this.__defineSetter__('map', function (val) {map = val});
	this.__defineSetter__('node', function (val) {node = val});
	this.__defineSetter__('map_svg', function (val) {map_svg = val});
	this.__defineSetter__('zoom', function (val) {zoom = val});

	/**
	 * Constructor call
	 */

	if (undefined !== node_map && undefined !== document_map) {
		this.load(node_map, document_map);
	}
}
