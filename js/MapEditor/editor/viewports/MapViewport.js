function MapViewport(active, displayed) {
	this.base = AbstractViewport;
	this.base(active, displayed);

	this.load = function (editor) {
		var map_wrapper;

		this.node = $('<div class="map-viewport right-space left-space"></div>');
		map_wrapper = $('<div class="map-wrapper"></div>');
		this.editor = editor;
		this.node.append(map_wrapper);
		this.editor.node.append(this.node);
		this.editor.renderer = new Renderer(map_wrapper, this.editor.map);
		this.editor.renderer.render(this.editor.properties.current_spread);
	}
}
MapViewport.prototype = new AbstractViewport;
