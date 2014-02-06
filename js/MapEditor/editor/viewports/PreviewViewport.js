function PreviewViewport(active, displayed) {
	this.base = AbstractViewport;
	this.base(active, displayed);

	this.load = function (editor) {
		this.node = $('<div class="right-pannel"></div>');
		this.editor = editor;
		this.editor.node.append(this.node);
	}
}
PreviewViewport.prototype = new AbstractViewport;
