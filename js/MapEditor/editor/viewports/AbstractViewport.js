function AbstractViewport(active, displayed) {
	this.active = undefined === active ? true : active;
	this.displayed = undefined === displayed ? true : displayed;
	this.node = null;
	this.editor = null;

	this.hide = function () {
		this.node.hide();
	}

	this.show = function () {
		this.node.show();
	}
}
