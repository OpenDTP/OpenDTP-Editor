MAPEDITOR.plugins.push(function () {
	this.name = 'flatplan';
	this.max_width = 50;
	this.flatplan = $('<div class="flatplan"></div>');
	this.flatplan_content = $('<div class="flatplan-content"></div>');

	this.load = function (editor) {
		var header = $('<div class="flatplan-header"><di class="title">Flatplan<div></div>');
		var hide = $('<div class="hide-toggle">&gt;</div>');

		header.prepend(hide);
		this.flatplan_content.append(header);
		this.flatplan_content.append(this.flatplan);
		this.loadFlatplan(editor);
		editor.viewports.preview.node.append(this.flatplan_content);

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
		var nb_spreads = editor.map.spreads.length;

		for (var i = 0; i < nb_spreads; i++) {
			nb_pages = editor.map.spreads[i].pages.length;
			spread = $('<div class="spread" data-index="' + i + '"></div>');
			width = (1 / editor.map.spreads[i].nb_pages * 100);
			width = width > this.max_width ? this.max_width : width;
			for (var key in editor.map.spreads[i].pages) {
				page = $('<div class="page"><img class="page" src="' + editor.map.spreads[i].pages[key].preview + '" width="100%" /></div>');
				page.css('width', width.toFixed(2) + '%');
				if ('left' === editor.map.spreads[i].pages[key].type || 'right' === editor.map.spreads[i].pages[key].type) {
					page.addClass(editor.map.spreads[i].pages[key].type);
				}
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
});
