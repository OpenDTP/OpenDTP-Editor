function ToolbarViewport(active, displayed) {
	this.base = AbstractViewport;
	this.base(active, displayed);

	this.load = function (editor) {
		this.node = $('<div class="toolbar"></div>');
		this.editor = editor;
		this.editor.node.append(this.node);
	}
}
ToolbarViewport.prototype = new AbstractViewport;
