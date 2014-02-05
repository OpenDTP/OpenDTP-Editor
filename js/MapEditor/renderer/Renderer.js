function Renderer(node, map) {
	this.node = node;
	this.map = map;
	this.zoom = 1;

	this.load = function (node_map, document_map) {
		this.node = node;
		this.map = map;
		this.zoom = 1;
	}

	this.render = function (spread, refresh) {
		var map_svg;

		if (undefined === spread) {
			spread = 0;
		}
		if (true === refresh) {
			$(this.node).html('');
		}

		// positions in svg
		var bloc_pos_x;
		var bloc_pos_y;

		// dimentions in svg
		var bloc_width;
		var bloc_height;

		// current page
		var page;

		for (var page_name in this.map.spreads[spread].pages) {
			map_svg = this.createSVG('svg', { "height" : '100%', "width" : '100%' });
			page = this.map.spreads[spread].pages[page_name];
			for (var key in page.blocs) {
				bloc_pos_x = page.blocs[key].x / this.map.width * 100;
				bloc_pos_y = page.blocs[key].y / this.map.height * 100;
				bloc_width = page.blocs[key].width / this.map.width * 100;
				bloc_height = page.blocs[key].height / this.map.height * 100;
				map_svg.append(this.createSVG('rect', {
					"x" : bloc_pos_x.toFixed(2) + '%',
					"y" : bloc_pos_y.toFixed(2) + '%',
					"width" : bloc_width.toFixed(2) + '%',
					"height" : bloc_height.toFixed(2) + '%',
					"class" : 'bloc bloc-' + page.blocs[key].type,
					"data-name" : key,
					"data-spread" : spread,
					"data-page" : page_name
				}));
			}

			// Setting background for document preview
			map_svg.css('background-image', 'url("' + page.preview + '")');
			$(this.node).append(map_svg);
		};

		// Setting initial sizes
		this.resizeMap();

		// Block selection, maybe on a plugin or on Editor, triggered by Change event ?
		map_svg.find('.bloc').click(map_svg, function (e) {
			var bloc = $(e.target);
			var node_class;

			if (!e.shiftKey) {
				$(e.data).find('.bloc').each(function () {
					$(this).attr('class', $(this).attr('class').replace(' selected', ''));
				});
			}
			if (-1 === $(e.target).attr('class').indexOf('selected')) {
				$(e.target).attr('class', $(e.target).attr('class') + ' selected');
			}
		});

		map_svg.click(function (e) {
			$(e.target).find('.bloc').each(function () {
				$(this).attr('class', $(this).attr('class').replace(' selected', ''));
			});
		});

		// content changed, sending signal
		this.node.trigger('change');
	}

	this.resizeMap = function (e) {
		var renderer = e === undefined ? this : e.data;
		var map_svg = $(renderer.node).find('svg');
		var border_width_size = $(map_svg[0]).outerWidth() - $(map_svg[0]).width();
		var border_height_size = $(map_svg[0]).outerHeight() - $(map_svg[0]).height();
		var div_width = $(renderer.node).width();
		var div_height = $(renderer.node).height();
		var ratio = (renderer.map.width * map_svg.length) / renderer.map.height;
		var window_ratio = div_width / div_height;

		if (ratio > window_ratio) {

			// portrait case
			$(map_svg).attr('width', ((div_width / map_svg.length * this.zoom) - border_width_size) + 'px');
			$(map_svg).attr('height', ((div_width / ratio * this.zoom).toFixed(0) - border_height_size) + 'px');
		} else {

			// paysage case
			$(map_svg).attr('height', ((div_height * this.zoom) - border_height_size) + 'px');
			$(map_svg).attr('width', ((div_height * ratio / map_svg.length * this.zoom).toFixed(0) - border_width_size) + 'px');
		}
	}

	this.filter = function (type) {
		var map_svg = $(this.node).find('svg');

		if ('all' !== type) {
			map_svg.find('.bloc').hide();
		}
		if ('none' !== type && 'all' !== type) {
			map_svg.find('.bloc-' + type).show();
		}
		if ('all' === type) {
			map_svg.find('.bloc').show();
		}
	}

	this.createSVG = function (tag, attr_list) {
		var el = $(document.createElementNS('http://www.w3.org/2000/svg', tag));

		for (var key in attr_list) {
			el.attr(key, attr_list[key]);
		}
		return el;
	}
}
