function PopupViewport(active, displayed) {
	this.base = AbstractViewport;
	this.base(active, displayed);

	this.load = function (editor) {
		this.node = $('<div class="popup-overlay"></div><div class="popup-content"></div>');
		this.editor = editor;
		this.editor.node.append(this.node);

		this.node[0].click(this, function (e) {
			e.data.hidePopup();
		});
	}

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
}
ToolbarViewport.prototype = new AbstractViewport;
