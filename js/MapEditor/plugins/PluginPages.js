MAPEDITOR.plugins.push(function () {
	this.name = 'pages';

	this.load = function (editor) {
		var pages = $('<div class="pages"></div>');
		var nb_pages = $('<span class="max">' + editor.map.spreads.length + '</span>');
		var separator = $('<span class="separator">/</span>');
		var current = $('<span class="current">' + (editor.properties.current_spread + 1) + '</span>');
		var next_page = $('<a href="#">&gt</a>');
		var previous_page = $('<a href="#">&lt;</a>');

		next_page.click({'editor' : editor, 'current' : current}, function(e) {
			e.preventDefault();
			if (e.data.editor.properties.current_spread < e.data.editor.map.spreads.length - 1) {
				e.data.editor.properties.current_spread++;
				e.data.editor.renderer.render(e.data.editor.properties.current_spread, true);
			}
			e.data.current.html(e.data.editor.properties.current_spread + 1);
		});

		previous_page.click({'editor' : editor, 'current' : current}, function(e) {
			e.preventDefault();
			if (e.data.editor.properties.current_spread > 0) {
				e.data.editor.properties.current_spread--;
				e.data.editor.renderer.render(e.data.editor.properties.current_spread, true);
			}
		});

		editor.renderer.node.change({'editor' : editor, 'current' : current}, function(e) {
			e.data.current.html(e.data.editor.properties.current_spread + 1);
		});

		pages.append(previous_page);
		pages.append(current);
		pages.append(separator);
		pages.append(nb_pages);
		pages.append(next_page);
		editor.viewports.footer.node.append(pages);
	}

});
