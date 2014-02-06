MAPEDITOR.plugins.push(function () {
	this.name = 'filter';

	this.load = function (editor) {
		var filter = $('<div class="filter"></div>');
		var select = $('<select></select>')

		select.append($('<option value="all">all</option>'));
		select.append($('<option value="none">none</option>'));
		for (var i = editor.map.blocs_type.length - 1; i >= 0; i--) {
			select.append($('<option value="' + editor.map.blocs_type[i] + '">' + editor.map.blocs_type[i] + '</option>'));
		};

		select.on('change', editor, function (e) {
			e.data.renderer.filter($(e.target).val());
		});

		filter.append(select)
		editor.viewports.footer.node.prepend(filter);
	}
});
