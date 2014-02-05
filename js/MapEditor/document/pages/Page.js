function Page(page_name, page_properties) {

	var name;
	var preview = '';
	var type = '';
	var blocs = {};
	var nb_blocs = 0;

	this.load = function (page_name, page_properties) {
		this.name = page_name;
		this.preview = page_properties.preview;
		this.type = page_properties.type;
		for (key in page_properties.blocs) {
			this.blocs[key] = new Bloc(key, page_properties.blocs[key]);
			nb_blocs++;
		}
	}

	/**
	 * Getters and Setters
	 */

	this.__defineGetter__('name', function () {return name;});
	this.__defineGetter__('type', function () {return type;});
	this.__defineGetter__('preview', function () {return preview;});
	this.__defineGetter__('blocs', function () {return blocs;});
	this.__defineGetter__('nb_blocs', function () {return nb_blocs;});

	this.__defineSetter__('name', function (val) {name = val;});
	this.__defineSetter__('type', function (val) {type = val;});
	this.__defineSetter__('preview', function (val) {preview = val;});

	/**
	 * Constructor call
	 */

	if (undefined !== page_name && undefined !== page_properties) {
		this.load(page_name, page_properties);
	}

}
