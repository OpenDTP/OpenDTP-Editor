MAPEDITOR.plugins.push(function () {
	var name = 'zoom';

	this.load = function (editor) {
		var zoom = $('<div class="zoom"></div>');
		var zoom_plus = $('<div class="zoom-plus"></div>');
		var zoom_moins = $('<div class="zoom-moins"></div>');
		var zoom_slider = $('<div class="zoom-slider"></div>')

		zoom_slider.slider({
			min: 25,
			max: 200,
			step: 1,
			value: 100
		});
		zoom_slider.on("slide", editor, this.update);
		zoom_plus.click(zoom_slider, function (e) {
			e.data.slider('value', e.data.slider('value') + 10);
			e.data.trigger('slide', {"value" : e.data.slider('value')});
		});
		zoom_moins.click(zoom_slider, function (e) {
			e.data.slider('value', e.data.slider('value') - 10);
			e.data.trigger('slide', {"value" : e.data.slider('value')});
		});

		zoom.append(zoom_plus);
		zoom.append(zoom_slider);
		zoom.append(zoom_moins);
		editor.footer.append(zoom);
	}

	this.update = function (e, ui) {
		if (100 < ui.value) {
			e.data.renderer.node.css('overflow', 'auto');
		} else {
			e.data.renderer.node.css('overflow', 'none');
		}
		e.data.renderer.zoom = ui.value / 100;
		e.data.renderer.resizeMap();
	}

	/**
	 * Getters and Setters
	 */
	this.__defineGetter__('name', function () {return name;});

	this.__defineSetter__('name', function (val) {name = val;});
});
