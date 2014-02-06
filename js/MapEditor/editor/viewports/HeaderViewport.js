function HeaderViewport(active, displayed) {
	this.base = AbstractViewport;
	this.base(active, displayed);

	this.menu_node = $('<div class="menu"></div>');

	this.load = function (editor) {
		this.editor = editor;
		this.node = $('<div class="header"><div class="title">PACO Editor v0.1</div><div class="version-wrapper"><div class="version">' + this.editor.map.name + '</div></div></div>');
		this.menu();
		this.node.append(this.menu_node);
		this.editor.node.append(this.node);
	}

	this.menu = function (refresh) {
		var menu_element;

		if (true === refresh) {
			this.menu_node.html('');
		}
		for (var key in this.editor.menu_items) {
  		menu_element = $('<div class="menu-item">' + key + '</div>');
  		this.menuRecurse(menu_element, this.editor.menu_items[key]);
  		this.menu_node.append(menu_element);
  	};
	}

	// will be recursive in future for submenus
	this.menuRecurse = function (menu_element, element) {
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
  		e.data.menu_node.find('.menu-item').mouseenter(e.data, switchMenuEvent);
  	});
  	this.node.mouseleave(this, function (e) {
  		e.data.hideMenu();
  		e.data.menu_node.find('.menu-item').unbind('mouseenter', switchMenuEvent);
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
		this.menu_node.find('ul').hide();
		this.menu_node.find('.menu-item').removeClass('selected');
	}
}
HeaderViewport.prototype = new AbstractViewport;
