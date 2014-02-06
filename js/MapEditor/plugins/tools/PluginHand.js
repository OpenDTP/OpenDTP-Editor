MAPEDITOR.plugins.push(function () {
	var name = 'hand';

	this.load = function (editor) {
	}

	/**
	 * Getters and Setters
	 */
	this.__defineGetter__('name', function () {return name;});

	this.__defineSetter__('name', function (val) {name = val;});
});
