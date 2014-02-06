function FooterViewport(active, displayed) {
	this.base = AbstractViewport;
	this.base(active, displayed);

	this.load = function (editor) {
		this.node = $('<div class="footer"></div>');
		this.editor = editor;
		this.editor.node.append(this.node);
	}
}
FooterViewport.prototype = new AbstractViewport;
