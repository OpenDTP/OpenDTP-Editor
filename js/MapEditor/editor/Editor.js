function Editor (node, map, plugins_list) {
	this.node = null;
	this.map = null;
	this.renderer = null;

	// Editor viewports loading
	this.viewports = {
		"header" : new HeaderViewport(),
		"toolbar" : new ToolbarViewport(),
		"map" : new MapViewport(),
		"preview" : new PreviewViewport(),
		"footer" : new FooterViewport(),
		"popup" : new PopupViewport()
	};

	// Editor elements
	var footer;
	var menu;
	var right_pannel;

	// Editor properties
	this.properties = {
		'current_spread' : 0
	}

	this.menu_items = {
		'File' : {},
		'Edit' : {},
		'View' : {
			'Show / Hide right pannel' : function (editor) {
				editor.right_pannel.toggle();
				if (editor.right_pannel.is(':visible')) {
					editor.map_viewport.addClass('right-space');
				} else {
					editor.map_viewport.removeClass('right-space');
				}
			},
			'Show / Hide left pannel' : function (editor) {
				editor.left_pannel.toggle();
				if (editor.left_pannel.is(':visible')) {
					editor.map_viewport.addClass('left-space');
				} else {
					editor.map_viewport.removeClass('left-space');
				}
			}
		},
		'Help' : {
			'About' : function () { alert('the fucking awesome editor\nPACO Editor v0.1'); }
		}
	};

	// Editor plugins
	var plugins = [];

	this.load = function (node, map, plugins_list) {
		this.node = $(node);
		this.map = map;

		// Adding mapeditor class to main edidor node
		this.node.addClass('mapeditor');

		// Loading viewports
		for (var key in this.viewports) {
			if (true === this.viewports[key].active) {
				this.viewports[key].load(this);
				if (false === this.viewports[key].displayed) {
					this.viewports[key].hide();
				}
			}
		}

		this.mapResize();

		// Setting resize event
		$(window).resize(this, this.mapResize);
	}

	// 	if (undefined !== plugins_list && plugins_list.length > 0) {
	// 		this.loadPlugins(plugins_list);
	// 	}

	this.mapResize = function (e) {
		var editor = e === undefined ? this : e.data;
		var viewports = editor.viewports;
		var map_wrapper = viewports.map.node.find('.map-wrapper');
		var border_width_size = viewports.map.node.outerWidth(true) - viewports.map.node.width();
		var border_height_size = viewports.map.node.outerHeight(true) - viewports.map.node.height();

		// setting map Viewport sizes
		viewports.map.node.css('height', editor.node.height() - viewports.header.node.outerHeight(true) - viewports.footer.node.outerHeight(true) - border_height_size);
		viewports.toolbar.node.css('height', editor.node.height() - viewports.header.node.outerHeight(true) - viewports.footer.node.outerHeight(true));
		viewports.preview.node.css('height', editor.node.height() - viewports.header.node.outerHeight(true) - viewports.footer.node.outerHeight(true));

		// Vertical align pages on viewport
		$(map_wrapper).css('line-height', viewports.map.node.height() + 'px');

		// Refresh pages
		editor.renderer.resizeMap();

		// Sending update signal
		editor.node.trigger('change');
	}

	this.loadPlugins = function (plugins_list) {
    var plugin;

		// plugin loading
    for (var i = plugins_list.length - 1; i >= 0; i--) {
    	plugin = new plugins_list[i]();
    	plugin.load(this);
    	this.plugins.push(plugin);
    };
  }

	 /**
	 * Constructor call
	 */

	if (undefined !== node && undefined !== map) {
		this.load(node, map, plugins_list);
	}
}
