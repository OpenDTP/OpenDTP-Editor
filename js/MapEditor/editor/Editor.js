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
	}

	// this.load = function (node, map, plugins_list) {

	// 	this.mapResize();
	// 	if (undefined !== plugins_list && plugins_list.length > 0) {
	// 		this.loadPlugins(plugins_list);
	// 	}
 //  	this.toolbar.append(menu);

	// 	// creating div popup
	// 	$(this.node).append($('<div class="popup-overlay"></div><div class="popup-content"></div>'));


	// 	// Setting resize event
	// 	$(window).resize(this, this.mapResize);
	// }

	this.mapResize = function (e) {
		var editor = e === undefined ? this : e.data;
		var map_wrapper = editor.map_viewport.find('.map-wrapper');
		var border_width_size = editor.map_viewport.outerWidth(true) - editor.map_viewport.width();
		var border_height_size = editor.map_viewport.outerHeight(true) - editor.map_viewport.height();

		// setting map Viewport sizes
		editor.map_viewport.css('height', editor.node.height() - editor.toolbar.outerHeight(true) - editor.footer.outerHeight(true) - border_height_size);
		editor.left_pannel.css('height', editor.node.height() - editor.toolbar.outerHeight(true) - editor.footer.outerHeight(true));
		editor.right_pannel.css('height', editor.node.height() - editor.toolbar.outerHeight(true) - editor.footer.outerHeight(true));

		// Vertical align pages on viewport
		$(map_wrapper).css('line-height', $(map_wrapper).height() + 'px');

		// Refresh pages
		editor.renderer.resizeMap();

		// Sending update signal
		node.trigger('change');
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
