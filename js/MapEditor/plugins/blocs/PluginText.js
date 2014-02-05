MAPEDITOR.plugins.push(function () {
	var name = 'text';

	this.load = function (editor) {
		CKEDITOR.disableAutoInline = true;
		// this.loadEvents(editor);
		// editor.renderer.node.change({'editor' : editor, 'plugin' : this}, function (e) {
		// 	editor.renderer.node.find('.bloc.bloc-text').unbind('click', e.data.plugin.loadEvents);
		// 	e.data.plugin.loadEvents(e.data.editor);
		// });
	}

	this.loadEvents = function (editor) {
		editor.renderer.node.find('.bloc.bloc-text').click(editor, function (e) {
			var spread = parseInt($(this).attr('data-spread'));
			var page = $(this).attr('data-page');
			var bloc = $(this).attr('data-name');

			e.data.clearPopup();
			e.data.ckeditorPopup(e.data.map.spreads[spread].pages[page].blocs[bloc].content);
		});
	}

	/**
	 * Getters and Setters
	 */
	this.__defineGetter__('name', function () {return name;});

	this.__defineSetter__('name', function (val) {name = val;});
});
