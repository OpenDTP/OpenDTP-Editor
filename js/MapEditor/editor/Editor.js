function Editor (node, map, plugins_list) {
	this.node = null;
	this.map = null;
	this.renderer = null;

	// Editor viewports loading
	this.viewports = {
		"header" : new HeaderViewport(),
		"toolbar" : new ToolbarViewport(),
		"map" : new MapViewport()
	};

	// Editor elements
	var footer;
	var menu;
	var right_pannel;

	// Editor properties
	this.properties = {
		'current_spread' : 0
	}

	var menu_items = {
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
	// 	var menu_element;

	// 	menu = $('<div class="menu"></div>');
	// 	right_pannel = $('<div class="right-pannel"></div>');

	// 	this.loadFooter();
	// 	this.mapViewport();
	// 	this.map_viewport.after(right_pannel);
	// 	this.mapResize();
	// 	if (undefined !== plugins_list && plugins_list.length > 0) {
	// 		this.loadPlugins(plugins_list);
	// 	}
	// 	for (var key in this.menu_items) {
 //  		menu_element = $('<div class="menu-item">' + key + '</div>');
 //  		this.loadMenu(menu_element, this.menu_items[key]);
 //  		menu.append(menu_element);
 //  	};
 //  	this.toolbar.append(menu);

	// 	// creating div popup
	// 	$(this.node).append($('<div class="popup-overlay"></div><div class="popup-content"></div>'));
	// 	$(this.node).find('.popup-overlay').click(this, function (e) {
	// 		e.data.hidePopup();
	// 	});

	// 	// Setting resize event
	// 	$(window).resize(this, this.mapResize);
	// }

	// will be recursive in future for submenus
	this.loadMenu = function (menu_element, element) {
		var submenu = $('<ul></ul>');
		var switchMenuEvent;

		for (var key in element) {
  		submenu_element = $('<li>' + key + '</li>');
  		if ('function' === typeof element[key]) {
  			submenu_element.click(
  				{
  					'editor' : this,
  					'element' : element[key]
  				}, function (e) {
  					e.data.element(e.data.editor);
  				}
  			);
  		}
  		submenu.append(submenu_element);
  	};
  	switchMenuEvent = function (e) {
			if (!$(e.target).hasClass('selected')) {
				e.data.showMenu(e.target);
			}
		}
  	menu_element.click(this, function (e) {
  		e.data.showMenu(e.target);
  		e.data.menu.find('.menu-item').mouseenter(e.data, switchMenuEvent);
  	});
  	this.toolbar.mouseleave(this, function (e) {
  		e.data.hideMenu();
  		e.data.menu.find('.menu-item').unbind('mouseenter', switchMenuEvent);
  	});

		submenu.hide();
		menu_element.append(submenu);
	}

	this.showMenu = function (target) {
		this.hideMenu();
		$(target).addClass('selected');
		$(target).find('ul').show();
	}

	this.hideMenu = function () {
		this.menu.find('ul').hide();
		this.menu.find('.menu-item').removeClass('selected');
	}

	this.loadFooter = function () {
		footer = $('<div class="footer"></div>');
		this.node.append(this.footer);
	}

	this.mapViewport = function () {
		var map_wrapper;

		map_wrapper = $('<div class="map-wrapper"></div>');
		this.map_viewport.append(map_wrapper);
		this.toolbar.after(this.map_viewport);
		renderer = new Renderer(map_wrapper, this.map);
		this.renderer.render(this.properties.current_spread);
	}

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
   * Editor popins
   */

  this.clearPopup = function () {
		$(this.node).find('.popup-content').html('');
	}

	this.hidePopup = function () {
		$(this.node).find('.popup-content, .popup-overlay').hide();
	}

	this.displayPopup = function (content) {
		$(this.node).find('.popup-content, .popup-overlay').show();
	}

	this.ckeditorPopup = function (content) {
		this.clearPopup();
		var content = $(this.node).find('.popup-content').append('<textarea>' + (undefined === content ? '' : content) + '</textarea>');
		$(content).find('textarea').ckeditor({
			"resize_enabled" : false,
			"removePlugins" : "elementspath",
			"height" : "100%",
			"width" : "100%",
			"toolbar" :
      [
      	{ name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', 'Save', 'Preview'] },
      	{ name: 'styles', items: [ 'Styles' ] },
      	{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'RemoveFormat' ] },
      	{ name: 'insert', items: [ 'SpecialChar' ] },
      	{ name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
      ]
		});
		this.displayPopup();
	}

	 /**
	 * Constructor call
	 */

	if (undefined !== node && undefined !== map) {
		this.load(node, map, plugins_list);
	}
}
