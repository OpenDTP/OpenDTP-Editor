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
		var switchMenuEvent;
		var menu_element;
		var menu_list;

		if (true === refresh) {
			this.menu_node.html('');
		}

		switchMenuEvent = function (e) {
			e.data.hideMenu();
			if (!$(e.target).hasClass('selected')) {
				e.data.showMenu(e.target);
			}
		}

		for (var key in this.editor.menu_items) {
  		menu_element = $('<div class="menu-item">' + key + '</div>');
  		menu_list = $('<ul></ul>');
  		this.menuRecurse(menu_list, this.editor.menu_items[key]);
  		menu_element.click(this, function (e) {
	  		e.data.showMenu(e.target);
	  		e.data.menu_node.find('.menu-item').mouseenter(e.data, switchMenuEvent);
	  	});
  		menu_element.append(menu_list);
  		this.menu_node.append(menu_element);
  	};

  	this.node.mouseleave(this, function (e) {
  		if (!$(e.target).hasClass('selected')) {
  			e.data.hideMenu();
  		}
  		e.data.menu_node.find('.menu-item').unbind('mouseenter', switchMenuEvent);
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
  				// e.data.viewport.hideMenu(menu_list);
  				console.log(e.target);
  				e.data.viewport.showMenu(e.target);
  			});
  			this.menuRecurse(submenu, element[key]);
  		}
  	};
	}

	this.showMenu = function (target) {
		$(target).addClass('selected');
		$(target).children('ul').show();
	}

	this.hideMenu = function (target) {
		if (undefined === target) {
			target = this.menu_node;
		}
		target.find('ul').hide();
		target.find('.menu-item').removeClass('selected');
	}
}
HeaderViewport.prototype = new AbstractViewport;
