function Spread(spread_properties) {

	var pages = {};
	var nb_pages = 0;

	this.load = function (spread_properties) {
		if (undefined === spread_properties) {
			return;
		}
		for (var key in spread_properties) {
			this.pages[key] = new Page(key, spread_properties[key]);
			nb_pages++;
		}
	}

	/**
	 * Getters and Setters
	 */

	this.__defineGetter__('pages', function () {return pages;});
	this.__defineGetter__('nb_pages', function () {return nb_pages;});

	/**
	 * Constructor call
	 */

	if (undefined !== spread_properties) {
		this.load(spread_properties);
	}

}
