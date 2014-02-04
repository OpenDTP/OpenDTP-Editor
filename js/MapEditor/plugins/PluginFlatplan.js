MAPEDITOR.plugins.push(function () {
	var name = 'flatplan';
	var max_width = 33.3333;
	var flatplan;
	var flatplan_content;

	this.load = function (editor) {
		var header = $('<div class="header"><di class="title">Flatplan<div></div>');
		var hide = $('<div class="hide-toggle">&gt;</div>');

		flatplan = $('<div class="flatplan"></div>');
		flatplan_content = $('<div class="flatplan-content"></div>');
		header.prepend(hide);
		this.flatplan_content.append(header);
		this.flatplan_content.append(this.flatplan);
		this.loadFlatplan(editor);
		editor.right_pannel.append(this.flatplan_content);

		header.click({'flatplan' : this.flatplan, 'hide' : hide}, function (e) {
			e.data.flatplan.toggle();
			if ($(e.data.flatplan).is(':visible')) {
				$(e.data.hide).removeClass('show');
			} else {
				$(e.data.hide).addClass('show');
			}
		});
	};

	this.loadFlatplan = function (editor) {
		var page;
		var spread;
		var width;
		var nb_pages;
		var max_nb_pages = 0;
		var nb_spreads = editor.map.spreads.length;

		for (var i = 0; i < nb_spreads; i++) {
			nb_pages = editor.map.spreads[i].pages.length;
			spread = $('<div class="spread" data-index="' + i + '"></div>');
			width = (1 / editor.map.spreads[i].nb_pages * 100);
			width = width > this.max_width ? max_width : width;
			for (var key in editor.map.spreads[i].pages) {
				page = $('<div class="page"><img class="page" src="' + editor.map.spreads[i].pages[key].preview + '" width="100%" /></div>');
				page.css('width', width.toFixed(2) + '%');
				spread.append(page);
			}
			spread.click(editor, function (e) {
				var current_node = $(e.target);

				if (undefined === current_node.attr('data-index')) {
					e.data.properties.current_spread = parseInt(current_node.parents('.spread').attr('data-index'));
				} else {
					e.data.properties.current_spread = parseInt(current_node.attr('data-index'));
				}
				e.data.renderer.render(e.data.properties.current_spread, true);
			});
			this.flatplan.append(spread);
		}
	}

	/**
	 * Getters and Setters
	 */
	this.__defineGetter__('name', function () {return name;});
	this.__defineGetter__('max_width', function () {return max_width;});
	this.__defineGetter__('flatplan', function () {return flatplan;});
	this.__defineGetter__('flatplan_content', function () {return flatplan_content;});

	this.__defineSetter__('name', function (val) {name = val;});
	this.__defineSetter__('max_width', function (val) {max_width = val;});
});
