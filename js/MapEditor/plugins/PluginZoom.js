MAPEDITOR.plugins.push(function () {
	var name = 'zoom';
	var slider = $('<div class="zoom-slider"></div>');
	var step = 10;

	this.load = function (editor) {
		var zoom = $('<div class="zoom"></div>');
		var zoom_plus = $('<div class="zoom-plus"></div>');
		var zoom_moins = $('<div class="zoom-moins"></div>');

		this.slider.slider({
			min: 25,
			max: 200,
			step: 1,
			value: 100
		});
		this.slider.on("slide", editor, this.update);
		zoom_plus.click(this, function (e) {
			e.data.zoom(step);
		});
		zoom_moins.click(this, function (e) {
			e.data.zoom(-step);
		});

		// Adding mousewheel event
		this.bindWheelevent(editor);

		zoom.append(zoom_plus);
		zoom.append(this.slider);
		zoom.append(zoom_moins);
		editor.footer.append(zoom);
	}

	this.bindWheelevent = function (editor) {
		var plugin = this;
		var mouseWheelHandler = function (e) {
			e.preventDefault();
			if (0 > e.deltaY) {
				plugin.zoom(-step);
			} else {
				plugin.zoom(step);
			}
		}
		for (var i = editor.map_viewport.length - 1; i >= 0; i--) {
			if (editor.map_viewport[i].addEventListener) {
				editor.map_viewport[i].addEventListener('mousewheel', mouseWheelHandler, false);
				editor.map_viewport[i].addEventListener('DOMMouseScroll', mouseWheelHandler, false);
			} else {
				editor.map_viewport[i].attachEvent("onmousewheel", mouseWheelHandler);
			}
		}
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

	this.zoom = function (val) {
		this.slider.slider('value', this.slider.slider('value') + val);
		this.slider.trigger('slide', {"value" : this.slider.slider('value')});
	}

	/**
	 * Getters and Setters
	 */
	this.__defineGetter__('name', function () {return name;});
	this.__defineGetter__('slider', function () {return slider;});
	this.__defineGetter__('step', function () {return step;});

	this.__defineSetter__('name', function (val) {name = val;});
	this.__defineSetter__('step', function (val) {step = val;});
});
