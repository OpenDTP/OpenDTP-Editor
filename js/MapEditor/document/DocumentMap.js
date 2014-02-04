function DocumentMap(document_map) {

	var width = 0;
	var height = 0;
	var unit = 0;
	var dpi = 0;
	var name = '';
	var spreads = [];
	var blocs_type = [];
	var nb_pages = 0;

	/**
	 * Protected attributes for validation
	 */
	var available_units = ['mm', 'cm', 'px'];

	this.load = function (document_map) {
		var nb_spreads = document_map.spreads.length;

		this.width = document_map.width;
		this.height = document_map.height;
		this.unit = document_map.unit;
		this.dpi = document_map.dpi;
		this.name = document_map.name;
		this.preview = document_map.preview;

		for (var i = 0; i < nb_spreads; i++) {
			this.spreads.push(new Spread(document_map.spreads[i]));
		};
		for (var i = this.spreads.length - 1; i >= 0; i--) {
			for (var page_name in this.spreads[i].pages) {
				nb_pages++;
				for (var bloc_name in this.spreads[i].pages[page_name].blocs) {
					if (-1 === $.inArray(this.spreads[i].pages[page_name].blocs[bloc_name].type, this.blocs_type)) {
						this.blocs_type.push(this.spreads[i].pages[page_name].blocs[bloc_name].type);
					}
				}
			}
		}
	}

	/**
	 * Getters and Setters
	 */

	this.__defineGetter__('width', function () {return width;});
	this.__defineGetter__('height', function () {return height;});
	this.__defineGetter__('unit', function () {return unit;});
	this.__defineGetter__('dpi', function () {return dpi;});
	this.__defineGetter__('name', function () {return name;});
	this.__defineGetter__('spreads', function () {return spreads;});
	this.__defineGetter__('blocs_type', function () {return blocs_type;});
	this.__defineGetter__('nb_pages', function () {return nb_pages;});

	this.__defineSetter__('width', function (val) {
		var parsed = parseFloat(val);

		if (NaN === parsed) {
			console.log('DocumentMap : Warning width value is not a number, setting width to 0');
			width = 0.0;
		} else  {
			width = parsed;
		}
	});

	this.__defineSetter__('height', function (val) {
		var parsed = parseFloat(val);

		if (NaN === parsed) {
			console.log('DocumentMap : Warning height value is not a number, setting height to 0');
			height = 0.0;
		} else  {
			height = parsed;
		}
	});

	this.__defineSetter__('unit', function (val) {
		if (-1 === $.inArray(val, available_units)) {
			console.log('DocumentMap : Warning unknown unit ' + val + ', using mm unit');
			unit = 'mm';
		} else {
			unit = val;
		}
	});

	this.__defineSetter__('dpi', function (val) {
		parsed = parseInt(val);

		if (NaN === parsed) {
			console.log('DocumentMap : Warning unknown unit, setting DPI to 72 (low definition)');
			dpi = 72;
		} else {
			dpi = parsed;
		}
	});

	this.__defineSetter__('name', function (val) {name = val;});

	/**
	 * Constructor call
	 */

	if (undefined !== document_map) {
		this.load(document_map);
	}

}
