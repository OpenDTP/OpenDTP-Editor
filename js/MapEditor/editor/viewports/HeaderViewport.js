function HeaderViewport(active, displayed) {
	this.base = AbstractViewport;
	this.base(active, displayed);

	this.load = function (editor) {
		this.editor = editor;
		this.node = $('<div class="header"><div class="title">PACO Editor v0.1</div><div class="version-wrapper"><div class="version">' + this.editor.map.name + '</div></div></div>');
		this.editor.node.append(this.node);
	}
}
HeaderViewport.prototype = new AbstractViewport;
