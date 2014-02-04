function Bloc(bloc_name, bloc_properties) {

	var name = 'undefined';
	var width = 0;
	var height = 0;
	var x = 0;
	var y = 0;
	var type = 'none';
	var content = '';
	var updated = false;

	this.load = function (bloc_name, bloc_properties) {
		this.name = bloc_name;
		this.width = bloc_properties.width;
		this.height = bloc_properties.height;
		this.x = bloc_properties.x;
		this.y = bloc_properties.y;
		this.type = bloc_properties.type;
		this.content = bloc_properties.content;
	}

	/**
	 * Getters and Setters
	 */

	this.__defineGetter__('name', function () {return name;});
	this.__defineGetter__('width', function () {return width;});
	this.__defineGetter__('height', function () {return height;});
	this.__defineGetter__('x', function () {return x;});
	this.__defineGetter__('y', function () {return y;});
	this.__defineGetter__('type', function () {return type;});
	this.__defineGetter__('content', function () {return content;});
	this.__defineGetter__('updated', function () {return updated;});

	this.__defineSetter__('width', function (val) {
		parsed = parseFloat(val);

		if (NaN === parsed) {
			console.log('DocumentMap Object : Warning width value is not a number, setting height to 0');
			width = 0.0;
		} else {
			width = parsed;
		}
	});

	this.__defineSetter__('height', function (val) {
		parsed = parseFloat(val);

		if (NaN === parsed) {
			console.log('DocumentMap Object : Warning width value is not a number, setting height to 0');
			height = 0.0;
		} else {
			height = parsed;
		}
	});

	this.__defineSetter__('x', function (val) {
		parsed = parseInt(val);

		if (NaN === parsed) {
			console.log('DocumentMap Object : Warning width value is not a number, setting x to 0');
			x = 0;
		} else {
			x = parsed;
		}
	});

	this.__defineSetter__('y', function (val) {
		parsed = parseInt(val);

		if (NaN === parsed) {
			console.log('DocumentMap Object : Warning width value is not a number, setting y to 0');
			y = 72;
		} else {
			y = parsed;
		}
	});

	this.__defineSetter__('type', function (val) {
		type = val;
	});

	this.__defineSetter__('name', function (val) {
		name = val;
	});

	this.__defineSetter__('content', function (val) {
		content = val;
	});

	this.__defineSetter__('updated', function (val) {
		updated = val;
	});

	/**
	 * Constructor call
	 */

	if (undefined !== bloc_name && undefined !== bloc_properties) {
		this.load(name, bloc_properties);
	}
}
