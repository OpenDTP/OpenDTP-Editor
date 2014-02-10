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
		var menu_list;

		if (true === refresh) {
			this.menu_node.html('');
		}

		for (var key in this.editor.menu_items) {
  		menu_element = $('<div class="menu-item">' + key + '</div>');
  		menu_list = $('<ul></ul>');
  		this.menuRecurse(menu_list, this.editor.menu_items[key]);
  		menu_element.click(this, function (e) {
  			e.data.toggleMenu(e.target);
	  	});
	  	menu_element.mouseenter(this, function (e) {
	  		if (0 === e.data.menu_node.find('.selected').length || 'div' !== e.target.localName) {
	  			return;
	  		}
  			e.data.toggleMenu(e.target);
	  	});
  		menu_element.append(menu_list);
  		this.menu_node.append(menu_element);
  	};
  	this.menu_node.mouseleave(this, function (e) {
  		e.data.hideMenu();
  	});
	}

	this.menuRecurse = function (menu_list, element) {
		var submenu = $('<ul></ul>');

		for (var key in element) {
  		submenu_element = $('<li>' + key + '</li>');
  		menu_list.append(submenu_element);
  		if ('function' === typeof element[key]) {
  			submenu_element.click({'editor' : this.editor, 'element' : element[key]}, function (e) {
  					e.data.element(e.data.editor);
  				}
  			);
  		} else if ('object' === typeof element[key]) {
  			submenu = $('<ul></ul>');
  			submenu_element.append(submenu);
  			submenu_element.mouseover({'viewport' : this, 'menu' : menu_list}, function (e) {
  				var siblings = $(e.target).siblings();
  				siblings.removeClass('selected');
  				siblings.find('ul').hide();
  				e.data.viewport.showMenu(e.target);
  			});
  			this.menuRecurse(submenu, element[key]);
  		}
  	};
	}

	this.showMenu = function (target) {
		node = $(target);

		node.addClass('selected');
		node.children('ul').show();
	}

	this.hideMenu = function (target) {
		if (undefined === target) {
			target = this.menu_node;
		}
		target.find('ul').hide();
		target.find('.selected').removeClass('selected');
	}

	this.toggleMenu = function (target) {
		this.hideMenu();
	  this.showMenu(target);
	}
}
HeaderViewport.prototype = new AbstractViewport;
